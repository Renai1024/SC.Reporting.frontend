<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="项目编码" prop="projectNumber">
        <el-input
          v-model="queryParams.projectNumber"
          placeholder="请输入项目编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入项目名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="事业部" prop="businessDivision">
        <el-input
          v-model="queryParams.businessDivision"
          placeholder="请输入事业部"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计划开始时间" prop="projectPlanStartTime">
        <el-date-picker clearable
          v-model="queryParams.projectPlanStartTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择计划开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际开始时间" prop="projectActualStartTime">
        <el-date-picker clearable
          v-model="queryParams.projectActualStartTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择实际开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际结束时间" prop="projectActualEndTime">
        <el-date-picker clearable
          v-model="queryParams.projectActualEndTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择实际结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目状态" prop="projectState">
        <el-input
          v-model="queryParams.projectState"
          placeholder="请输入项目状态"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目经理" prop="projectManager">
        <el-input
          v-model="queryParams.projectManager"
          placeholder="请输入项目经理"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="项目计划达成率" prop="projectCompletedOnScheduleCount">-->
<!--        <el-input-->
<!--          v-model="queryParams.projectCompletedOnScheduleCount"-->
<!--          placeholder="请输入项目计划达成率"-->
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
          v-hasPermi="['extra:plm_project:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="plm_projectList"
              border style="width: 100%"
              max-height="600"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" align="center" />
<!--      <el-table-column label="主键id" align="center" prop="id" />-->
      <el-table-column label="项目编码" align="center" prop="projectNumber" min-width="160" show-overflow-tooltip/>
      <el-table-column label="项目名称" align="center" prop="projectName" min-width="160" show-overflow-tooltip/>
      <el-table-column label="事业部" align="center" prop="businessDivision" min-width="160" show-overflow-tooltip/>
      <el-table-column label="计划开始时间" align="center" prop="projectPlanStartTime" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.projectPlanStartTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际开始时间" align="center" prop="projectActualStartTime" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.projectActualStartTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际结束时间" align="center" prop="projectActualEndTime" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseTime(scope.row.projectActualEndTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目状态" align="center" prop="projectState" min-width="160" show-overflow-tooltip/>
      <el-table-column label="项目经理" align="center" prop="projectManager" min-width="160" show-overflow-tooltip/>
      <el-table-column label="项目计划达成率" align="center" prop="projectCompletedOnScheduleCount" min-width="160" show-overflow-tooltip/>
      <el-table-column label="项目标记" align="center" prop="projectMark" min-width="160" show-overflow-tooltip/>
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template #default="scope">-->
<!--          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['extra:plm_project:edit']">修改</el-button>-->
<!--          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['extra:plm_project:remove']">删除</el-button>-->
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


  </div>
</template>

<script setup name="Plm_project">
import { listPlm_project, getPlm_project, delPlm_project, addPlm_project, updatePlm_project } from "@/api/extra/plm_project";

const { proxy } = getCurrentInstance();

const plm_projectList = ref([]);
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
    projectNumber: null,
    projectName: null,
    businessDivision: null,
    projectPlanStartTime: null,
    projectActualStartTime: null,
    projectActualEndTime: null,
    projectState: null,
    projectManager: null,
    projectCompletedOnScheduleCount: null,
    projectMark: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询PLM项目列表 */
function getList() {
  loading.value = true;
  listPlm_project(queryParams.value).then(response => {
    plm_projectList.value = response.rows;
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
    projectNumber: null,
    projectName: null,
    businessDivision: null,
    projectPlanStartTime: null,
    projectActualStartTime: null,
    projectActualEndTime: null,
    projectState: null,
    projectManager: null,
    projectCompletedOnScheduleCount: null,
    projectMark: null
  };
  proxy.resetForm("plm_projectRef");
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
  proxy.download('extra/plm_project/export', {
    ...queryParams.value
  }, `plm_project_${new Date().getTime()}.xlsx`)
}

getList();
</script>
