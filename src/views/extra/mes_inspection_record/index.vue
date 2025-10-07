<template>
  <div class="app-container mobile-container">
    <!-- 移动端搜索栏 -->
    <div class="mobile-search-bar" v-show="showSearch">
      <el-input
          v-model="queryParams.serialNumber"
          placeholder="搜索序列号"
          clearable
          @keyup.enter="handleQuery"
          class="mobile-search-input"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-button type="primary" @click="handleQuery" class="mobile-search-btn">搜索</el-button>
    </div>



    <!-- 操作按钮组 -->
    <div class="mobile-action-buttons">
      <el-button
          type="primary"
          plain
          @click="handleAdd1"
          class="mobile-action-btn"
          v-hasPermi="['extra:mes_inspection_record:add1']"
      >17.5&47.4尺寸</el-button>
      <el-button
          type="primary"
          plain
          @click="handleAdd2"
          class="mobile-action-btn"
          v-hasPermi="['extra:mes_inspection_record:add2']"
      >610尺寸</el-button>
      <el-button
          type="primary"
          plain
          @click="handleAdd3"
          class="mobile-action-btn"
          v-hasPermi="['extra:mes_inspection_record:add3']"
      >外观检验</el-button>
      <el-button
          type="success"
          plain
          @click="handleAdd4"
          class="mobile-action-btn"
          v-hasPermi="['extra:mes_inspection_record:add4']"
      >箱码绑定</el-button>
      <el-button
          type="success"
          plain
          @click="handleAdd5"
          class="mobile-action-btn"
          v-hasPermi="['extra:mes_inspection_record:add5']"
      >客户箱码绑定</el-button>
