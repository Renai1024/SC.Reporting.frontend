<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="收料通知单号" prop="billNo">
        <el-input
          v-model="queryParams.billNo"
          placeholder="请输入收料通知单号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收料日期" prop="receiveDate">
        <el-date-picker clearable
          v-model="queryParams.receiveDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择收料日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收料组织" prop="receiveOrg">
        <el-input
          v-model="queryParams.receiveOrg"
          placeholder="请输入收料组织"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采购组织" prop="purchaseOrg">
        <el-input
          v-model="queryParams.purchaseOrg"
          placeholder="请输入采购组织"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商名称" prop="supplierName">
        <el-input
          v-model="queryParams.supplierName"
          placeholder="请输入供应商名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料编码" prop="materialNo">
        <el-input
          v-model="queryParams.materialNo"
          placeholder="请输入物料编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料名称" prop="materialName">
        <el-input
          v-model="queryParams.materialName"
          placeholder="请输入物料名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="交货数量" prop="receiveQty">-->
<!--        <el-input-->
<!--          v-model="queryParams.receiveQty"-->
<!--          placeholder="请输入交货数量"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="规格型号" prop="materialSpe">
        <el-input
          v-model="queryParams.materialSpe"
          placeholder="请输入规格型号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批号" prop="flot">
        <el-input
          v-model="queryParams.flot"
          placeholder="请输入批号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="委外物料编码" prop="materialNoWw">
        <el-input
          v-model="queryParams.materialNoWw"
          placeholder="请输入委外物料编码"
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
<!--          v-hasPermi="['extra:receive_material_notice:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="Edit"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['extra:receive_material_notice:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="Delete"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['extra:receive_material_notice:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['extra:receive_material_notice:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="receive_material_noticeList"
              border style="width: 100%"
              max-height="600"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" min-width="40" show-overflow-tooltip/>
<!--      <el-table-column label="明细ID" align="center" prop="fentryId" min-width="160" show-overflow-tooltip/>-->
      <el-table-column label="收料通知单号" align="center" prop="billNo" min-width="160" show-overflow-tooltip/>
      <el-table-column label="收料日期" align="center" prop="receiveDate" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.receiveDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收料组织" align="center" prop="receiveOrg" min-width="200" show-overflow-tooltip/>
      <el-table-column label="采购组织" align="center" prop="purchaseOrg" min-width="200" show-overflow-tooltip/>
      <el-table-column label="供应商名称" align="center" prop="supplierName" min-width="200" show-overflow-tooltip/>
      <el-table-column label="物料编码" align="center" prop="materialNo" min-width="160" show-overflow-tooltip/>
      <el-table-column label="物料名称" align="center" prop="materialName" min-width="160" show-overflow-tooltip/>
      <el-table-column label="交货数量" align="center" prop="receiveQty" min-width="160" show-overflow-tooltip/>
      <el-table-column label="规格型号" align="center" prop="materialSpe" min-width="160" show-overflow-tooltip/>
      <el-table-column label="批号" align="center" prop="flot" min-width="160" show-overflow-tooltip/>
      <el-table-column label="物料说明" align="center" prop="materialDesc" min-width="160" show-overflow-tooltip/>
      <el-table-column label="委外物料编码" align="center" prop="materialNoWw" min-width="160" show-overflow-tooltip/>
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template #default="scope">-->
<!--          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['extra:receive_material_notice:edit']">修改</el-button>-->
<!--          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['extra:receive_material_notice:remove']">删除</el-button>-->
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

    <!-- 添加或修改收料通知单对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="receive_material_noticeRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="收料通知单号" prop="billNo">
          <el-input v-model="form.billNo" placeholder="请输入收料通知单号" />
        </el-form-item>
        <el-form-item label="收料日期" prop="receiveDate">
          <el-date-picker clearable
            v-model="form.receiveDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择收料日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="收料组织" prop="receiveOrg">
          <el-input v-model="form.receiveOrg" placeholder="请输入收料组织" />
        </el-form-item>
        <el-form-item label="采购组织" prop="purchaseOrg">
          <el-input v-model="form.purchaseOrg" placeholder="请输入采购组织" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="supplierName">
          <el-input v-model="form.supplierName" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="物料编码" prop="materialNo">
          <el-input v-model="form.materialNo" placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="物料名称" prop="materialName">
          <el-input v-model="form.materialName" placeholder="请输入物料名称" />
        </el-form-item>
        <el-form-item label="交货数量" prop="receiveQty">
          <el-input v-model="form.receiveQty" placeholder="请输入交货数量" />
        </el-form-item>
        <el-form-item label="规格型号" prop="materialSpe">
          <el-input v-model="form.materialSpe" placeholder="请输入规格型号" />
        </el-form-item>
        <el-form-item label="批号" prop="flot">
          <el-input v-model="form.flot" placeholder="请输入批号" />
        </el-form-item>
        <el-form-item label="物料说明" prop="materialDesc">
          <el-input v-model="form.materialDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="委外物料编码" prop="materialNoWw">
          <el-input v-model="form.materialNoWw" placeholder="请输入委外物料编码" />
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

