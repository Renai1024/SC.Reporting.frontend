<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">


      <el-form-item label="测试时间" prop="TimeRange">
        <el-date-picker
            v-model="TimeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            @change="handleDateRange"
            clearable
            :unlink-panels="true"
        />
      </el-form-item>

      <el-form-item label="条码" prop="tiaoma">
        <el-input
          v-model="queryParams.tiaoma"
          placeholder="请输入条码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item label="测试结果" prop="workresult">
        <el-input
            v-model="queryParams.workresult"
            placeholder="请输入测试结果"
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
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="MesQimixingRecordList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="条码" align="center" prop="tiaoma" min-width="140" show-overflow-tooltip/>
      <el-table-column label="通道" align="center" prop="tongdao" min-width="100" show-overflow-tooltip/>
      <el-table-column label="测试结果" align="center" prop="workresult" min-width="100" show-overflow-tooltip/>
      <el-table-column label="测试时间" align="center" prop="datatime" min-width="180" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.datatime, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平衡上限" align="center" prop="pinghengshangxian" min-width="100" show-overflow-tooltip/>
      <el-table-column label="平衡下限" align="center" prop="pinghengxiaxian" min-width="100" show-overflow-tooltip/>
      <el-table-column label="测量上限" align="center" prop="celiangshangxian" min-width="100" show-overflow-tooltip/>
      <el-table-column label="测量下限" align="center" prop="celiangxiaxian" min-width="100" show-overflow-tooltip/>
      <el-table-column label="泄漏值" align="center" prop="xieluozhi" min-width="100" show-overflow-tooltip/>
      <el-table-column label="压力值" align="center" prop="yalizhi" min-width="100" show-overflow-tooltip/>
      <el-table-column label="单位" align="center" prop="danwei" min-width="100" show-overflow-tooltip/>
      <el-table-column label="延迟时间" align="center" prop="yanchitime" min-width="100" show-overflow-tooltip/>
      <el-table-column label="充气时间" align="center" prop="chongqitime" min-width="100" show-overflow-tooltip/>
      <el-table-column label="平衡时间" align="center" prop="pinghengtime"min-width="100" show-overflow-tooltip/>
      <el-table-column label="测量时间" align="center" prop="celiangtime" min-width="100" show-overflow-tooltip/>
      <el-table-column label="排气时间" align="center" prop="paiqitime" min-width="100" show-overflow-tooltip/>
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

<script setup name="MesQimixingRecord">
import { listMesQimixingRecord, getMesQimixingRecord, delMesQimixingRecord, addMesQimixingRecord, updateMesQimixingRecord } from "@/api/extra/MesQimixingRecord";
import {ref} from "vue";

const { proxy } = getCurrentInstance();

const MesQimixingRecordList = ref([]);
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
    datatime: null,
    workresult: null,
    tongdao: null,
    tiaoma: null,
    pinghengshangxian: null,
    pinghengxiaxian: null,
    celiangshangxian: null,
    celiangxiaxian: null,
    xieluozhi: null,
    yalizhi: null,
    danwei: null,
    yanchitime: null,
    chongqitime: null,
    pinghengtime: null,
    celiangtime: null,
    paiqitime: null,
    startTime: null,
    endTime: null
  },
  rules: {
  }
});

const TimeRange = ref([]);

const { queryParams, form, rules } = toRefs(data);

/** 查询气密性测试记录列表 */
function getList() {
  loading.value = true;
  listMesQimixingRecord(queryParams.value).then(response => {
    MesQimixingRecordList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

function handleDateRange(range) {
  if (range && range.length === 2) {
    queryParams.value.startTime = range[0];
    queryParams.value.endTime = range[1];
  } else {
    queryParams.value.startTime = null;
    queryParams.value.endTime = null;
  }
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    datatime: null,
    workresult: null,
    tongdao: null,
    tiaoma: null,
    pinghengshangxian: null,
    pinghengxiaxian: null,
    celiangshangxian: null,
    celiangxiaxian: null,
    xieluozhi: null,
    yalizhi: null,
    danwei: null,
    yanchitime: null,
    chongqitime: null,
    pinghengtime: null,
    celiangtime: null,
    paiqitime: null
  };
  proxy.resetForm("MesQimixingRecordRef");
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
  title.value = "添加气密性测试记录";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getMesQimixingRecord(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改气密性测试记录";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["MesQimixingRecordRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateMesQimixingRecord(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addMesQimixingRecord(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除气密性测试记录编号为"' + _ids + '"的数据项？').then(function() {
    return delMesQimixingRecord(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('extra/mes/report/mes_qimixing_record/export', {
    ...queryParams.value
  }, `气密性测试数据_${new Date().getTime()}.xlsx`)
}

getList();
</script>
