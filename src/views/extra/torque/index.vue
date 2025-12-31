<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="产品二维码数据" prop="qrCode">
        <el-input
          v-model="queryParams.qrCode"
          placeholder="请输入产品二维码数据"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品螺丝序号" prop="screwIndex">
        <el-input
          v-model="queryParams.screwIndex"
          placeholder="请输入产品螺丝序号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="锁附时间" prop="lockTimeRange">
        <el-date-picker
            v-model="lockTimeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            @change="handleDateRangeChange"
            clearable
            :unlink-panels="true"
        />
      </el-form-item>
<!--      <el-form-item label="锁附时间" prop="lockTime">-->
<!--        <el-date-picker clearable-->
<!--          v-model="queryParams.lockTime"-->
<!--          type="date"-->
<!--          value-format="YYYY-MM-DD"-->
<!--          placeholder="请选择锁附时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="目标扭矩" prop="targetTorque">-->
<!--        <el-input-->
<!--          v-model="queryParams.targetTorque"-->
<!--          placeholder="请输入目标扭矩"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="实际锁附扭矩" prop="actualTorque">-->
<!--        <el-input-->
<!--          v-model="queryParams.actualTorque"-->
<!--          placeholder="请输入实际锁附扭矩"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="锁附圈数(r)" prop="lockCircle">-->
<!--        <el-input-->
<!--          v-model="queryParams.lockCircle"-->
<!--          placeholder="请输入锁附圈数(r)"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="锁附时长(s)" prop="lockDuration">-->
<!--        <el-input-->
<!--          v-model="queryParams.lockDuration"-->
<!--          placeholder="请输入锁附时长(s)"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="锁附结果" prop="lockResult">
        <el-input
          v-model="queryParams.lockResult"
          placeholder="请输入锁附结果"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['extra:torque:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['extra:torque:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['extra:torque:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="torqueList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" align="center" />
<!--      <el-table-column label="主键ID" align="center" prop="id" />-->
      <el-table-column label="产品二维码数据" align="center" prop="qrCode" min-width="120px" show-overflow-tooltip/>
      <el-table-column label="产品螺丝序号" align="center" prop="screwIndex" min-width="120px" show-overflow-tooltip/>
      <el-table-column label="锁附时间" align="center" prop="lockTime" min-width="120px" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="目标扭矩" align="center" prop="targetTorque" min-width="120px" show-overflow-tooltip/>
      <el-table-column label="实际锁附扭矩" align="center" prop="actualTorque" min-width="120px" show-overflow-tooltip/>
      <el-table-column label="锁附圈数(r)" align="center" prop="lockCircle" min-width="120px" show-overflow-tooltip/>
      <el-table-column label="锁附时长(s)" align="center" prop="lockDuration" min-width="120px" show-overflow-tooltip/>
      <el-table-column label="锁附结果" align="center" prop="lockResult" min-width="120px" show-overflow-tooltip/>
<!--      <el-table-column label="创建人" align="center" prop="createBy" min-width="120px" show-overflow-tooltip/>-->
<!--      <el-table-column label="创建时间" align="center" prop="createTime" min-width="120px" show-overflow-tooltip/>-->
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template #default="scope">-->
<!--          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['extra:torque:edit']">修改</el-button>-->
<!--          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['extra:torque:remove']">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改碳化硅自动锁螺丝数据对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="torqueRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="产品二维码数据" prop="qrCode">
          <el-input v-model="form.qrCode" placeholder="请输入产品二维码数据" />
        </el-form-item>
        <el-form-item label="产品螺丝序号" prop="screwIndex">
          <el-input v-model="form.screwIndex" placeholder="请输入产品螺丝序号" />
        </el-form-item>
        <el-form-item label="锁附时间" prop="lockTime">
          <el-date-picker clearable
            v-model="form.lockTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择锁附时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="目标扭矩" prop="targetTorque">
          <el-input v-model="form.targetTorque" placeholder="请输入目标扭矩" />
        </el-form-item>
        <el-form-item label="实际锁附扭矩" prop="actualTorque">
          <el-input v-model="form.actualTorque" placeholder="请输入实际锁附扭矩" />
        </el-form-item>
        <el-form-item label="锁附圈数(r)" prop="lockCircle">
          <el-input v-model="form.lockCircle" placeholder="请输入锁附圈数(r)" />
        </el-form-item>
        <el-form-item label="锁附时长(s)" prop="lockDuration">
          <el-input v-model="form.lockDuration" placeholder="请输入锁附时长(s)" />
        </el-form-item>
        <el-form-item label="锁附结果" prop="lockResult">
          <el-input v-model="form.lockResult" placeholder="请输入锁附结果" />
        </el-form-item>
        <el-form-item label="锁附结果" prop="lockResult">
          <el-input v-model="form.lockResult" placeholder="请输入锁附结果" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Torque">
import { listTorque, getTorque, delTorque, addTorque, updateTorque } from "@/api/extra/torque";

const { proxy } = getCurrentInstance();

const torqueList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const lockTimeRange = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    qrCode: null,
    screwIndex: null,
    startTime: null,
    endTime: null,
    targetTorque: null,
    actualTorque: null,
    lockCircle: null,
    lockDuration: null,
    lockResult: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询碳化硅自动锁螺丝数据列表 */
function getList() {
  loading.value = true;
  listTorque(queryParams.value).then(response => {
    torqueList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 日期范围变化处理
function handleDateRangeChange(range) {
  if (range && range.length === 2) {
    queryParams.value.startTime = range[0];
    queryParams.value.endTime = range[1];
  } else {
    queryParams.value.startTime = null;
    queryParams.value.endTime = null;
  }
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    qrCode: null,
    screwIndex: null,
    lockTime: null,
    targetTorque: null,
    actualTorque: null,
    lockCircle: null,
    lockDuration: null,
    lockResult: null
  };
  proxy.resetForm("torqueRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加碳化硅自动锁螺丝数据";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getTorque(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改碳化硅自动锁螺丝数据";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["torqueRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateTorque(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addTorque(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除碳化硅自动锁螺丝数据编号为"' + _ids + '"的数据项？').then(function() {
    return delTorque(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('extra/mes//report/torque/export', {
    ...queryParams.value
  }, `碳化硅自动锁螺丝数据_${new Date().getTime()}.xlsx`)
}

getList();
</script>
