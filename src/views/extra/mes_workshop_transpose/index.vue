<template>
  <div class="app-container mobile-container">
    <!-- 页签 -->
    <el-tabs v-model="activeTab" class="mobile-tabs" @tab-change="handleTabChange" >
      <!-- 页签一：转序 -->
      <el-tab-pane label="转序登记" name="transfer" v-if="hasTransferPermission">
        <!-- 转序搜索栏 -->
        <div class="mobile-search-bar" v-show="showSearch">
          <el-input
              v-model="transferQueryParams.materialCode"
              placeholder="搜索物料编码"
              clearable
              @keyup.enter="handleTransferQuery"
              class="mobile-search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button type="primary" @click="handleTransferQuery" class="mobile-search-btn">搜索</el-button>
        </div>

        <!-- 操作按钮组 -->
        <div class="mobile-action-buttons" >
          <el-button
              type="primary"
              plain
              @click="handleAddTransfer"
              class="mobile-action-btn"
              v-hasPermi="['extra:mes_workshop_transpose:add']"
              style="max-height: 40px;font-size: 20px;"
          >转序登记</el-button>
        </div>

        <!-- 移动端卡片式列表（转序） -->
        <div class="mobile-list" v-loading="transferLoading" v-hasPermi="['extra:mes_workshop_transpose:list1']">
          <div v-if="transferList.length === 0" class="empty-state">
            <el-empty description="暂无转序数据" />
          </div>

          <div v-else class="mobile-list-scroll">
            <div
                v-for="item in transferList"
                :key="item.id"
                class="mobile-list-item"
                :class="{ 'selected': selectedTransferIds.includes(item.id) }"
                @click="toggleTransferSelect(item)"
            >
              <div class="item-header">
                <span class="label">唯一码:</span>
                <span class="value">{{ item.snowflakeId}}</span>
              </div>
              <div class="item-header">
                <span class="label">物料编码:</span>
                <span class="value">{{ item.materialCode }}</span>
              </div>

              <div class="item-content">
                <div class="item-row">
                  <span class="label">转出车间:</span>
                  <span class="value">{{ item.fromWorkshop }}</span>
                </div>
                <div class="item-row">
                  <span class="label">转入车间:</span>
                  <span class="value">{{ item.toWorkshop }}</span>
                </div>
                <div class="item-row">
                  <span class="label">转序数量:</span>
                  <span class="value">{{ item.transferQuantity }}</span>
                </div>
                <div class="item-row">
                  <span class="label">转序人员:</span>
                  <span class="value">{{ item.transferPerson }}</span>
                </div>
                <div class="item-row">
                  <span class="label">转序时间:</span>
                  <span class="value">{{ formatDate(item.transferTime) }}</span>
                </div>
                <div class="item-row">
                  <span class="label">收料人员:</span>
                  <span class="value">{{ item.receiverPerson }}</span>
                </div>
                <div class="item-row">
                  <span class="label">确认时间:</span>
                  <span class="value">{{ formatDate(item.confirmTime) }}</span>
                </div>
                <div class="item-row">
                  <span class="label">是否转序:</span>
                  <dict-tag :options="sys_yes_no" :value="item.isTransferred" class="dict-tag" />
                </div>
                <div class="item-row">
                  <span class="label">是否收料:</span>
                  <dict-tag :options="sys_yes_no" :value="item.isConfirmed" class="dict-tag" />
                </div>
                <div class="item-row">
                  <span class="label">备注:</span>
                  <span class="value">{{item.remark }}</span>
                </div>
              </div>

              <div class="item-actions">
                <el-button
                    v-if="item.isConfirmed === 'N' || item.isConfirmed === null"
                    link
                    type="primary"
                    icon="Edit"
                    @click.stop="handleEditTransferQuantity(item)"
                    v-hasPermi="['extra:mes_workshop_transpose:modify']"
                >修改数量</el-button>
              </div>
              <div class="item-actions">
                <el-button
                    v-if="item.isConfirmed === 'N' || item.isConfirmed === null"
                    link
                    type="danger"
                    icon="Delete"
                    @click.stop="handleDeleteTransfer(item)"
                    v-hasPermi="['extra:mes_workshop_transpose:remove']"
                >删除</el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页组件（转序） -->
        <pagination
            v-show="transferTotal>0"
            :total="transferTotal"
            v-model:page="transferQueryParams.pageNum"
            v-model:limit="transferQueryParams.pageSize"
            @pagination="handleTransferPagination"
            class="mobile-pagination"
        />
      </el-tab-pane>

      <!-- 页签二：收料确认 -->
      <el-tab-pane label="收料确认" name="receive" v-if="hasConfirmPermission">
        <!-- 收料确认搜索栏 -->
        <div class="mobile-search-bar" v-show="showSearch">
          <el-input
              v-model="receiveQueryParams.materialCode"
              placeholder="搜索物料编码"
              clearable
              @keyup.enter="handleReceiveQuery"
              class="mobile-search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button type="primary" @click="handleReceiveQuery" class="mobile-search-btn">搜索</el-button>
        </div>

        <!-- 移动端卡片式列表（收料确认） -->
        <div class="mobile-list" v-loading="receiveLoading" v-hasPermi="['extra:mes_workshop_transpose:list2']">
          <div v-if="receiveList.length === 0" class="empty-state">
            <el-empty description="暂无收料确认数据" />
          </div>

          <div v-else class="mobile-list-scroll">
            <div
                v-for="item in receiveList"
                :key="item.id"
                class="mobile-list-item"
                :class="{ 'selected': selectedTransferIds.includes(item.id) }"
                @click="handleUpdateTransfer(item)"
            >
              <div class="item-header">
                <span class="label">物料编码:</span>
                <span class="value">{{ item.materialCode }}</span>
              </div>
              <div class="item-header">
                <span class="label">唯一码:</span>
                <span class="value">{{ item.snowflakeId}}</span>
              </div>

              <div class="item-content">
                <div class="item-row">
                  <span class="label">转出车间:</span>
                  <span class="value">{{ item.fromWorkshop }}</span>
                </div>
                <div class="item-row">
                  <span class="label">转入车间:</span>
                  <span class="value">{{ item.toWorkshop }}</span>
                </div>
                <div class="item-row">
                  <span class="label">转序数量:</span>
                  <span class="value">{{ item.transferQuantity }}</span>
                </div>
                <div class="item-row">
                  <span class="label">转序人员:</span>
                  <span class="value">{{ item.transferPerson }}</span>
                </div>
                <div class="item-row">
                  <span class="label">转序时间:</span>
                  <span class="value">{{ formatDate(item.transferTime)}}</span>
                </div>
                <div class="item-row">
                  <span class="label">是否转序:</span>
                  <dict-tag :options="sys_yes_no" :value="item.isTransferred" class="dict-tag" />
                </div>
                <div class="item-row">
                  <span class="label">是否确认:</span>
                  <dict-tag :options="sys_yes_no" :value="item.isConfirmed" class="dict-tag" />
                </div>
                <div class="item-row">
                  <span class="label">备注:</span>
                  <span class="value">{{item.remark }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页组件（收料确认） -->
        <pagination
            v-show="receiveTotal>0"
            :total="receiveTotal"
            v-model:page="receiveQueryParams.pageNum"
            v-model:limit="receiveQueryParams.pageSize"
            @pagination="handleReceivePagination"
            class="mobile-pagination"
        />
      </el-tab-pane>
    </el-tabs>

    <!-- 转序对话框 -->
    <el-dialog
        :title="transferTitle"
        v-model="transferOpen"
        width="90%"
        class="mobile-dialog"
        :close-on-click-modal="false"
    >
      <el-form
          ref="transferFormRef"
          :model="transferForm"
          :rules="transferRules"
          label-width="100px"
          class="mobile-form"
      >
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12">
            <el-form-item label="物料编码" prop="materialCode">
              <el-autocomplete
                  v-model="transferForm.materialCode"
                  placeholder="请输入或搜索物料编码"
                  :fetch-suggestions="queryMaterialSearch"
                  @select="handleMaterialSelect"
                  clearable
                  class="material-autocomplete"
                  @input="handleMaterialInput"
              >
                <template #default="{ item }">
                  <div>{{ item.code }} - {{ item.name }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="转出车间" prop="fromWorkshop">
              <!-- 修改为下拉框 -->
              <el-select
                  v-model="transferForm.fromWorkshop"
                  placeholder="请选择转出车间"
                  clearable
                  filterable
                  class="workshop-select"
                  @change="handleWorkshopChange"
              >
                <el-option
                    v-for="item in workshopOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="转入车间" prop="toWorkshop">
              <!-- 修改为下拉框 -->
              <el-select
                  v-model="transferForm.toWorkshop"
                  placeholder="请选择转入车间"
                  clearable
                  filterable
                  class="workshop-select"
                  @change="handleWorkshopChange"
              >
                <el-option
                    v-for="item in workshopOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="转序数量" prop="transferQuantity">
              <el-input v-model="transferForm.transferQuantity" placeholder="请输入转序数量" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="转序人员" prop="transferPerson">
              <!-- 修改为自动完成组件，与物料编码样式一致 -->
              <el-autocomplete
                  v-model="transferForm.transferPerson"
                  placeholder="请输入或搜索转序人员"
                  :fetch-suggestions="queryWorkerSearch"
                  @select="handleTransferPersonSelect"
                  clearable
                  class="worker-autocomplete"
                  @input="handleWorkerInput"
              >
                <template #default="{ item }">
                  <div>{{ item.code }} - {{ item.name }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="转序时间" prop="transferTime">
              <el-date-picker
                  v-model="transferForm.transferTime"
                  type="datetime"
                  placeholder="请选择转序时间"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  :teleported="false"
                  :popper-options="{ placement: 'top' }"
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="transferForm.remark"
                        placeholder=""
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer mobile-dialog-footer">
          <el-button type="primary" @click="submitTransferForm" class="submit-btn">确定</el-button>
          <el-button @click="cancelTransfer" class="cancel-btn">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 修改转序数量对话框 -->
    <el-dialog
        title="修改转序数量"
        v-model="transferQuantityEditOpen"
        width="90%"
        class="mobile-dialog"
        :close-on-click-modal="false"
    >
      <el-form
          ref="transferQuantityEditFormRef"
          :model="transferQuantityEditForm"
          :rules="transferQuantityEditRules"
          label-width="100px"
          class="mobile-form"
      >
        <el-form-item label="转序数量" prop="transferQuantity">
          <el-input
              v-model="transferQuantityEditForm.transferQuantity"
              placeholder="请输入转序数量"
              type="number"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer mobile-dialog-footer">
          <el-button type="primary" @click="submitTransferQuantityEdit" class="submit-btn">确定</el-button>
          <el-button @click="cancelTransferQuantityEdit" class="cancel-btn">取消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 收料确认对话框 -->
    <el-dialog
        :title="receiveTitle"
        v-model="receiveOpen"
        width="90%"
        class="mobile-dialog"
        :close-on-click-modal="false"
    >
      <el-form
          ref="receiveFormRef"
          :model="receiveForm"
          :rules="receiveRules"
          label-width="100px"
          class="mobile-form"
      >
        <el-row :gutter="15">
          <el-col :xs="24" :sm="12">
            <el-form-item label="物料编码" prop="materialCode">
              <el-input v-model="receiveForm.materialCode" placeholder="请输入物料编码" readonly/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="转出车间" prop="fromWorkshop">
              <el-input
                  v-model="receiveForm.fromWorkshop"
                  placeholder="请选择转出车间"
                  readonly
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="转入车间" prop="toWorkshop">
              <el-input
                  v-model="receiveForm.toWorkshop"
                  placeholder="请选择转入车间"
                  readonly
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="转序数量" prop="transferQuantity">
              <el-input v-model="receiveForm.transferQuantity" placeholder="请输入转序数量" readonly/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="收料人员" prop="receiverPerson">
              <!-- 修改为自动完成组件，与物料编码样式一致 -->
              <el-autocomplete
                  v-model="receiveForm.receiverPerson"
                  placeholder="请输入或搜索收料人员"
                  :fetch-suggestions="queryWorkerSearch"
                  @select="handleReceiverPersonSelect"
                  clearable
                  class="worker-autocomplete"
                  @input="handleReceiverPersonInput"
              >
                <template #default="{ item }">
                  <div>{{ item.code }} - {{ item.name }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="转序时间" prop="transferTime">
              <el-date-picker
                  v-model="receiveForm.transferTime"
                  type="datetime"
                  placeholder="请选择确认时间"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  readonly
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="receiveForm.remark"
                        placeholder=""
                        readonly
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer mobile-dialog-footer">
          <el-button type="primary" @click="submitReceiveForm" class="submit-btn">确定</el-button>
          <el-button @click="cancelReceive" class="cancel-btn">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Mes_workshop_transpose_mobile">
import {
  listMes_workshop_transpose,
  getMes_workshop_transpose,
  delMes_workshop_transpose,
  addMes_workshop_transpose,
  updateMes_workshop_transpose,
  search_workshop, search_worker, changeQuantity, search_material
} from "@/api/extra/mes_workshop_transpose";
import {Search} from '@element-plus/icons-vue'
import {debounce} from 'lodash-es';

const {proxy} = getCurrentInstance();
const {sys_yes_no} = proxy.useDict('sys_yes_no');

const activeTab = ref('transfer'); // 当前激活的页签
const showSearch = ref(true);

// 修复权限计算属性
const hasTransferPermission = ref(false);
const hasConfirmPermission = ref(false);

// 检查权限
const checkPermissions = () => {
  // 使用 proxy.$auth.hasPermi 来检查权限
  hasTransferPermission.value = proxy.$auth.hasPermi('extra:mes_workshop_transpose:list1');
  hasConfirmPermission.value = proxy.$auth.hasPermi('extra:mes_workshop_transpose:list2');

  // 如果没有权限，设置默认激活的页签
  if (!hasTransferPermission.value && hasConfirmPermission.value) {
    activeTab.value = 'receive';
  }
};

// 动态计算可用的页签
const availableTabs = computed(() => {
  const tabs = [];
  if (hasTransferPermission.value) tabs.push('transfer');
  if (hasConfirmPermission.value) tabs.push('receive');
  return tabs;
});

// 确保激活的页签始终有效
watch(availableTabs, (newTabs) => {
  if (newTabs.length > 0 && !newTabs.includes(activeTab.value)) {
    activeTab.value = newTabs[0];
  }
}, {immediate: true});

// 车间选项
const workshopOptions = ref([]);

// 加载车间选项
const loadWorkshopOptions = async () => {
  try {
    const response = await search_workshop({
      pageNum: 1,
      pageSize: 1000 // 加载所有车间
    });

    let data = [];
    if (response.data && Array.isArray(response.data)) {
      data = response.data;
    } else if (response.rows && Array.isArray(response.rows)) {
      data = response.rows;
    }

    workshopOptions.value = data.map(item => ({
      value: item.code || item.workshopCode || '',
      label: item.name || item.workshopName || ''
    }));
  } catch (error) {
    console.error('加载车间选项失败:', error);
    workshopOptions.value = [];
  }
};

// 在组件挂载时检查权限并加载选项
onMounted(() => {
  checkPermissions();
  // 加载下拉框选项
  loadWorkshopOptions();

  // 根据权限加载数据
  if (activeTab.value === 'receive' && hasConfirmPermission.value) {
    getReceiveList()
  } else if (activeTab.value === 'transfer' && hasTransferPermission.value) {
    getTransferList()
  }
});

// 转序相关数据
const transferList = ref([]);
const transferLoading = ref(true);
const transferTotal = ref(0);
const selectedTransferIds = ref([]);
const transferSingle = ref(true);
const transferMultiple = ref(true);

// 收料确认相关数据
const receiveList = ref([]);
const receiveLoading = ref(true);
const receiveTotal = ref(0);
const selectedReceiveIds = ref([]);
const receiveSingle = ref(true);
const receiveMultiple = ref(true);

// 转序查询参数
const transferQueryParams = ref({
  pageNum: 1,
  pageSize: 10,
  snowflakeId: null,
  materialCode: null,
  materialName: null,
  fromWorkshop: null,
  toWorkshop: null,
  transferQuantity: null,
  transferTime: null,
  transferPerson: null,
  confirmTime: null,
  receiverPerson: null,
  isTransferred: null,
  isConfirmed: null
});

// 收料确认查询参数
const receiveQueryParams = ref({
  pageNum: 1,
  pageSize: 10,
  snowflakeId: null,
  materialCode: null,
  materialName: null,
  fromWorkshop: null,
  toWorkshop: null,
  transferQuantity: null,
  transferTime: null,
  transferPerson: null,
  confirmTime: null,
  receiverPerson: null,
  isTransferred: 'Y', // 只查询已转序的数据
  isConfirmed: 'N' // 只查询未确认的数据
});

// 转序对话框相关变量
const transferOpen = ref(false);
const transferTitle = ref("");
const transferFormRef = ref();
const transferForm = ref({
  materialCode: "",
  materialName: "",
  fromWorkshop: "",
  toWorkshop: "",
  transferQuantity: "",
  transferTime: "",
  transferPerson: "",
  remark: "",
  isTransferred: "1" // 默认已转序
});

// 修改转序数量对话框相关变量
const transferQuantityEditOpen = ref(false);
const transferQuantityEditFormRef = ref();
const transferQuantityEditForm = ref({
  id: null,
  isTransferred: "1"
});

const transferQuantityEditRules = {
  transferQuantity: [
    {required: true, message: "转序数量不能为空", trigger: "blur"},
    {pattern: /^[1-9]\d*$/, message: "请输入正整数", trigger: "blur"}
  ]
};

const transferRules = {
  materialCode: [
    {required: true, message: "物料编码不能为空", trigger: "blur"}
  ],
  fromWorkshop: [
    {required: true, message: "请选择转出车间", trigger: "change"},
    {
      validator: (rule, value, callback) => {
        if (value && transferForm.value.toWorkshop && value === transferForm.value.toWorkshop) {
          callback(new Error("转出车间和转入车间不能相同"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  toWorkshop: [
    {required: true, message: "请选择转入车间", trigger: "change"},
    {
      validator: (rule, value, callback) => {
        if (value && transferForm.value.fromWorkshop && value === transferForm.value.fromWorkshop) {
          callback(new Error("转出车间和转入车间不能相同"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ],
  transferQuantity: [
    {required: true, message: "转序数量不能为空", trigger: "blur"},
    {pattern: /^[1-9]\d*$/, message: "请输入正整数", trigger: "blur"}
  ],
  transferPerson: [
    {required: true, message: "请选择转序人员", trigger: "blur"}
  ]
};

// 收料确认对话框相关变量
const receiveOpen = ref(false);
const receiveTitle = ref("");
const receiveFormRef = ref();
const receiveForm = ref({
  materialCode: "",
  fromWorkshop: "",
  toWorkshop: "",
  transferQuantity: "",
  transferTime: null,
  transferPerson: null,
  confirmTime: "",
  receiverPerson: "",
  isTransferred: "1",
  isConfirmed: "1",
  remark: null
});

const receiveRules = {
  materialCode: [
    {required: true, message: "物料编码不能为空", trigger: "blur"}
  ],
  fromWorkshop: [
    {required: true, message: "请选择转出车间", trigger: "change"}
  ],
  toWorkshop: [
    {required: true, message: "请选择转入车间", trigger: "change"}
  ],
  transferQuantity: [
    {required: true, message: "转序数量不能为空", trigger: "blur"},
    {pattern: /^[1-9]\d*$/, message: "请输入正整数", trigger: "blur"}
  ],
  receiverPerson: [
    {required: true, message: "请选择收料人员", trigger: "blur"}
  ],
  confirmTime: [
    {required: true, message: "请选择确认时间", trigger: "change"}
  ]
};

// 日期格式化
function formatDate(dateString) {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // 如果已经是格式化的字符串，直接返回
      return dateString;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error('日期格式化错误:', error, dateString);
    return dateString;
  }
}

/** 查询转序列表 */
function getTransferList() {
  transferLoading.value = true;
  listMes_workshop_transpose(transferQueryParams.value).then(response => {
    transferList.value = response.rows;
    transferTotal.value = response.total;
    transferLoading.value = false;
    selectedTransferIds.value = []; // 清空选择
    transferSingle.value = true;
    transferMultiple.value = true;
  });
}

/** 转序分页事件处理 */
function handleTransferPagination({page, limit}) {
  transferQueryParams.value.pageNum = page;
  transferQueryParams.value.pageSize = limit;
  getTransferList();
}

/** 查询收料确认列表 */
function getReceiveList() {
  receiveLoading.value = true;
  listMes_workshop_transpose(receiveQueryParams.value).then(response => {
    receiveList.value = response.rows;
    receiveTotal.value = response.total;
    receiveLoading.value = false;
    selectedReceiveIds.value = []; // 清空选择
    receiveSingle.value = true;
    receiveMultiple.value = true;
  });
}

/** 收料确认分页事件处理 */
function handleReceivePagination({page, limit}) {
  receiveQueryParams.value.pageNum = page;
  receiveQueryParams.value.pageSize = limit;
  getReceiveList();
}

/** 转序搜索按钮操作 */
function handleTransferQuery() {
  transferQueryParams.value.pageNum = 1;
  getTransferList();
}

/** 收料确认搜索按钮操作 */
function handleReceiveQuery() {
  receiveQueryParams.value.pageNum = 1;
  getReceiveList();
}

/** 页签切换事件 */
function handleTabChange(tabName) {
  if (tabName === 'transfer') {
    getTransferList();
  } else if (tabName === 'receive') {
    getReceiveList();
  }
}

// 转序表单重置
function resetTransferForm() {
  transferForm.value = {
    id: null,
    snowflakeId: null,
    materialCode: "",
    fromWorkshop: "",
    toWorkshop: "",
    transferQuantity: "",
    transferTime: "",
    transferPerson: "",
    confirmTime: null,
    receiverPerson: null,
    isTransferred: "1",
    isConfirmed: null,
    remark: null
  };
  if (transferFormRef.value) {
    transferFormRef.value.resetFields();
  }
}

// 收料确认表单重置
function resetReceiveForm() {
  receiveForm.value = {
    id: null,
    snowflakeId: null,
    materialCode: "",
    fromWorkshop: "",
    toWorkshop: "",
    transferQuantity: "",
    transferTime: null,
    transferPerson: null,
    confirmTime: "",
    receiverPerson: "",
    isTransferred: "1",
    isConfirmed: "1",
    remark: null
  };
  if (receiveFormRef.value) {
    receiveFormRef.value.resetFields();
  }
}

// 转序取消按钮
function cancelTransfer() {
  transferOpen.value = false;
  resetTransferForm();
}

// 修改转序数量按钮操作
function handleEditTransferQuantity(row) {
  if (!row || !row.id) {
    proxy.$modal.msgWarning("请选择要修改的数据");
    return;
  }

  // 检查确认状态，只有未确认的才允许修改
  if (row.isConfirmed !== 'N' && row.isConfirmed !== null) {
    proxy.$modal.msgWarning("只有未确认的数据才能修改数量");
    return;
  }

  // 获取完整数据
  getMes_workshop_transpose(row.id).then(response => {
    // 再次检查确认状态
    if (response.data.isConfirmed !== 'N' && response.data.isConfirmed !== null) {
      proxy.$modal.msgWarning("只有未确认的数据才能修改数量");
      return;
    }

    transferQuantityEditForm.value = {
      id: response.data.id,
      transferQuantity: response.data.transferQuantity || ""
    };
    transferQuantityEditOpen.value = true;
  }).catch(error => {
    proxy.$modal.msgError("获取数据失败");
  });
}

// 修改转序数量取消按钮
function cancelTransferQuantityEdit() {
  transferQuantityEditOpen.value = false;
  transferQuantityEditForm.value = {
    id: null,
    transferQuantity: ""
  };
  if (transferQuantityEditFormRef.value) {
    transferQuantityEditFormRef.value.resetFields();
  }
}

// 提交修改转序数量
function submitTransferQuantityEdit() {
  transferQuantityEditFormRef.value.validate(valid => {
    if (valid) {
      // 先获取完整数据，只更新数量字段
      getMes_workshop_transpose(transferQuantityEditForm.value.id).then(response => {
        const updateData = {
          ...response.data,
          transferQuantity: transferQuantityEditForm.value.transferQuantity
        };

        changeQuantity(updateData).then(() => {
          proxy.$modal.msgSuccess("修改成功");
          transferQuantityEditOpen.value = false;
          getTransferList();
          if (activeTab.value === 'receive') {
            getReceiveList();
          }
          cancelTransferQuantityEdit();
        }).catch(error => {
          const message = error?.response?.data?.msg || error?.message || "提交失败，请重试";
          proxy.$modal.alertError(message);
        });
      }).catch(error => {
        proxy.$modal.msgError("获取数据失败");
      });
    }
  });
}

// 收料确认取消按钮
function cancelReceive() {
  receiveOpen.value = false;
  resetReceiveForm();
}

// 转序选择项改变
function toggleTransferSelect(item) {
  const index = selectedTransferIds.value.indexOf(item.id);
  if (index > -1) {
    selectedTransferIds.value.splice(index, 1);
  } else {
    selectedTransferIds.value.push(item.id);
  }

  const selection = transferList.value.filter(x => selectedTransferIds.value.includes(x.id));
  transferSingle.value = selection.length != 1;
  transferMultiple.value = !selection.length;
}

// 收料确认选择项改变
function toggleReceiveSelect(item) {
  const index = selectedReceiveIds.value.indexOf(item.id);
  if (index > -1) {
    selectedReceiveIds.value.splice(index, 1);
  } else {
    selectedReceiveIds.value.push(item.id);
  }

  const selection = receiveList.value.filter(x => selectedReceiveIds.value.includes(x.id));
  receiveSingle.value = selection.length != 1;
  receiveMultiple.value = !selection.length;
}

/** 新增转序按钮操作 */
function handleAddTransfer() {
  resetTransferForm();
  transferOpen.value = true;
  transferTitle.value = "转序登记";
}

/** 修改转序/收料确认按钮操作 */
function handleUpdateTransfer(row) {
  let _id = null;

  // 根据当前页签决定使用哪个选择集
  if (activeTab.value === 'transfer') {
    // 转序页签
    _id = row ? row.id : selectedTransferIds.value[0];
    if (!_id) {
      proxy.$modal.msgWarning("请选择要收料的数据");
      return;
    }
    resetTransferForm();
  } else if (activeTab.value === 'receive') {
    // 收料确认页签
    _id = row ? row.id : selectedReceiveIds.value[0];
    if (!_id) {
      proxy.$modal.msgWarning("请选择要收料的数据");
      return;
    }
    resetReceiveForm();
  }

  getMes_workshop_transpose(_id).then(response => {
    if (activeTab.value === 'transfer') {
      // 转序修改 - 填充转序表单
      transferForm.value = response.data;
      // 确保日期格式正确
      if (transferForm.value.transferTime) {
        transferForm.value.transferTime = formatDate(transferForm.value.transferTime);
      }
      transferOpen.value = true;
      transferTitle.value = "修改转序";
    } else if (activeTab.value === 'receive') {
      // 收料确认修改 - 填充收料确认表单
      receiveForm.value = response.data;
      // 确保日期格式正确
      if (receiveForm.value.confirmTime) {
        receiveForm.value.confirmTime = formatDate(receiveForm.value.confirmTime);
      }
      // 如果确认时间不存在，设置为当前时间
      if (!receiveForm.value.confirmTime) {
        const now = new Date();
        receiveForm.value.confirmTime = formatDate(now);
      }
      receiveOpen.value = true;
      receiveTitle.value = "收料确认";
    }
  });
}

/** 物料搜索方法（用于el-autocomplete） */
const queryMaterialSearch = debounce(async (queryString, cb) => {
  if (!queryString) {
    cb([]);
    return;
  }

  try {
    const response = await search_material({
      searchText: queryString,
      pageNum: 1,
      pageSize: 20
    });

    let data = [];
    if (response.data && Array.isArray(response.data)) {
      data = response.data;
    } else if (response.rows && Array.isArray(response.rows)) {
      data = response.rows;
    }

    // 格式化数据
    const formattedData = data.map(item => ({
      ...item,
      value: item.code || item.materialCode || '', // 用于显示的值
      code: item.code || item.materialCode || '',
      name: item.name || item.materialName || ''
    }));

    cb(formattedData);
  } catch (error) {
    console.error('物料搜索失败:', error);
    cb([]);
  }
}, 300);

/** 员工搜索方法（用于el-autocomplete） */
const queryWorkerSearch = debounce(async (queryString, cb) => {
  if (!queryString) {
    cb([]);
    return;
  }

  try {
    const response = await search_worker({
      searchText: queryString,
      pageNum: 1,
      pageSize: 20
    });

    let data = [];
    if (response.data && Array.isArray(response.data)) {
      data = response.data;
    } else if (response.rows && Array.isArray(response.rows)) {
      data = response.rows;
    }

    // 格式化数据
    const formattedData = data.map(item => ({
      ...item,
      value: item.code || item.workerCode || '', // 用于显示的值
      code: item.code || item.workerCode || '',
      name: item.name || item.workerName || ''
    }));

    cb(formattedData);
  } catch (error) {
    console.error('员工搜索失败:', error);
    cb([]);
  }
}, 300);

/** 处理车间选择变化 */
function handleWorkshopChange() {
  // 清空相关字段的验证状态
  if (transferFormRef.value) {
    transferFormRef.value.clearValidate(['fromWorkshop', 'toWorkshop']);
    // 触发验证
    nextTick(() => {
      transferFormRef.value.validateField(['fromWorkshop', 'toWorkshop']);
    });
  }
}

/** 处理转序人员输入变化 */
function handleWorkerInput() {
  // 清空相关字段的验证状态
  if (transferFormRef.value) {
    transferFormRef.value.clearValidate(['transferPerson']);
  }
}

/** 处理收料人员输入变化 */
function handleReceiverPersonInput() {
  // 清空相关字段的验证状态
  if (receiveFormRef.value) {
    receiveFormRef.value.clearValidate(['receiverPerson']);
  }
}

/** 选择转序人员 */
function handleTransferPersonSelect(item) {
  const selectedCode = item.code || item.workerCode || '';
  const selectedName = item.name || item.workerName || '';

  // 更新表单数据，这里可以根据需要存储编码或名称
  transferForm.value.transferPerson = selectedName || selectedCode;

  // 触发验证
  nextTick(() => {
    if (transferFormRef.value) {
      transferFormRef.value.validateField('transferPerson');
    }
  });
}

/** 选择收料人员 */
function handleReceiverPersonSelect(item) {
  const selectedCode = item.code || item.workerCode || '';
  const selectedName = item.name || item.workerName || '';

  // 更新表单数据，这里可以根据需要存储编码或名称
  receiveForm.value.receiverPerson = selectedName || selectedCode;

  // 触发验证
  nextTick(() => {
    if (receiveFormRef.value) {
      receiveFormRef.value.validateField('receiverPerson');
    }
  });
}

/** 处理物料输入变化 */
function handleMaterialInput() {
  // 清空相关字段的验证状态
  if (transferFormRef.value) {
    transferFormRef.value.clearValidate(['materialCode']);
  }
}

/** 选择物料 */
function handleMaterialSelect(item) {
  const selectedCode = item.code || item.materialCode || '';
  const selectedName = item.name || item.materialName || '';

  // 触发验证
  nextTick(() => {
    if (transferFormRef.value) {
      transferFormRef.value.validateField('materialCode');
    }
  });
}

/** 提交转序表单 */
function submitTransferForm() {
  transferFormRef.value.validate(valid => {
    if (valid) {
      // 确保状态正确
      transferForm.value.isTransferred = "1";

      if (transferForm.value.id != null) {
        updateMes_workshop_transpose(transferForm.value).then(response => {
          proxy.$modal.msgSuccess("转序成功");
          transferOpen.value = false;
          getTransferList();
          if (activeTab.value === 'receive') {
            getReceiveList();
          }
        }).catch(error => {
          const message = error?.response?.data?.msg || error?.message || "提交失败，请重试";
          proxy.$modal.alertError(message);
        });
      } else {
        addMes_workshop_transpose(transferForm.value).then(response => {
          proxy.$modal.msgSuccess("转序成功");
          transferOpen.value = false;
          getTransferList();
          if (activeTab.value === 'receive') {
            getReceiveList();
          }
        }).catch(error => {
          const message = error?.response?.data?.msg || error?.message || "提交失败，请重试";
          proxy.$modal.alertError(message);
        });
      }
    }
  });
}

/** 提交收料确认表单 */
function submitReceiveForm() {
  receiveFormRef.value.validate(valid => {
    if (valid) {
      // 确保状态正确
      receiveForm.value.isTransferred = "1";
      receiveForm.value.isConfirmed = "1";

      if (receiveForm.value.id != null) {
        updateMes_workshop_transpose(receiveForm.value).then(response => {
          proxy.$modal.msgSuccess("收料成功");
          receiveOpen.value = false;
          getReceiveList();
          if (activeTab.value === 'transfer') {
            getTransferList();
          }
        }).catch(error => {
          const message = error?.response?.data?.msg || error?.message || "提交失败，请重试";
          proxy.$modal.alertError(message);
        });
      } else {
        addMes_workshop_transpose(receiveForm.value).then(response => {
          proxy.$modal.msgSuccess("收料成功");
          receiveOpen.value = false;
          getReceiveList();
          if (activeTab.value === 'transfer') {
            getTransferList();
          }
        }).catch(error => {
          const message = error?.response?.data?.msg || error?.message || "提交失败，请重试";
          proxy.$modal.alertError(message);
        });
      }
    }
  });
}

/** 删除转序按钮操作 */
function handleDeleteTransfer(row) {
  const _ids = row ? row.id : selectedTransferIds.value;
  if (!_ids || (Array.isArray(_ids) && _ids.length === 0)) {
    proxy.$modal.msgWarning("请选择要删除的数据");
    return;
  }

  proxy.$modal.confirm('是否确认删除选中的数据？').then(function () {
    return delMes_workshop_transpose(_ids);
  }).then(() => {
    proxy.$modal.msgSuccess("删除成功");
    getTransferList();
    if (activeTab.value === 'receive') {
      getReceiveList();
    }
  }).catch(() => {
  });
}

/** 导出按钮操作 */
function handleExport() {
  const queryParams = activeTab.value === 'transfer' ? transferQueryParams.value : receiveQueryParams.value;
  proxy.download('extra/mes/report/mes_workshop_transpose/export', {
    ...queryParams
  }, `mes_workshop_transpose_${new Date().getTime()}.xlsx`)
}

// 初始化加载
onMounted(() => {
  getTransferList();
});
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

.mobile-search-btn {
  flex-shrink: 0;
  min-width: 60px;
}

/* 页签样式 */
.mobile-tabs {
  margin-bottom: 15px;
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

/* 卡片滚动列表 */
.mobile-list-scroll {
  max-height: 590px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-list-item {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid var(--card-border, #e4e7ed);
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.mobile-list-item.selected {
  border-color: var(--selected-border);
  background-color: var(--selected-bg);
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.2);
}

.item-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 10px;
  font-weight: bold;
}

.item-header .label {
  min-width: 80px;
}

.item-header .value {
  font-weight: bold;
  flex: 1;
  color: #409eff;
}

.item-content {
  margin-bottom: 10px;
}

.item-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 13px;
  align-items: center;
}

.item-row .label {
  min-width: 80px;
  color: var(--label-color);
}

.item-row .value {
  text-align: right;
  flex: 1;
  color: var(--value-color);
}

.dict-tag {
  font-size: 12px;
}

.item-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid var(--border-color);
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

.submit-btn, .cancel-btn {
  width: 45%;
  margin: 0 5px;
}

/* 表单样式 */
.mobile-form :deep(.el-form-item__label) {
  font-weight: normal;
}

.mobile-form :deep(.el-input),
.mobile-form :deep(.el-autocomplete),
.mobile-form :deep(.el-select) {
  width: 100%;
}

/* 下拉框组件样式 */
.workshop-select {
  width: 100%;
}

/* 自动完成组件样式 */
.material-autocomplete,
.worker-autocomplete {
  width: 100%;
}

/* 选择对话框样式 */
.select-dialog :deep(.el-dialog__body) {
  padding: 15px 20px;
}

.select-dialog-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
}

.search-input {
  flex: 1;
}

.search-btn {
  flex-shrink: 0;
  min-width: 70px;
}

.select-list {
  flex: 1;
  min-height: 300px;
}

.select-pagination {
  margin-top: 15px;
}

/* 响应式调整 */
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

  .select-dialog :deep(.el-dialog) {
    width: 95% !important;
    max-width: 400px;
    margin: 5px auto;
  }
}

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
    min-height: 40px;
  }

  .mobile-action-btn {
    width: 100%;
    margin: 0;
  }

  .item-header {
    flex-direction: row;
    align-items: flex-start;
    padding: 0;
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

  .select-dialog :deep(.el-dialog) {
    width: 95% !important;
    max-width: 370px;
    margin: 5px auto;
  }

  .search-bar {
    flex-direction: column;
    gap: 8px;
  }

  .search-input {
    width: 100%;
  }

  .search-btn {
    width: 100%;
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

  :deep(.el-table) {
    --el-table-bg-color: #1f1f1f;
    --el-table-text-color: #e5e5e5;
    --el-table-border-color: #434343;
    --el-table-header-bg-color: #2a2a2a;
    --el-table-row-hover-bg-color: #2a2a2a;
    --el-table-current-row-bg-color: #1a3a5f;
  }

  :deep(.el-autocomplete) {
    --el-autocomplete-bg-color: #1f1f1f;
    --el-autocomplete-text-color: #e5e5e5;
    --el-autocomplete-border-color: #434343;
  }

  :deep(.el-select) {
    --el-select-bg-color: #1f1f1f;
    --el-select-text-color: #e5e5e5;
    --el-select-border-color: #434343;
  }

  /* 日期选择器弹出框样式 */
  :deep(.el-picker__popper) {
    --el-popup-bg-color: #1f1f1f;
    --el-popup-text-color: #e5e5e5;
    --el-popup-border-color: #434343;
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

.dark-mode :deep(.el-table) {
  --el-table-bg-color: #1f1f1f !important;
  --el-table-text-color: #e5e5e5 !important;
  --el-table-border-color: #434343 !important;
  --el-table-header-bg-color: #2a2a2a !important;
  --el-table-row-hover-bg-color: #2a2a2a !important;
  --el-table-current-row-bg-color: #1a3a5f !important;
}

.dark-mode :deep(.el-autocomplete) {
  --el-autocomplete-bg-color: #1f1f1f !important;
  --el-autocomplete-text-color: #e5e5e5 !important;
  --el-autocomplete-border-color: #434343 !important;
}

.dark-mode :deep(.el-select) {
  --el-select-bg-color: #1f1f1f !important;
  --el-select-text-color: #e5e5e5 !important;
  --el-select-border-color: #434343 !important;
}

/* 日期选择器样式调整 */
:deep(.el-date-editor .el-input__wrapper) {
  border-radius: 4px;
}

/* 确保日期选择器弹出框向上展开时有足够空间 */
:deep(.el-picker__popper) {
  max-width: 100vw;
  z-index: 9999 !important;
}

/* 移动端日期选择器优化 */
@media (max-width: 768px) {
  :deep(.el-picker-panel) {
    width: 100% !important;
    max-width: 100vw;
    box-sizing: border-box;
  }

  :deep(.el-picker__popper) {
    position: fixed !important;
    top: auto !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    max-width: 100vw;
    transform: none !important;
  }

  :deep(.el-date-picker) {
    width: 100% !important;
  }

  :deep(.el-picker-panel__body) {
    width: 100% !important;
  }

  :deep(.el-time-panel) {
    width: 100% !important;
  }
}
</style>