<!--      <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="Delete"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          class="mobile-action-btn"-->
<!--          v-hasPermi="['extra:mes_inspection_record:remove']"-->
<!--      >删除</el-button>-->
<!--      <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="Download"-->
<!--          @click="handleExport"-->
<!--          class="mobile-action-btn"-->
<!--          v-hasPermi="['extra:mes_inspection_record:export']"-->
<!--      >导出</el-button>-->
    </div>

    <!-- 移动端卡片式列表 -->
    <div class="mobile-list" v-loading="loading">
      <div v-if="mes_inspection_recordList.length === 0" class="empty-state">
        <el-empty description="暂无数据" />
      </div>

      <div v-else class="mobile-list-scroll">
        <div
            v-for="item in mes_inspection_recordList"
            :key="item.id"
            class="mobile-list-item"
            :class="{ 'selected': selectedIds.includes(item.id) }"
            @click="toggleSelect(item)"
        >
          <div class="item-header">
            <span class="label" style="min-width: 20px;" >序列号:</span>
            <span class="serial-number">{{ item.serialNumber }}</span>
          </div>

          <div class="item-content">
            <div class="item-row" >
              <span class="label" >17.5尺寸：</span>
              <div style="display: flex; align-items: center">
                <dict-tag :options="sys_test_result" :value="item.result1" class="dict-tag" style="margin-right: 10px"/>
                <span class="value" >{{formatDate(item.createTime1)}}</span>
                <span class="date-value" >{{item.createBy1}}</span>
              </div>
            </div>
            <div class="item-row">
              <span class="label">47.5尺寸：</span>
              <div style="display: flex; align-items: center">
                <dict-tag :options="sys_test_result" :value="item.result2" class="dict-tag" style="margin-right: 10px"/>
                <span class="value">{{formatDate(item.createTime1)}}</span>
                <span class="date-value" style="width: auto">{{item.createBy1}}</span>
              </div>
            </div>
            <div class="item-row">
              <span class="label">610尺寸：</span>
              <div style="display: flex; align-items: center">
                <dict-tag :options="sys_test_result" :value="item.result3" class="dict-tag" style="margin-right: 10px"/>
                <span class="value">{{formatDate(item.createTime2)}}</span>
                <span class="date-value" style="width: auto">{{item.createBy2}}</span>
              </div>
            </div>
            <div class="item-row">
              <span class="label">外观检验：</span>
              <div style="display: flex; align-items: center">
                <dict-tag :options="sys_test_result" :value="item.appearanceInspection" class="dict-tag" style="margin-right: 10px"/>
                <span class="value">{{formatDate(item.createTime3)}}</span>
                <span class="date-value" style="width: auto">{{item.createBy3}}</span>
              </div>
            </div>
          </div>

          <div class="item-actions">
            <el-button
                link
                type="danger"
                icon="Delete"
                @click.stop="handleDelete(item)"
                v-hasPermi="['extra:mes_inspection_record:remove']"
            >删除</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页组件 -->
    <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
        class="mobile-pagination"
    />

    <!-- 新增对话框1 -->
    <el-dialog
        :title="title1"
        v-model="open1"
        width="90%"
        class="mobile-dialog"
        :close-on-click-modal="false"
    >
      <el-form
          ref="formRef1"
          :model="form1"
          :rules="rules1"
          label-width="100px"
          class="mobile-form"
      >
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12">
            <el-form-item label="序列号" prop="serialNumber">
              <el-input v-model="form1.serialNumber" placeholder="请输入序列号" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="17.5尺寸" prop="result1">
              <el-select v-model="form1.result1" placeholder="请选择检验结果">
                <el-option
                    v-for="dict in sys_test_result"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="47.5尺寸" prop="result2">
              <el-select v-model="form1.result2" placeholder="请选择结果">
                <el-option
                    v-for="dict in sys_test_result"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer mobile-dialog-footer">
          <el-button type="primary" @click="submitForm1" class="submit-btn">确定</el-button>
          <el-button @click="cancel1" class="cancel-btn">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 对话框2：序列号、结果3 -->
    <el-dialog
        :title="title2"
        v-model="open2"
        width="90%"
        class="mobile-dialog"
        :close-on-click-modal="false"
    >
      <el-form
          ref="formRef2"
          :model="form2"
          :rules="rules2"
          label-width="100px"
          class="mobile-form"
      >
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12">
            <el-form-item label="序列号" prop="serialNumber">
              <el-input v-model="form2.serialNumber" placeholder="请输入序列号" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="610尺寸" prop="result3">
              <el-select v-model="form2.result3" placeholder="请选择检验结果">
                <el-option
                    v-for="dict in sys_test_result"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer mobile-dialog-footer">
          <el-button type="primary" @click="submitForm2" class="submit-btn">确定</el-button>
          <el-button @click="cancel2" class="cancel-btn">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 对话框3：序列号、检验结果 -->
    <el-dialog
        :title="title3"
        v-model="open3"
        width="90%"
        class="mobile-dialog"
        :close-on-click-modal="false"
    >
      <el-form
          ref="formRef3"
          :model="form3"
          :rules="rules3"
          label-width="100px"
          class="mobile-form"
      >
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12">
            <el-form-item label="序列号" prop="serialNumber">
              <el-input v-model="form3.serialNumber" placeholder="请输入序列号" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="外观检验" prop="appearanceInspection">
              <el-select v-model="form3.appearanceInspection" placeholder="请选择检验结果">
                <el-option
                    v-for="dict in sys_test_result"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer mobile-dialog-footer">
          <el-button type="primary" @click="submitForm3" class="submit-btn">确定</el-button>
          <el-button @click="cancel3" class="cancel-btn">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 对话框4：箱码绑定 -->
    <el-dialog
        :title="title4"
        v-model="open4"
        width="90%"
        class="mobile-dialog"
        :close-on-click-modal="false"
    >
      <el-form
          ref="formRef4"
          :model="form4"
          :rules="rules4"
          label-width="100px"
          class="mobile-form"
      >
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="序列号" prop="currentSerialNumber">
              <el-input
                  v-model="form4.currentSerialNumber"
                  placeholder="请输入序列号"
                  @keyup.enter="handleNext"
                  clearable
              >
                <template #append>
                  <el-button @click="handleNext" type="primary">下一个</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="箱码" prop="boxCode">
              <el-input v-model="form4.boxCode" placeholder="请输入箱码" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否尾箱" prop="isTailBox">
              <el-checkbox v-model="form4.isTailBox"></el-checkbox>
<!--              <div class="tail-box-tip">尾箱允许绑定数量少于20个</div>-->
              <div>已绑定: {{ serialNumberArray.length }}/20</div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="已绑定序列号">
              <div class="serial-count">
                <span v-if="!form4.isTailBox && serialNumberArray.length !== 20" class="count-warning">