<script setup name="Receive_material_notice">
import { listReceive_material_notice, getReceive_material_notice, delReceive_material_notice, addReceive_material_notice, updateReceive_material_notice } from "@/api/extra/receive_material_notice";
import {ElMessage, ElMessageBox} from "element-plus";

const { proxy } = getCurrentInstance();

const receive_material_noticeList = ref([]);
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
    billNo: null,
    receiveDate: null,
    receiveOrg: null,
    purchaseOrg: null,
    supplierName: null,
    materialNo: null,
    materialName: null,
    receiveQty: null,
    materialSpe: null,
    flot: null,
    materialDesc: null,
    materialNoWw: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询收料通知单列表 */
function getList() {
  loading.value = true;
  listReceive_material_notice(queryParams.value).then(response => {
    receive_material_noticeList.value = response.rows;
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
    fentryId: null,
    billNo: null,
    receiveDate: null,
    receiveOrg: null,
    purchaseOrg: null,
    supplierName: null,
    materialNo: null,
    materialName: null,
    receiveQty: null,
    materialSpe: null,
    flot: null,
    materialDesc: null,
    materialNoWw: null
  };
  proxy.resetForm("receive_material_noticeRef");
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
  ids.value = selection.map(item => item.fentryId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加收料通知单";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _fentryId = row.fentryId || ids.value
  getReceive_material_notice(_fentryId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改收料通知单";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["receive_material_noticeRef"].validate(valid => {
    if (valid) {
      if (form.value.fentryId != null) {
        updateReceive_material_notice(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addReceive_material_notice(form.value).then(response => {
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
  const _fentryIds = row.fentryId || ids.value;
  proxy.$modal.confirm('是否确认删除收料通知单编号为"' + _fentryIds + '"的数据项？').then(function() {
    return delReceive_material_notice(_fentryIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
async function handleExport() {

  if(ids.value.length > 0){
    try{
      await ElMessageBox.confirm(`是否确认导出所有勾选的信息数据项？总计${ids.value.length}条`,'导出确认',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'primary'
      })
      proxy.download('extra/erp/report/receive_material_notice/exportByIds', {
        ids: ids.value.join(',')}, `收料通知单_${new Date().getTime()}.xlsx`)
    }catch ( error){
      if(error !== 'cancel'){
        ElMessage({
          message: '导出失败！' + (error.message),
          type: 'error'
        })
      }
    }

  }else{
    try {
      await ElMessageBox.confirm('是否确认导出所有信息数据项？该操作耗时较长，建议勾选导出！','导出确认',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      proxy.download('extra/erp/report/receive_material_notice/export', {
        ...queryParams.value
      }, `收料通知单_${new Date().getTime()}.xlsx`)
    }catch (error){
      if(error !== 'cancel'){
        ElMessage({
          message: '导出失败！' + (error.message),
          type: 'error'
        })
      }
    }
  }
}

getList();
</script>
