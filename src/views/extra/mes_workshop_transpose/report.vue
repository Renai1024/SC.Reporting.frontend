<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
<!--      <el-form-item label="雪花ID" prop="snowflakeId">-->
<!--        <el-input-->
<!--          v-model="queryParams.snowflakeId"-->
<!--          placeholder="请输入雪花ID"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="物料编码" prop="materialCode">
        <el-input
          v-model="queryParams.materialCode"
          placeholder="请输入物料编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="转出车间" prop="fromWorkshop">
        <el-input
          v-model="queryParams.fromWorkshop"
          placeholder="请输入转出车间"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="转入车间" prop="toWorkshop">
        <el-input
          v-model="queryParams.toWorkshop"
          placeholder="请输入转入车间"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="转序时间" prop="transferTimeRange">
        <el-date-picker
            v-model="transferTimeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            @change="handleDateRangeChangeTransfer"
            clearable
            :unlink-panels="true"
        />
      </el-form-item>
<!--      <el-form-item label="转序人员" prop="transferPerson">-->
<!--        <el-input-->
<!--          v-model="queryParams.transferPerson"-->
<!--          placeholder="请输入转序人员"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="收料时间" prop="confirmTimeRange">
        <el-date-picker
            v-model="confirmTimeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            @change="handleDateRangeChangeConfirm"
            clearable
            :unlink-panels="true"
        />
      </el-form-item>
<!--      <el-form-item label="收料人员" prop="receiverPerson">-->
<!--        <el-input-->
<!--          v-model="queryParams.receiverPerson"-->
<!--          placeholder="请输入收料人员"-->
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
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mes_workshop_transposeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection"  align="center" min-width="40"/>
      <el-table-column label="雪花ID" align="center" prop="snowflakeId" min-width="180" show-overflow-tooltip/>
      <el-table-column label="物料编码" align="center" prop="materialCode" min-width="140" show-overflow-tooltip/>
      <el-table-column label="转出车间" align="center" prop="fromWorkshop" min-width="200" show-overflow-tooltip/>
      <el-table-column label="转入车间" align="center" prop="toWorkshop" min-width="200" show-overflow-tooltip/>
      <el-table-column label="转序数量" align="center" prop="transferQuantity" min-width="120" show-overflow-tooltip/>
      <el-table-column label="转序时间" align="center" prop="transferTime" min-width="180" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.transferTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="转序人员" align="center" prop="transferPerson" min-width="120" show-overflow-tooltip/>
      <el-table-column label="收料时间" align="center" prop="confirmTime" min-width="180" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.confirmTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收料人员" align="center" prop="receiverPerson" min-width="120" show-overflow-tooltip/>
      <el-table-column label="是否转序" align="center" prop="isTransferred"min-width="120" show-overflow-tooltip>
        <template #default="scope">
          <dict-tag :options="sys_yes_no" :value="scope.row.isTransferred"/>
        </template>
      </el-table-column>
      <el-table-column label="是否收料" align="center" prop="isConfirmed" min-width="120" show-overflow-tooltip>
        <template #default="scope">
          <dict-tag :options="sys_yes_no" :value="scope.row.isConfirmed"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" min-width="200" show-overflow-tooltip/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />


  </div>
</template>

<script setup name="Mes_workshop_transpose">
import { listMes_workshop_transpose} from "@/api/extra/mes_workshop_transpose";
import {ref} from "vue";

const { proxy } = getCurrentInstance();

const transferTimeRange = ref([]);
const confirmTimeRange = ref([]);

const { sys_yes_no } = proxy.useDict('sys_yes_no');
const mes_workshop_transposeList = ref([]);
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
    snowflakeId: null,
    materialCode: null,
    fromWorkshop: null,
    toWorkshop: null,
    transferQuantity: null,
    transferTime: null,
    transferStartTime: null,
    transferEndTime: null,
    transferPerson: null,
    confirmTime: null,
    confirmStartTime: null,
    confirmEndTime: null,
    receiverPerson: null,
    isTransferred: null,
    isConfirmed: null,
  },
  rules: {
    materialCode: [
      { required: true, message: "物料编码不能为空", trigger: "blur" }
    ],
    fromWorkshop: [
      { required: true, message: "转出车间不能为空", trigger: "blur" }
    ],
    toWorkshop: [
      { required: true, message: "转入车间不能为空", trigger: "blur" }
    ],
    transferQuantity: [
      { required: true, message: "转序数量不能为空", trigger: "blur" }
    ],
    transferPerson: [
        { required: true, message: "转序人员不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

// 转序日期范围变化处理
function handleDateRangeChangeTransfer(range) {
  if (range && range.length === 2) {
    queryParams.value.transferStartTime = range[0];
    queryParams.value.transferEndTime = range[1];
  } else {
    queryParams.value.transferStartTime = null;
    queryParams.value.transferEndTime = null;
  }
}

// 收料日期范围变化处理
function handleDateRangeChangeConfirm(range) {
  if (range && range.length === 2) {
    queryParams.value.confirmStartTime = range[0];
    queryParams.value.confirmEndTime = range[1];
  } else {
    queryParams.value.confirmStartTime = null;
    queryParams.value.confirmEndTime = null;
  }
}

/** 查询车间转序列表 */
function getList() {
  loading.value = true;
  listMes_workshop_transpose(queryParams.value).then(response => {
    mes_workshop_transposeList.value = response.rows;
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
    snowflakeId: null,
    materialCode: null,
    fromWorkshop: null,
    toWorkshop: null,
    transferQuantity: null,
    transferTime: null,
    transferPerson: null,
    confirmTime: null,
    receiverPerson: null,
    isTransferred: null,
    isConfirmed: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
  proxy.resetForm("mes_workshop_transposeRef");
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





/** 导出按钮操作 */
function handleExport() {
  proxy.download('extra/mes/report/mes_workshop_transpose/export', {
    ...queryParams.value
  }, `mes_workshop_transpose_${new Date().getTime()}.xlsx`)
}

getList();
</script>
