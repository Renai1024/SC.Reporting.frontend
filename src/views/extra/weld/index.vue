<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="产品二维码" prop="productCode">
        <el-input
          v-model="queryParams.productCode"
          placeholder="请输入产品码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="焊接时间" prop="weldingTime">
        <el-date-picker clearable
          v-model="queryParams.weldingTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择焊接时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="焊接结果" prop="weldingResult">
        <el-input
          v-model="queryParams.weldingResult"
          placeholder="请输入焊接结果"
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
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="Plus"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['extra:weld:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="Edit"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['extra:weld:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="Delete"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['extra:weld:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
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

    <el-table v-loading="loading" :data="weldList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" align="center" />
<!--      <el-table-column label="主键ID" align="center" prop="id" />-->
      <el-table-column label="产品二维码" align="center" prop="productCode" min-width="140" show-overflow-tooltip/>
      <el-table-column label="焊接时间" align="center" prop="weldingTime" min-width="140" show-overflow-tooltip>
<!--        <template #default="scope">-->
<!--          <span>{{ parseTime(scope.row.weldingTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="焊接结果" align="center" prop="weldingResult" min-width="140" show-overflow-tooltip/>
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template #default="scope">-->
<!--          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['extra:weld:edit']">修改</el-button>-->
<!--          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['extra:weld:remove']">删除</el-button>-->
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

    <!-- 添加或修改焊接结果记录对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="weldRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="产品码" prop="productCode">
          <el-input v-model="form.productCode" placeholder="请输入产品码" />
        </el-form-item>
        <el-form-item label="焊接时间" prop="weldingTime">
          <el-date-picker clearable
            v-model="form.weldingTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择焊接时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="焊接结果" prop="weldingResult">
          <el-input v-model="form.weldingResult" placeholder="请输入焊接结果" />
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

<script setup name="Weld">
import { listWeld, getWeld, delWeld, addWeld, updateWeld } from "@/api/extra/weld";

const { proxy } = getCurrentInstance();

const weldList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    productCode: null,
    weldingTime: null,
    weldingResult: null,
  },
  rules: {
    productCode: [
      { required: true, message: "产品码不能为空", trigger: "blur" }
    ],
    weldingTime: [
      { required: true, message: "焊接时间不能为空", trigger: "blur" }
    ],
    weldingResult: [
      { required: true, message: "焊接结果不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询焊接结果记录列表 */
function getList() {
  loading.value = true;
  listWeld(queryParams.value).then(response => {
    weldList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
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
    productCode: null,
    weldingTime: null,
    weldingResult: null,
    createBy: null,
    createTime: null
  };
  proxy.resetForm("weldRef");
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
  title.value = "添加焊接结果记录";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getWeld(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改焊接结果记录";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["weldRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateWeld(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addWeld(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除焊接结果记录编号为"' + _ids + '"的数据项？').then(function() {
    return delWeld(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('extra/mes/report/weld_record/export', {
    ...queryParams.value
  }, `weld_${new Date().getTime()}.xlsx`)
}

getList();
</script>
