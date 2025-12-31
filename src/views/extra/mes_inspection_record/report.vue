<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="序列号" prop="serialNumber">
        <el-input
          v-model="queryParams.serialNumber"
          placeholder="请输入序列号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="17.5尺寸检验人" prop="createBy1">-->
<!--        <el-input-->
<!--          v-model="queryParams.createBy1"-->
<!--          placeholder="17.5尺寸检验人"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="17.5尺寸检验时间" prop="createTime1">-->
<!--        <el-date-picker clearable-->
<!--          v-model="queryParams.createTime1"-->
<!--          type="date"-->
<!--          value-format="YYYY-MM-DD"-->
<!--          placeholder="17.5尺寸检验时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="47.5尺寸检验人" prop="createBy2">-->
<!--        <el-input-->
<!--          v-model="queryParams.createBy2"-->
<!--          placeholder="47.5尺寸检验人"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="47.5尺寸检验时间" prop="createTime2">-->
<!--        <el-date-picker clearable-->
<!--          v-model="queryParams.createTime2"-->
<!--          type="date"-->
<!--          value-format="YYYY-MM-DD"-->
<!--          placeholder="47.5尺寸检验时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="610尺寸检验人" prop="createBy3">-->
<!--        <el-input-->
<!--          v-model="queryParams.createBy3"-->
<!--          placeholder="610尺寸检验人"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="610尺寸检验时间" prop="createTime3">-->
<!--        <el-date-picker clearable-->
<!--          v-model="queryParams.createTime3"-->
<!--          type="date"-->
<!--          value-format="YYYY-MM-DD"-->
<!--          placeholder="610尺寸检验时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item label="箱码" prop="boxCode">
        <el-input
          v-model="queryParams.boxCode"
          placeholder="请输入箱码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户箱码" prop="customerBoxCode">
        <el-input
          v-model="queryParams.customerBoxCode"
          placeholder="请输入客户箱码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="Plus"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['extra:mes_inspection_record:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="Edit"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['extra:mes_inspection_record:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="Delete"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['extra:mes_inspection_record:remove']"-->
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
<!--    <el-col :span="1.5">-->
<!--      <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="Download"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['extra:mes_inspection_record:export']"-->
<!--      >导出</el-button>-->
<!--    </el-col>-->
<!--      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>-->
<!--    </el-row>-->

    <el-table v-loading="loading"
              :data="mes_inspection_recordList"
              border style="width: 100%"
              max-height="600"
              @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
<!--      <el-table-column label="主键ID" align="center" prop="id" />-->
      <el-table-column label="序列号" align="center" prop="serialNumber" min-width="180px" show-overflow-tooltip/>
      <el-table-column label="17.5尺寸检验结果" align="center" prop="result1" min-width="140px" show-overflow-tooltip>
        <template #default="scope">
          <dict-tag :options="sys_test_result" :value="scope.row.result1"/>
        </template>
      </el-table-column>
      <el-table-column label="17.5尺寸检验时间" align="center" prop="createTime1" min-width="160px" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime1, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="17.5尺寸检验人" align="center" prop="createBy1" min-width="140px" show-overflow-tooltip/>-->
      <el-table-column label="47.5尺寸检验结果" align="center" prop="result2" min-width="140px" show-overflow-tooltip>
        <template #default="scope">
          <dict-tag :options="sys_test_result" :value="scope.row.result2"/>
        </template>
      </el-table-column>
      <el-table-column label="47.5尺寸检验时间" align="center" prop="createTime1" min-width="160px" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime1, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="47.5尺寸检验人" align="center" prop="createBy2" min-width="140px" show-overflow-tooltip/>-->
      <el-table-column label="610尺寸检验结果" align="center" prop="result3" min-width="140px" show-overflow-tooltip>
        <template #default="scope">
          <dict-tag :options="sys_test_result" :value="scope.row.result3"/>
        </template>
      </el-table-column>
      <el-table-column label="610尺寸检验时间" align="center" prop="createTime2" min-width="160px" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime2, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="610尺寸检验人" align="center" prop="createBy3" min-width="140px" show-overflow-tooltip/>-->
      <el-table-column label="外观检验结果" align="center" prop="appearanceInspection" min-width="140px" show-overflow-tooltip>
        <template #default="scope">
          <dict-tag :options="sys_test_result" :value="scope.row.appearanceInspection"/>
        </template>
      </el-table-column>
      <el-table-column label="外观检验时间" align="center" prop="createTime3" min-width="160px" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime3, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="箱码" align="center" prop="boxCode" min-width="140px" show-overflow-tooltip/>
      <el-table-column label="箱码绑定时间" align="center" prop="boxCodeBindTime" min-width="160px" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.boxCodeBindTime, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户箱码" align="center" prop="customerBoxCode" min-width="140px" show-overflow-tooltip/>
      <el-table-column label="客户箱码绑定时间" align="center" prop="customerBoxCodeBindTime" min-width="160px" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.customerBoxCodeBindTime, '{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
<!--          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['extra:mes_inspection_record:edit']">修改</el-button>-->
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
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

<script setup name="Mes_inspection_record">
import { listMes_inspection_record} from "@/api/extra/mes_inspection_record";

// import { useDark, useToggle } from '@vueuse/core'
// import { onMounted, onUnmounted } from 'vue'

// // 获取当前暗黑模式状态
// const isDark = useDark()
// let originalDarkState = isDark.value
//
// // 页面加载时强制关闭暗黑模式
// onMounted(() => {
//   originalDarkState = isDark.value // 保存原始状态
//   if (isDark.value) {
//     isDark.value = false
//   }
// })
//
// // 页面离开时恢复原始状态（可选）
// onUnmounted(() => {
//   if (originalDarkState) {
//     isDark.value = originalDarkState
//   }
// })


const { proxy } = getCurrentInstance();
const { sys_test_result } = proxy.useDict('sys_test_result');

const mes_inspection_recordList = ref([]);
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
    serialNumber: null,
    result1: null,
    result2: null,
    result3: null,
    appearanceInspection: null,
    createBy1: null,
    createTime1: null,
    createBy2: null,
    createTime2: null,
    createBy3: null,
    createTime3: null,
    boxCode: null,
    customerBoxCode: null,
    boxCodeBindTime:  null,
    customerBoxCodeBindTime:  null
  },
  rules: {
    serialNumber: [
      { required: true, message: "序列号不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询检验数据列表 */
function getList() {
  loading.value = true;
  listMes_inspection_record(queryParams.value).then(response => {
    mes_inspection_recordList.value = response.rows;
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
    serialNumber: null,
    result1: null,
    result2: null,
    result3: null,
    appearanceInspection: null,
    createBy1: null,
    createTime1: null,
    createBy2: null,
    createTime2: null,
    createBy3: null,
    createTime3: null,
    boxCode: null,
    customerBoxCode: null
  };
  proxy.resetForm("mes_inspection_recordRef");
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
  proxy.download('extra/mes/report/mes_inspection_record/export', {
    ...queryParams.value
  }, `检验结果报表导出_${new Date().getTime()}.xlsx`)
}

getList();
</script>