<!--                  (必须绑定20个序列号)-->
                </span>
                <span v-else-if="form4.isTailBox && serialNumberArray.length > 20" class="count-warning">
<!--                  (尾箱不能超过20个序列号)-->
                </span>
              </div>
              <el-tag
                  v-for="(serial, index) in serialNumberArray"
                  :key="index"
                  closable
                  @close="removeSerialNumber(index)"
                  style="margin-right: 8px; margin-bottom: 8px;"
              >
                {{ serial }}
              </el-tag>
              <div v-if="serialNumberArray.length === 0" class="empty-tag">
                暂无序列号
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="序列号集合">
              <el-input
                  v-model="serialNumbersDisplay"
                  type="textarea"
                  :rows="3"
                  placeholder="序列号将显示在这里"
                  readonly
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer mobile-dialog-footer">
          <el-button type="primary" @click="submitForm4" class="submit-btn" :disabled="serialNumberArray.length === 0">确定绑定</el-button>
          <el-button @click="cancel4" class="cancel-btn">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <!--添加对话框5：客户箱码绑定 -->
    <el-dialog
        :title="title5"
        v-model="open5"
        width="90%"
        class="mobile-dialog"
        :close-on-click-modal="false"
    >
      <el-form
          ref="formRef5"
          :model="form5"
          :rules="rules5"
          label-width="100px"
          class="mobile-form"
      >
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="箱码" prop="boxCode">
              <el-input
                  v-model="form5.boxCode"
                  placeholder="请输入箱码"
                  clearable
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="客户箱码" prop="customerBoxCode">
              <el-input v-model="form5.customerBoxCode" placeholder="请输入客户箱码" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer mobile-dialog-footer">
          <el-button
              type="primary"
              @click="submitForm5"
              class="submit-btn"
              :disabled="!form5.boxCode || !form5.customerBoxCode"
          >确定绑定</el-button>
          <el-button @click="cancel5" class="cancel-btn">取消</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup name="Mes_inspection_record">
import {
  listMes_inspection_record,
  getMes_inspection_record,
  delMes_inspection_record,
  updateMes_inspection_record,
  addMes_inspection_record3,
  addMes_inspection_record1,
  addMes_inspection_record2,
  addMes_inspection_record4,
  addMes_inspection_record5
} from "@/api/extra/mes_inspection_record";
import { Search} from '@element-plus/icons-vue'

const { proxy } = getCurrentInstance();
const { sys_test_result } = proxy.useDict('sys_test_result');

const mes_inspection_recordList = ref([]);

const loading = ref(true);
const showSearch = ref(true);
const showAdvancedSearch = ref(false);
const selectedIds = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

// 序列号数组集合
const serialNumberArray = ref([]);

// 计算属性：序列号集合显示
const serialNumbersDisplay = computed(() => {
  return serialNumberArray.value.join(', ');
});

// 计算属性：是否可以提交箱码绑定
const canSubmitBoxBinding = computed(() => {
  if (!form4.value.boxCode || serialNumberArray.value.length === 0) {
    return false;
  }

  if (form4.value.isTailBox) {
    // 尾箱：数量不能超过20
    return serialNumberArray.value.length <= 20;
  } else {
    // 非尾箱：必须正好20个
    return serialNumberArray.value.length === 20;
  }
});


//获取字典中"OK"对应的值，用于设置默认值
const getQualifiedValue = () => {
  const qualifiedOption = sys_test_result.value.find(item => item.label === 'OK');
  return qualifiedOption ? qualifiedOption.value : null;
};

// 对话框1相关变量
const title1 = ref("");
const open1 = ref(false);
const formRef1 = ref();
const form1 = ref({});
const rules1 = {
  serialNumber: [
    { required: true, message: "序列号不能为空", trigger: "blur" }
  ],
  result1: [
    { required: true, message: "结果不能为空", trigger: "blur" }
  ],
  result2: [
    { required: true, message: "结果不能为空", trigger: "blur" }
  ]
};

// 对话框2相关变量
const open2 = ref(false);
const title2 = ref("");
const formRef2 = ref();
const form2 = ref({});
const rules2 = {
  serialNumber: [
    { required: true, message: "序列号不能为空", trigger: "blur" }
  ],
  result3: [
    { required: true, message: "结果不能为空", trigger: "blur" }
  ]
};

