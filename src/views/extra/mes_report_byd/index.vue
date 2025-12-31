<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" type="border-card">
<!--      <el-tabs v-model="activeTab" type="border-card" @tab-change="handleTabChange">-->
      <el-tab-pane label="标签打印记录" name="print">
        <print-tab ref="printTabRef" />
      </el-tab-pane>
      <el-tab-pane label="标签扫码记录" name="scan">
        <scan-tab ref="scanTabRef" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<!--// 切换页签时重新加载数据-->
<!--function handleTabChange(tabName) {-->
<!--if (tabName === 'print' && printTabRef.value) {-->
<!--printTabRef.value.getList()-->
<!--} else if (tabName === 'scan' && scanTabRef.value) {-->
<!--scanTabRef.value.getList()-->
<!--}-->
<!--}-->

<script setup name="BydLabel">
import { ref, getCurrentInstance } from 'vue'
import PrintTab from '../../../components/BYD/PrintTab.vue'
import ScanTab from '../../../components/BYD/ScanTab.vue'

const { proxy } = getCurrentInstance()
const activeTab = ref('print')
const printTabRef = ref()
const scanTabRef = ref()



</script>

<style scoped>
.app-container {
  padding: 20px;
}
</style>