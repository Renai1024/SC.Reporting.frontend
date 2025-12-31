<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="测试时间" prop="datatime">
        <el-date-picker clearable
          v-model="queryParams.datatime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择测试时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="测试时间" prop="testTimeRange">
        <el-date-picker
            v-model="testTimeRange"
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
      <el-form-item label="产量序号" prop="chanliangxuhao">
        <el-input
          v-model="queryParams.chanliangxuhao"
          placeholder="请输入产量序号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="二维码" prop="tiaoma">
        <el-input
          v-model="queryParams.tiaoma"
          placeholder="请输入二维码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="焊头编号" prop="hantoubianhao">
        <el-input
          v-model="queryParams.hantoubianhao"
          placeholder="请输入焊头编号"
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
          v-hasPermi="['extra:mes_report_duanziyajieji:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mes_report_duanziyajiejiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" min-width="40" align="center" />
      <el-table-column label="二维码" align="center" prop="tiaoma" min-width="160" show-overflow-tooltip/>
      <el-table-column label="产量序号" align="center" prop="chanliangxuhao" min-width="160" show-overflow-tooltip/>
      <el-table-column label="测试时间" align="center" prop="datatime" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.datatime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="测试结果" align="center" prop="workresult" min-width="120" show-overflow-tooltip/>
      <el-table-column label="线缆规格" align="center" prop="xianlanguige" min-width="120" show-overflow-tooltip/>
      <el-table-column label="生产模式" align="center" prop="shengchanmoshi" min-width="120" show-overflow-tooltip/>
      <el-table-column label="焊头编号" align="center" prop="hantoubianhao" min-width="160" show-overflow-tooltip/>
      <el-table-column label="焊接时间" align="center" prop="hanjieshijian" min-width="160" show-overflow-tooltip/>
      <el-table-column label="触发高度" align="center" prop="chufagaodu" min-width="120" show-overflow-tooltip/>
      <el-table-column label="成形高度" align="center" prop="chengxinggaodu" min-width="120" show-overflow-tooltip/>
      <el-table-column label="压力" align="center" prop="yali" min-width="120" show-overflow-tooltip/>
      <el-table-column label="振幅" align="center" prop="zhenfu" min-width="120" show-overflow-tooltip/>
      <el-table-column label="能量" align="center" prop="nengliang" min-width="120" show-overflow-tooltip/>
      <el-table-column label="频率" align="center" prop="pinlv" min-width="120" show-overflow-tooltip/>
      <el-table-column label="平均功率" align="center" prop="pingjungonglv" min-width="120" show-overflow-tooltip/>
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

<script setup name="Mes_report_duanziyajieji">
import { listMes_report_duanziyajieji} from "@/api/extra/mes_report_duanziyajieji";
import {ref} from "vue";

const { proxy } = getCurrentInstance();

const mes_report_duanziyajiejiList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const testTimeRange = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    datatime: null,
    testStartTime: null,
    testEndTime: null,
    workresult: null,
    chanliangxuhao: null,
    xianlanguige: null,
    shengchanmoshi: null,
    tiaoma: null,
    hantoubianhao: null,
    hanjieshijian: null,
    chufagaodu: null,
    chengxinggaodu: null,
    yali: null,
    zhenfu: null,
    nengliang: null,
    pinlv: null,
    pingjungonglv: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

// 转序日期范围变化处理
function handleDateRangeChange(range) {
  if (range && range.length === 2) {
    queryParams.value.testStartTime = range[0];
    queryParams.value.testEndTime = range[1];
  } else {
    queryParams.value.testStartTime = null;
    queryParams.value.testEndTime = null;
  }
}

/** 查询端子压接机数据列表 */
function getList() {
  loading.value = true;
  listMes_report_duanziyajieji(queryParams.value).then(response => {
    mes_report_duanziyajiejiList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}


// 表单重置
function reset() {
  form.value = {
    id: null,
    datatime: null,
    workresult: null,
    chanliangxuhao: null,
    xianlanguige: null,
    shengchanmoshi: null,
    tiaoma: null,
    hantoubianhao: null,
    hanjieshijian: null,
    chufagaodu: null,
    chengxinggaodu: null,
    yali: null,
    zhenfu: null,
    nengliang: null,
    pinlv: null,
    pingjungonglv: null
  };
  proxy.resetForm("mes_report_duanziyajiejiRef");
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
  proxy.download('extra/mes/report/mes_report_duanziyajieji/export', {
    ...queryParams.value
  }, `mes_report_duanziyajieji_${new Date().getTime()}.xlsx`)
}

getList();
</script>