// 对话框3相关变量
const open3 = ref(false);
const title3 = ref("");
const formRef3 = ref();
const form3 = ref({});
const rules3 = {
  serialNumber: [
    { required: true, message: "序列号不能为空", trigger: "blur" }
  ],
  appearanceInspection: [
    { required: true, message: "检验结果不能为空", trigger: "blur" }
  ]
};

// 对话框4：箱码绑定相关变量
const open4 = ref(false);
const title4 = ref("");
const formRef4 = ref();
const form4 = ref({
  serialNumbersDisplay: "",
  boxCode: "",
  isTailBox: false // 是否尾箱，默认不勾选
});
const rules4 = {
  serialNumbersDisplay: [
    { required: true, message: "序列号不能为空", trigger: "blur" }
  ],
  boxCode: [
    { required: true, message: "箱码不能为空", trigger: "blur" }
  ]
};

// 对话框5：客户箱码绑定相关变量
const open5 = ref(false);
const title5 = ref("");
const formRef5 = ref();
const form5 = ref({
  boxCode: "",
  customerBoxCode: "",
});
const rules5 = {
  boxCode: [
    { required: true, message: "箱码不能为空", trigger: "blur" }
  ],
  customerBoxCode: [
    { required: true, message: "客户箱码不能为空", trigger: "blur" }
  ]
};


const queryParams = ref({
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
  customerBoxCode: null
});

// const data = reactive({
//   form: {},
//   queryParams: {
//     pageNum: 1,
//     pageSize: 10,
//     serialNumber: null,
//     result1: null,
//     result2: null,
//     result3: null,
//     appearanceInspection: null,
//   },
//   rules: {
//     serialNumber: [
//       { required: true, message: "序列号不能为空", trigger: "blur" }
//     ],
//     result1: [
//       { required: true, message: "结果1不能为空", trigger: "blur" }
//     ],
//     result2: [
//         { required: true, message: "结果2不能为空", trigger: "blur" }
//     ],
//     result3: [
//         { required: true, message: "结果3不能为空", trigger: "blur" }
//     ],
//     appearanceInspection: [
//         { required: true, message: "外观检验不能为空", trigger: "blur" }
//     ]
//   }
// });

// const { queryParams, form, rules } = toRefs(data);

//日期格式化yyyy-MM-dd HH:mm:ss
function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/** 查询检验记录列表 */
function getList() {
  loading.value = true;
  listMes_inspection_record(queryParams.value).then(response => {
    mes_inspection_recordList.value = response.rows;
    total.value = response.total;
    loading.value = false;
    selectedIds.value = []; // 清空选择
  });
}

// 取消1按钮
function cancel1() {
  open1.value = false;
  reset1();
}


// 对话框1表单重置
function reset1() {
  form1.value = {
    id: null,
    serialNumber: null,
    result1: null,
    result2: null,
  };
  proxy.resetForm("formRef1");
}

// 对话框2取消按钮
function cancel2() {
  open2.value = false;
  reset2();
}

// 对话框2表单重置
function reset2() {
  form2.value = {
    id: null,
    serialNumber: null,
    result3: null,
  };
  proxy.resetForm("formRef2");
}

// 对话框3取消按钮
function cancel3() {
  open3.value = false;
  reset3();
}

// 对话框3表单重置
function reset3() {
  form3.value = {
    id: null,
    serialNumber: null,
    appearanceInspection: null,
  };
  proxy.resetForm("formRef3");
}

// 对话框4取消按钮
function cancel4() {
  open4.value = false;
  reset4();
}

// 对话框4表单重置
function reset4() {
  form4.value = {
    currentSerialNumber: "",
    boxCode: ""
  };
  serialNumberArray.value = [];
  proxy.resetForm("formRef4");
}

// 对话框5取消按钮
function cancel5() {
  open5.value = false;
  reset5();
}

// 对话框5表单重置
function reset5() {
  form5.value = {
    boxCode: "",
    customerBoxCode: "",
  };
  proxy.resetForm("formRef5");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
  showAdvancedSearch.value = false;
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
    serialNumber: null,
    result1: null,
    result2: null,
    result3: null,
    appearanceInspection: null,

  };
  handleQuery();
}

