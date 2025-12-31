<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto" style="flex: 1;">

      <el-form-item label="物料编号" prop="materialNo">
        <el-input
            width="20px"
          v-model="queryParams.materialNo"
          placeholder="请输入物料编号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="旧料号" prop="oldMaterialNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.oldMaterialNo"-->
<!--          placeholder="请输入旧料号"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="订单号" prop="orderNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.orderNo"-->
<!--          placeholder="请输入订单号"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="信息1" prop="info1">-->
<!--        <el-input-->
<!--          v-model="queryParams.info1"-->
<!--          placeholder="请输入信息1"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="信息2" prop="info2">-->
<!--        <el-input-->
<!--          v-model="queryParams.info2"-->
<!--          placeholder="请输入信息2"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="信息3" prop="info3">-->
<!--        <el-input-->
<!--          v-model="queryParams.info3"-->
<!--          placeholder="请输入信息3"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="信息4" prop="info4">-->
<!--        <el-input-->
<!--          v-model="queryParams.info4"-->
<!--          placeholder="请输入信息4"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="信息5" prop="info5">-->
<!--        <el-input-->
<!--          v-model="queryParams.info5"-->
<!--          placeholder="请输入信息5"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="信息6" prop="info6">-->
<!--        <el-input-->
<!--          v-model="queryParams.info6"-->
<!--          placeholder="请输入信息6"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="条码" prop="barcode">-->
<!--        <el-input-->
<!--          v-model="queryParams.barcode"-->
<!--          placeholder="请输入条码"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="测试开始时间" prop="testStartTime">
        <el-date-picker clearable
                        width="60px"
          v-model="queryParams.testStartTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择测试开始时间">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="测试结束时间" prop="testEndTime">-->
<!--        <el-date-picker clearable-->
<!--                        width="60px"-->
<!--          v-model="queryParams.testEndTime"-->
<!--          type="date"-->
<!--          value-format="YYYY-MM-DD"-->
<!--          placeholder="请选择测试结束时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="测试结果" prop="testResult">-->
<!--        <el-input-->
<!--          v-model="queryParams.testResult"-->
<!--          placeholder="请输入测试结果"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="报文转义" prop="messageEscape">-->
<!--        <el-input-->
<!--          v-model="queryParams.messageEscape"-->
<!--          placeholder="请输入报文转义"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="测试状态" prop="testStatus">-->
<!--        <el-input-->
<!--          v-model="queryParams.testStatus"-->
<!--          placeholder="请输入测试状态"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="客户端IP" prop="clientIp">-->
<!--        <el-input-->
<!--          v-model="queryParams.clientIp"-->
<!--          placeholder="请输入客户端IP"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="客户标识" prop="customerFlag">-->
<!--        <el-input-->
<!--          v-model="queryParams.customerFlag"-->
<!--          placeholder="请输入客户标识"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
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
          v-hasPermi="['extra:mes/report/iqc:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['extra:mes/report/iqc:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['extra:mes/report/iqc:remove']"
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

<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--            type="warning"-->
<!--            plain-->
<!--            icon="Download"-->
<!--            @click="handleExport"-->
<!--            v-hasPermi="['extra:mes/report/iqc:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading"
              :data="mesList"
              border style="width: 100%"
              max-height="600"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="物料编号" align="center" prop="materialNo" min-width="160" show-overflow-tooltip fixed/>
<!--      <el-table-column label="旧料号" align="center" prop="oldMaterialNo" min-width="160" show-overflow-tooltip/>-->
<!--      <el-table-column label="订单号" align="center" prop="orderNo" min-width="160" show-overflow-tooltip/>-->
      <el-table-column label="规格" align="center" prop="info1" min-width="160" show-overflow-tooltip/>
<!--      <el-table-column label="信息2" align="center" prop="info2" min-width="160" show-overflow-tooltip/>-->
<!--      <el-table-column label="信息3" align="center" prop="info3" min-width="160" show-overflow-tooltip/>-->
<!--      <el-table-column label="信息4" align="center" prop="info4" min-width="160" show-overflow-tooltip/>-->
<!--      <el-table-column label="信息5" align="center" prop="info5" min-width="160" show-overflow-tooltip/>-->
<!--      <el-table-column label="备注" align="center" prop="info6" min-width="160" show-overflow-tooltip/>-->
      <el-table-column label="批号" align="center" prop="barcode" min-width="160" show-overflow-tooltip/>
      <el-table-column label="测试时间" align="center" prop="testStartTime" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.testStartTime, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="测试结束时间" align="center" prop="testEndTime" min-width="160" show-overflow-tooltip>-->
