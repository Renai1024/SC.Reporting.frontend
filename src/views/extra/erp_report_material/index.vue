<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="物料编码" prop="materialNum">
        <el-input
          v-model="queryParams.materialNum"
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
      <el-form-item label="使用组织" prop="useOrg">
        <el-select v-model="queryParams.useOrg" placeholder="请选择使用组织" clearable>
          <el-option
            v-for="dict in sys_erp_organization"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="物料描述" prop="materialDesc">
        <el-input
          v-model="queryParams.materialDesc"
          placeholder="请输入物料描述"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格型号" prop="materialSpecification">
        <el-input
          v-model="queryParams.materialSpecification"
          placeholder="请输入规格型号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="顺科产品类型" prop="materialType">
        <el-input
          v-model="queryParams.materialType"
          placeholder="请输入顺科产品类型"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="事业部" prop="materialSyb">
        <el-input
          v-model="queryParams.materialSyb"
          placeholder="请输入事业部"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="行业" prop="materialHy">
        <el-input
            v-model="queryParams.materialHy"
            placeholder="请输入行业"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料属性" prop="materialProperty">
        <el-input
          v-model="queryParams.materialProperty"
          placeholder="请输入物料属性"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料分组" prop="materialGroup">
        <el-input
            v-model="queryParams.materialGroup"
            placeholder="请输入物料分组"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="存货类别" prop="materialInventoryType">
        <el-input
            v-model="queryParams.materialInventoryType"
            placeholder="请输入存货类别"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="基本单位" prop="materialUnit">
        <el-input
          v-model="queryParams.materialUnit"
          placeholder="请输入基本单位"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据状态" prop="dataStatus">
        <el-select v-model="queryParams.dataStatus" placeholder="请选择数据状态" clearable>
          <el-option
            v-for="dict in sys_document_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="禁用状态" prop="forbiddenStatus">
        <el-select v-model="queryParams.forbiddenStatus" placeholder="请选择禁用状态" clearable>
          <el-option
            v-for="dict in sys_forbidden_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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

    <!--<el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['extra:info:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->

    <el-table v-loading="loading"
              :data="infoList"
              border style="width: 100%"
              max-height="600"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" align="left" show-overflow-tooltip/>
      <!--el-table-column label="物料ID" align="center" prop="materialId" /-->
      <el-table-column label="物料编码" align="center" prop="materialNum" min-width="160" show-overflow-tooltip fixed/>
      <el-table-column label="物料名称" align="center" prop="materialName" min-width="160" show-overflow-tooltip/>
      <el-table-column label="使用组织" align="center" prop="useOrg" min-width="200" show-overflow-tooltip>
        <template #default="scope">
          <dict-tag :options="sys_erp_organization" :value="scope.row.useOrg"/>
        </template>
      </el-table-column>
      <el-table-column label="物料描述" align="center" prop="materialDesc" min-width="160" show-overflow-tooltip/>
      <el-table-column label="规格型号" align="center" prop="materialSpecification" min-width="160" show-overflow-tooltip/>
      <el-table-column label="顺科产品类型" align="center" prop="materialType" min-width="160" show-overflow-tooltip/>
      <el-table-column label="事业部" align="center" prop="materialSyb" min-width="160" show-overflow-tooltip/>
      <el-table-column label="行业" align="center" prop="materialHy" min-width="160" show-overflow-tooltip/>
      <el-table-column label="物料属性" align="center" prop="materialProperty" min-width="160" show-overflow-tooltip/>
      <el-table-column label="物料分组" align="center" prop="materialGroup" min-width="160" show-overflow-tooltip/>
      <el-table-column label="存货类别" align="center" prop="materialInventoryType" min-width="160" show-overflow-tooltip/>
      <el-table-column label="基本单位" align="center" prop="materialUnit" min-width="160" show-overflow-tooltip/>
      <el-table-column label="数据状态" align="center" prop="dataStatus" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <dict-tag :options="sys_document_status" :value="scope.row.dataStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="禁用状态" align="center" prop="forbiddenStatus" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <dict-tag :options="sys_forbidden_status" :value="scope.row.forbiddenStatus"/>
        </template>
      </el-table-column>
      <!--
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="160" show-overflow-tooltip>
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['extra:info:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['extra:info:remove']">删除</el-button>
        </template>
      </el-table-column>
      -->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改物料信息对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="infoRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物料编码" prop="materialNum">
          <el-input v-model="form.materialNum" placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="物料名称" prop="materialName">
          <el-input v-model="form.materialName" placeholder="请输入物料名称" />
        </el-form-item>
        <el-form-item label="使用组织" prop="useOrg">
          <el-radio-group v-model="form.useOrg">
            <el-radio
              v-for="dict in sys_erp_organization"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="物料描述" prop="materialDesc">
          <el-input v-model="form.materialDesc" placeholder="请输入物料描述" />
        </el-form-item>
        <el-form-item label="规格型号" prop="materialSpecification">
          <el-input v-model="form.materialSpecification" placeholder="请输入规格型号" />
        </el-form-item>
        <el-form-item label="顺科产品类型" prop="materialType">
          <el-input v-model="form.materialType" placeholder="请输入顺科产品类型" />
        </el-form-item>
        <el-form-item label="事业部" prop="materialSyb">
          <el-input v-model="form.materialSyb" placeholder="请输入事业部" />
        </el-form-item>
        <el-form-item label="物料属性" prop="materialProperty">
          <el-input v-model="form.materialProperty" placeholder="请输入物料属性" />
        </el-form-item>
        <el-form-item label="行业" prop="materialHy">
          <el-input v-model="form.materialHy" placeholder="请输入行业" />
        </el-form-item>
        <el-form-item label="基本单位" prop="materialUnit">
          <el-input v-model="form.materialUnit" placeholder="请输入基本单位" />
        </el-form-item>
        <el-form-item label="数据状态" prop="dataStatus">
          <el-radio-group v-model="form.dataStatus">
            <el-radio
              v-for="dict in sys_document_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="禁用状态" prop="forbiddenStatus">
          <el-radio-group v-model="form.forbiddenStatus">
            <el-radio
              v-for="dict in sys_forbidden_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
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

<script setup name="Info">
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from "@/api/extra/erp_report_material.js";
import {ElMessage, ElMessageBox} from "element-plus";

const { proxy } = getCurrentInstance();
const { sys_erp_organization, sys_document_status, sys_forbidden_status } = proxy.useDict('sys_erp_organization', 'sys_document_status', 'sys_forbidden_status');

const infoList = ref([]);
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
    materialNum: null,
    materialName: null,
    useOrg: null,
    materialDesc: null,
    materialSpecification: null,
    materialType: null,
    materialSyb: null,
    materialHy: null,
    materialProperty: null,
    materialGroup: null,
    materialInventoryType: null,
    materialUnit: null,
    dataStatus: null,
    forbiddenStatus: null
  },
  rules: {
    materialNum: [
      { required: true, message: "物料编码不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询物料信息列表 */
function getList() {
  loading.value = true;
  listInfo(queryParams.value).then(response => {
    infoList.value = response.rows;
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
    materialId: null,
    materialNum: null,
    materialName: null,
    useOrg: null,
    materialDesc: null,
    materialSpecification: null,
    materialType: null,
    materialSyb: null,
    materialHy: null,
    materialProperty: null,
    materialGroup: null,
    materialInventoryType: null,
    materialUnit: null,
    dataStatus: null,
    forbiddenStatus: null
  };
  proxy.resetForm("infoRef");
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
  ids.value = selection.map(item => item.materialId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加物料信息";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _materialId = row.materialId || ids.value
  getInfo(_materialId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改物料信息";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["infoRef"].validate(valid => {
    if (valid) {
      if (form.value.materialId != null) {
        updateInfo(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addInfo(form.value).then(response => {
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
  const _materialIds = row.materialId || ids.value;
  proxy.$modal.confirm('是否确认删除物料信息编号为"' + _materialIds + '"的数据项？').then(function() {
    return delInfo(_materialIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
async function handleExport() {
  if(ids.value.length > 0){
    try{
      await ElMessageBox.confirm(`是否确认导出所有勾选物料信息数据项？总计${ids.value.length}条`,'导出确认',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'primary'
      })
      proxy.download('extra/erp/report/material/exportByIds', {
        ids: ids.value.join(',')}, `info_${new Date().getTime()}.xlsx`)
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
      await ElMessageBox.confirm('是否确认导出所有物料信息数据项？该操作耗时较长！','导出确认',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      proxy.download('extra/erp/report/material/export', {
        ...queryParams.value
      }, `info_${new Date().getTime()}.xlsx`)
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