// 选择项改变
function handleSelectionChange(selection) {
  const ids = selection.map(item => item.id);
  selectedIds.value = ids;
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

// 移动端点击选择
function toggleSelect(item) {
  const index = selectedIds.value.indexOf(item.id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    selectedIds.value.push(item.id);
  }

  // 更新single和multiple状态
  const selection = mes_inspection_recordList.value.filter(x => selectedIds.value.includes(x.id));
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增1按钮操作 */
function handleAdd1() {
  reset1();
  // 设置默认值为"合格"
  const qualifiedValue = getQualifiedValue();
  if (qualifiedValue) {
    form1.value.result1 = qualifiedValue;
    form1.value.result2 = qualifiedValue;
  }
  open1.value = true;
  title1.value = "17.5尺寸&47.5尺寸";
}

/** 新增2按钮操作 */
function handleAdd2() {
  reset2();
  // 设置默认值为"合格"
  const qualifiedValue = getQualifiedValue();
  if (qualifiedValue) {
    form2.value.result3 = qualifiedValue;
  }
  open2.value = true;
  title2.value = "610尺寸";
}

/** 新增3按钮操作 */
function handleAdd3() {
  reset3();
  // 设置默认值为"合格"
  const qualifiedValue = getQualifiedValue();
  if (qualifiedValue) {
    form3.value.appearanceInspection = qualifiedValue;
  }
  open3.value = true;
  title3.value = "外观检验";
}



/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || selectedIds.value[0]
  getMes_inspection_record(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改检验记录";
  });
}

/** 箱码绑定按钮操作 */
function handleAdd4() {
  reset4();
  open4.value = true;
  title4.value = "箱码绑定";
}

/** 下一个按钮操作 */
function handleNext() {
  if (!form4.value.currentSerialNumber) {
    proxy.$modal.msgWarning("请输入序列号");
    return;
  }

  // 检查序列号是否已存在
  if (serialNumberArray.value.includes(form4.value.currentSerialNumber)) {
    proxy.$modal.msgWarning("该序列号已存在");
    return;
  }

  // 添加到序列号数组
  serialNumberArray.value.push(form4.value.currentSerialNumber);

  // 清空当前序列号输入框
  form4.value.currentSerialNumber = "";

  proxy.$modal.msgSuccess("序列号已添加");
}

/** 移除序列号 */
function removeSerialNumber(index) {
  serialNumberArray.value.splice(index, 1);
}

/** 客户箱码绑定按钮操作 */
function handleAdd5() {
  reset5();
  open5.value = true;
  title5.value = "客户箱码绑定";
}

/** 提交表单4（箱码绑定） */
function submitForm4() {
  formRef4.value.validate(valid => {
    if (valid) {
      if (serialNumberArray.value.length === 0) {
        proxy.$modal.msgWarning("请至少添加一个序列号");
        return;
      }

      const requestData = {
        serialNumbers: serialNumberArray.value,
        boxCode: form4.value.boxCode
      };

      // 非尾箱检查
      if (!form4.value.isTailBox && serialNumberArray.value.length !== 20) {
        proxy.$modal.msgError("非尾箱，序列号数量必须为20");
        return;
      }

      // 尾箱检查
      if (form4.value.isTailBox && serialNumberArray.value.length > 20) {
        proxy.$modal.msgError("尾箱序列号数量不能超过20");
        return;
      }

      addMes_inspection_record4(requestData).then(response => {
        proxy.$modal.msgSuccess("箱码绑定成功");
        open4.value = false;
        getList();
      }).catch(error => {
        console.error(error.message || "未知错误");
        //proxy.$modal.msgError("箱码绑定失败");
      });
    }
  });
}

/** 提交表单5（客户箱码绑定） */
function submitForm5() {
  formRef5.value.validate(valid => {
    if (valid) {
      const requestData = {
        boxCode: form5.value.boxCode,
        customerBoxCode: form5.value.customerBoxCode
      };

      // 调用客户箱码绑定API
      proxy.$modal.confirm('确认要绑定客户箱码吗？').then(() => {
        addMes_inspection_record5(requestData).then(response => {
          proxy.$modal.msgSuccess("客户箱码绑定成功");
          open5.value = false;
          getList();
        }).catch(error => {
          console.error(error.message || "未知错误");
          //proxy.$modal.msgError("客户箱码绑定失败!" + (error.message || "未知错误"));
        });
      }).catch(() => {});
    }
  });
}