<!--        <template #default="scope">-->
<!--          <span>{{ parseTime(scope.row.testEndTime, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="测试结果" align="center" prop="testResult" min-width="200" show-overflow-tooltip/>
<!--      <el-table-column label="报文转义" align="center" prop="messageEscape" min-width="200" show-overflow-tooltip/>-->
      <el-table-column label="测试状态" align="center" prop="testStatus" min-width="200" show-overflow-tooltip/>
<!--      <el-table-column label="客户端IP" align="center" prop="clientIp" min-width="200" show-overflow-tooltip/>-->
<!--&lt;!&ndash;      <el-table-column label="产品类型" align="center" prop="productType" min-width="200" show-overflow-tooltip/>&ndash;&gt;-->
<!--      <el-table-column label="客户标识" align="center" prop="customerFlag" min-width="200" show-overflow-tooltip/>-->
<!--&lt;!&ndash;      <el-table-column label="创建人" align="center" prop="createBy" min-width="200" show-overflow-tooltip/>&ndash;&gt;-->
<!--      <el-table-column label="创建时间" align="center" prop="createTime" min-width="200" show-overflow-tooltip/>-->
<!--      <el-table-column label="修改人" align="center" prop="updateBy" min-width="200" show-overflow-tooltip/>-->
<!--      <el-table-column label="修改时间" align="center" prop="updateTime" min-width="200" show-overflow-tooltip/>-->
      <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['extra:mes:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['extra:mes:remove']">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

<!--    &lt;!&ndash; 添加或修改MES生产数据对话框 &ndash;&gt;-->
<!--    <el-dialog :title="title" v-model="open" width="500px" append-to-body>-->
<!--      <el-form ref="mesRef" :model="form" :rules="rules" label-width="80px">-->
<!--        <el-form-item label="物料编号" prop="materialNo">-->
<!--          <el-input v-model="form.materialNo" placeholder="请输入物料编号" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="旧料号" prop="oldMaterialNo">-->
<!--          <el-input v-model="form.oldMaterialNo" placeholder="请输入旧料号" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="订单号" prop="orderNo">-->
<!--          <el-input v-model="form.orderNo" placeholder="请输入订单号" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="信息1" prop="info1">-->
<!--          <el-input v-model="form.info1" placeholder="请输入信息1" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="信息2" prop="info2">-->
<!--          <el-input v-model="form.info2" placeholder="请输入信息2" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="信息3" prop="info3">-->
<!--          <el-input v-model="form.info3" placeholder="请输入信息3" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="信息4" prop="info4">-->
<!--          <el-input v-model="form.info4" placeholder="请输入信息4" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="信息5" prop="info5">-->
<!--          <el-input v-model="form.info5" placeholder="请输入信息5" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="信息6" prop="info6">-->
<!--          <el-input v-model="form.info6" placeholder="请输入信息6" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="条码" prop="barcode">-->
<!--          <el-input v-model="form.barcode" placeholder="请输入条码" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="测试开始时间" prop="testStartTime">-->
<!--          <el-date-picker clearable-->
<!--            v-model="form.testStartTime"-->
<!--            type="date"-->
<!--            value-format="YYYY-MM-DD"-->
<!--            placeholder="请选择测试开始时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="测试结束时间" prop="testEndTime">-->
<!--          <el-date-picker clearable-->
<!--            v-model="form.testEndTime"-->
<!--            type="date"-->
<!--            value-format="YYYY-MM-DD"-->
<!--            placeholder="请选择测试结束时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="测试结果" prop="testResult">-->
<!--          <el-input v-model="form.testResult" placeholder="请输入测试结果" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="报文转义" prop="messageEscape">-->
<!--          <el-input v-model="form.messageEscape" placeholder="请输入报文转义" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="测试状态" prop="testStatus">-->
<!--          <el-input v-model="form.testStatus" placeholder="请输入测试状态" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户端IP" prop="clientIp">-->
<!--          <el-input v-model="form.clientIp" placeholder="请输入客户端IP" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="客户标识" prop="customerFlag">-->
<!--          <el-input v-model="form.customerFlag" placeholder="请输入客户标识" />-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <template #footer>-->
<!--        <div class="dialog-footer">-->
<!--          <el-button type="primary" @click="submitForm">确 定</el-button>-->
<!--          <el-button @click="cancel">取 消</el-button>-->
<!--        </div>-->
<!--      </template>-->
<!--    </el-dialog>-->
  </div>
</template>

<script setup name="Mes">
import { listMes, getMes, delMes, addMes, updateMes } from "@/api/extra/mes_report_iqc.js";
import {ElMessage, ElMessageBox} from "element-plus";

const { proxy } = getCurrentInstance();

const mesList = ref([]);
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
    materialNo: null,
    oldMaterialNo: null,
    orderNo: null,
    info1: null,
    info2: null,
    info3: null,
    info4: null,
    info5: null,
    info6: null,
    barcode: null,
    testStartTime: null,
    testEndTime: null,
    testResult: null,
    messageEscape: null,
    testStatus: null,
    clientIp: null,
    productType: null,
    customerFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null
  },
  rules: {
    materialNo: [
      { required: true, message: "物料编号不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询MES生产数据列表 */
function getList() {
  loading.value = true;
  listMes(queryParams.value).then(response => {
    mesList.value = response.rows;
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
    materialNo: null,
    oldMaterialNo: null,
    orderNo: null,
    info1: null,
    info2: null,
    info3: null,
    info4: null,
    info5: null,
    info6: null,
    barcode: null,
    testStartTime: null,
    testEndTime: null,
    testResult: null,
    messageEscape: null,
    testStatus: null,
    clientIp: null,
    productType: null,
    customerFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null
  };
  proxy.resetForm("mesRef");
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
  title.value = "添加IQC生产数据";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getMes(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改IQC生产数据";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["mesRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateMes(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addMes(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除IQC生产数据编号为"' + _ids + '"的数据项？').then(function() {
    return delMes(_ids);
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
      proxy.download('extra/mes/report/iqc/exportByIds', {
        ids: ids.value.join(',')}, `mes_${new Date().getTime()}.xlsx`)
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
      await ElMessageBox.confirm('是否确认导出所有信息数据项？该操作耗时较长！','导出确认',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      proxy.download('extra/mes/report/iqc/export', {
        ...queryParams.value
      }, `mes_${new Date().getTime()}.xlsx`)
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
