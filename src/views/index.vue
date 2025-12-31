<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>顺科报表平台</h2>
        <p>
          本平台由顺科数字化中心倾力打造，是一个集信息聚合、服务集成、数据赋能与协同管理于一体的综合性线上平台。 作为公司数字化转型的核心门户，平台致力于打破信息孤岛、连接多元业务场景，为内外部用户提供高效智能的数字化服务体验。更核心的是，平台助力企业高效整合与处理海量业务数据，并将其转化为清晰、直观、可行动的报表与深度洞察，从而赋能各级管理者实现数据驱动的科学决策。
        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>技术选型</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>后端技术</h4>
            <ul>
              <li>SpringBoot</li>
              <li>Spring Security</li>
              <li>JWT</li>
              <li>MyBatis</li>
              <li>Druid</li>
              <li>Fastjson</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <h4>前端技术</h4>
            <ul>
              <li>Vue</li>
              <li>Vuex</li>
              <li>Element-ui</li>
              <li>Axios</li>
              <li>Sass</li>
              <li>Quill</li>
              <li>...</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <template v-slot:header>
            <div class="clearfix">
              <span>更新日志</span>
            </div>
          </template>
          <el-collapse accordion>
            <el-collapse-item title="v1.2.2 - 2025-12-24">
              <ol>
                <li>新增车间转序程序</li>
                <li>新增车间转序数据报表</li>
                <li>PLM定时任务新增：项目标记</li>
                <li>新增端子压接机数据报表</li>
                <li>修复了一些已知bug</li>
                <li>其他细节优化</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.2.1 - 2025-12-07">
              <ol>
                <li>新增气密性检测数据报表</li>
                <li>扫码检验前端优化</li>
                <li>扫码序列号格式校验</li>
                <li>检验与箱码绑定页签拆分</li>
                <li>新增查询已绑定箱码接口</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.2.0 - 2025-11-21">
              <ol>
                <li>新增比亚迪数据报表</li>
                <li>新增页签组件</li>
                <li>报表取消鉴权</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.10.0 - 2025-11-06">
              <ol>
                <li>新增焊接数据报表</li>
                <li>新增批量新增接口</li>
                <li>报表取消鉴权</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.9.0 - 2025-10-24">
              <ol>
                <li>新增碳化硅自动锁螺丝数据报表</li>
                <li>新增批量新增接口</li>
                <li>报表取消鉴权</li>
                <li>后端mybatis逻辑优化</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.8.0 - 2025-09-30">
              <ol>
                <li>新增PDA扫码追溯</li>
                <li>新增箱码绑定</li>
                <li>新增检验记录追溯报表</li>
                <li>报表取消鉴权</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.7.0 - 2025-09-11">
              <ol>
                <li>新增定时任务：调用PLM项目信息接口</li>
                <li>新增PLM项目报表</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.6.0 - 2025-09-08">
              <ol>
                <li>新增收料通知单报表</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.5.0 - 2025-08-26">
              <ol>
                <li>IQC报表前端UI优化</li>
                <li>IQC报表数据库字段长度优化</li>
                <li>后端updatePwd接口修复</li>
                <li>用户重置密码功能修复</li>
                <li>其他细节优化</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.4.0 - 2025-08-02">
              <ol>
                <li>新增MES IQC生产数据报表</li>
                <li>新增MES IQC生产数据报表同步接口，支持批量同步</li>
                <li>优化：MES IQC生产数据报表免登录、取消查询、导出操作鉴权</li>
                <li>优化：MES IQC生产数据报表支持模糊查询</li>
                <li>其他细节优化</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.3.0 - 2025-07-31">
              <ol>
                <li>优化物料报表导出字典映射</li>
                <li>新增字段：存货类别、物料分组</li>
                <li>其他细节优化</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.2.0 - 2025-07-29">
              <ol>
                <li>优化物料报表条件搜索查询</li>
                <li>新增按列表选中行导出后端接口</li>
                <li>新增前端导出按钮调用接口逻辑判断</li>
                <li>其他细节优化</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.1.0 - 2025-07-27">
              <ol>
                <li>新增物料报表</li>
                <li>新增组织、数据状态、禁用状态字典值</li>
                <li>新增Swagger接口文档</li>
                <li>其他细节优化</li>
              </ol>
            </el-collapse-item>
            <el-collapse-item title="v1.0.0 - 2025-07-25">
              <ol>
                <li>顺科报表平台正式发布</li>
              </ol>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index">
const version = ref('1.2.2')

function goTarget(url) {
  window.open(url, '__blank')
}
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