/** 提交表单1 */
function submitForm1() {
  formRef1.value.validate(valid => {
    if (valid) {
      if (form1.value.id != null) {
        updateMes_inspection_record(form1.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open1.value = false;
          getList();
        });
      } else {
        addMes_inspection_record1(form1.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open1.value = false;
          getList();
        });
      }
    }
  });
}

/** 提交表单2 */
function submitForm2() {
  formRef2.value.validate(valid => {
    if (valid) {
      if (form2.value.id != null) {
        updateMes_inspection_record(form2.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open2.value = false;
          getList();
        });
      } else {
        addMes_inspection_record2(form2.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open2.value = false;
          getList();
        });
      }
    }
  });
}

/** 提交表单3 */
function submitForm3() {
  formRef3.value.validate(valid => {
    if (valid) {
      if (form3.value.id != null) {
        updateMes_inspection_record(form3.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open3.value = false;
          getList();
        });
      } else {
        addMes_inspection_record3(form3.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open3.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || selectedIds.value;
  if (!_ids || _ids.length === 0) {
    proxy.$modal.msgWarning("请选择要删除的数据");
    return;
  }

  proxy.$modal.confirm('是否确认删除选中的数据？').then(function() {
    return delMes_inspection_record(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('extra/mes/report/mes_inspection_record/export', {
    ...queryParams.value
  }, `mes_inspection_record_${new Date().getTime()}.xlsx`)
}

getList();
</script>

<style scoped>
.mobile-container {
  padding: 5px;
}

/* 移动端搜索栏 */
.mobile-search-bar {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  align-items: center;
}

.mobile-search-input {
  flex: 1;
}

.mobile-search-btn{
  flex-shrink: 0;
  min-width: 60px;
}

/* 高级搜索面板 */
.advanced-search-panel {
  /*background: #f8f9fa;*/
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.search-actions {
  text-align: center;
  margin-top: 10px;
}

/* 卡片滚动列表 */
.mobile-list-scroll {
  max-height: 590px; /* 三张卡片的高度，可根据实际调整 */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* 移动端平滑滚动 */
}

.mobile-list-item {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid var(--card-border, #e4e7ed);
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* 可选：添加轻微阴影增强立体感 */
}

.mobile-list-item.selected {
  border-color: var(--selected-border);
  background-color: var(--selected-bg);
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.2); /* 选中状态阴影加深 */
}

/* 操作按钮组 */
.mobile-action-buttons {
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  padding: 0;
  flex-direction: column;
}

.mobile-action-btn {
  flex: 1;
  min-width: 80px;
  font-size: 12px;
  padding: 8px 5px;
}

/* 移动端列表 */
.mobile-list {
  min-height: 200px;
}

/*
.mobile-list-item {
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s;
}*/

/*
.mobile-list-item.selected {
  border-color: #409eff;
  background-color: #f0f7ff;
}*/

.item-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 10px;
  font-weight: bold;
  /*color: #303133;*/
}

.item-checkbox {
  flex-shrink: 0;
}

.serial-number {
  font-weight: bold;
  /*color: #303133;*/
  flex: 1;
}

.box-code {
  color: #909399;
  font-size: 12px;
}

.item-content {
  margin-bottom: 10px;
}

.item-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  font-size: 13px;
  align-items: center;
}

.item-row .label {
  /*color: #303133;*/
  min-width: 80px;
}

.item-row .value {
  /*color: #303133;*/
  text-align: right;
  flex: 1;
  margin-right: 10px;
}

.item-row .date-value {
  /*color: #303133;*/
  text-align: right;
}

.dict-tag {
  font-size: 12px;
}

.item-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  /*border-top: 1px solid #f0f0f0;*/
  padding-top: 8px;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 40px 0;
}

/* 分页 */
.mobile-pagination {
  margin-top: 15px;
  align-items: center;
}

/* 对话框 */
.mobile-dialog :deep(.el-dialog__body) {
  padding: 15px 20px;
}

.mobile-dialog-footer {
  text-align: center;
}

.submit-btn,
.cancel-btn {
  width: 45%;
  margin: 0 5px;
}

/* 表单样式 */
.mobile-form :deep(.el-form-item__label) {
  font-weight: normal;
}

.mobile-form :deep(.el-input) {
  width: 100%;
}


/*响应式调整*/
@media (max-width: 768px) {
  .mobile-container {
    padding: 5px;
  }

  .mobile-list-item {
    padding: 10px;
  }

  .item-actions {
    flex-direction: column;
    gap: 5px;
  }

  .item-actions .el-button {
    width: 100%;
    text-align: center;
  }
}


/*
@media (max-width: 480px) {
  .mobile-action-buttons {
    flex-direction: column;
  }

  .mobile-action-btn {
    width: 100%;
  }

  .item-row {
    flex-direction: row;
  }

  .item-row .value {
    color: #303133;
    text-align: right;
    flex: 1;
    margin-right: 15px;
  }

  .item-row .date-value {
    color: #303133;
    text-align: right;
  }
}
*/


/* 针对386px宽度的特殊调整 */
@media (max-width: 386px) {
  .mobile-container {
    padding: 5px;
    width: 100%;
  }

  .mobile-search-bar {
    flex-direction: row;
    gap: 8px;
  }

  .mobile-search-input {
    width: 100%;
  }

  .mobile-action-buttons {
    flex-direction: column;
    padding: 0;
    gap: 5px;
  }

  .mobile-action-btn {
    width: 100%;
    margin: 0;
  }

  .item-header {
    flex-direction: row;
    align-items: flex-start;
  }

  .serial-number {
    margin-top: 3px;
  }

  .mobile-list-item {
    padding: 8px;
  }

  .item-actions {
    flex-direction: column;
    gap: 5px;
  }

  .item-actions .el-button {
    width: 100%;
    text-align: center;
  }

  .mobile-dialog :deep(.el-dialog) {
    width: 95% !important;
    max-width: 370px;
    margin: 5px auto;
  }

  .mobile-form :deep(.el-col) {
    width: 100%;
  }

  .item-row {
    flex-direction: row;
  }

  .item-row .value {
    /*color: #303133;*/
    text-align: right;
    flex: 1;
    margin-right: 10px;
  }

  .item-row .date-value {
    /*color: #303133;*/
    text-align: right;
  }
}

/* 浅色模式变量 */
:root {
  --bg-color: #ffffff;
  --text-primary: #303133;
  --text-secondary: #606266;
  --border-color: #e4e7ed;
  --card-bg: #ffffff;
  --card-border: #e4e7ed;
  --selected-bg: #f0f7ff;
  --selected-border: #409eff;
  --label-color: #303133;
  --value-color: #303133;
  --empty-bg: #f8f9fa;
}

/* 暗黑模式变量 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #141414;
    --text-primary: #e5e5e5;
    --text-secondary: #a0a0a0;
    --border-color: #434343;
    --card-bg: #1f1f1f;
    --card-border: #434343;
    --selected-bg: #1a3a5f;
    --selected-border: #409eff;
    --label-color: #e5e5e5;
    --value-color: #cccccc;
    --empty-bg: #1a1a1a;
  }
}

/* 暗黑模式下的Element Plus组件调整 */
@media (prefers-color-scheme: dark) {
  :deep(.el-input) {
    --el-input-bg-color: #1f1f1f;
    --el-input-text-color: #e5e5e5;
    --el-input-border-color: #434343;
  }

  :deep(.el-button) {
    --el-button-bg-color: #2a2a2a;
    --el-button-text-color: #e5e5e5;
    --el-button-border-color: #434343;
  }

  :deep(.el-dialog) {
    --el-dialog-bg-color: #1f1f1f;
    --el-dialog-text-color: #e5e5e5;
  }
}

.dark-mode :deep(.el-input) {
  --el-input-bg-color: #1f1f1f !important;
  --el-input-text-color: #e5e5e5 !important;
  --el-input-border-color: #434343 !important;
}

.dark-mode :deep(.el-button) {
  --el-button-bg-color: #2a2a2a !important;
  --el-button-text-color: #e5e5e5 !important;
  --el-button-border-color: #434343 !important;
}

.dark-mode :deep(.el-dialog) {
  --el-dialog-bg-color: #1f1f1f !important;
  --el-dialog-text-color: #e5e5e5 !important;
}




</style>