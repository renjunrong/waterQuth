<template>
  <div class="chart-flow">
    <h3>“{{ formName }}”设计</h3>
    <el-row :gutter="20">
      <el-col :span="8"> <designVue /></el-col>
      <el-col :span="16">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="节点权限" name="first">
            <el-form
              ref="nodeForm"
              :model="nodeForm"
              :rules="rules"
              label-width="82px"
              class="node_form"
            >
              <el-form-item label="节点名称" prop="name">
                <el-input v-model="nodeForm.name" />
              </el-form-item>
              <el-form-item label="节点类型" prop="name">
                <el-select
                  v-model="nodeForm.region"
                  placeholder="请选择节点类型"
                >
                  <el-option label="区域一" value="shanghai" />
                </el-select>
              </el-form-item>
              <el-form-item label="处理类型" prop="name">
                <el-select
                  v-model="nodeForm.region"
                  placeholder="请选择节点类型"
                >
                  <el-option label="区域一" value="shanghai" />
                </el-select>
              </el-form-item>
              <el-form-item label="操作人员" prop="name">
                <el-select
                  v-model="nodeForm.region"
                  placeholder="请选择节点类型"
                >
                  <el-option label="区域一" value="shanghai" />
                </el-select>
              </el-form-item>
              <el-form-item label="设置抄送人" prop="name">
                <el-select
                  v-model="nodeForm.region"
                  placeholder="请选择节点类型"
                >
                  <el-option label="区域一" value="shanghai" />
                </el-select>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="表单权限" name="second">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="vertical" label="" width="180" />
              <el-table-column prop="siEdit" label="可编辑">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.siEdit" />
                </template>
              </el-table-column>
              <el-table-column prop="radio" label="可查看">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.siEdit" />
                </template>
              </el-table-column>
              <el-table-column prop="radio" label="隐藏">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.siEdit" />
                </template>
              </el-table-column>
              <el-table-column prop="radio" label="程序自动获取">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.siEdit" />
                </template>
              </el-table-column>
              <!-- <el-table-column v-for="(item,index) in tableLabel" :key="index" :prop="item.prop" :label="item.label" width="180">
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.radio" label="1" />
                </template>
              </el-table-column> -->
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import designVue from './design.vue'
export default {
  components: {
    designVue
  },
  data() {
    return {
      formName: '固定资产领用',
      activeName: 'second',
      nodeForm: {
        name: ''
      },
      rules: {},
      tableLabel: [
        {
          prop: 'vertical'
        }
      ],
      tableData: [
        { vertical: '表单名称', siEdit: true },
        { vertical: '预算金额', siEdit: true },
        { vertical: '预算类型', siEdit: true },
        { vertical: '编制日期', siEdit: true },
        { vertical: '分管领导意见', siEdit: true },
        { vertical: '分管领导审核日期', siEdit: true }
      ]
    }
  },
  methods: {
    // 切换权限
    handleClick(tab) {
      console.log(tab.name)
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-flow {
  width: 100%;
  height: 100%;
  .node_form {
    width: 400px;
  }
  .el-select {
    width: 100%;
  }
}
</style>
<style>
.chart-flow .el-tabs .el-checkbox__inner {
  border-radius: 14px;
}
.chart-flow .el-tabs .el-checkbox__inner::after {
  /* transform: translate(-50%, -50%) scale(1); */
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #fff;
  content: "";
  position: absolute;
  left: 36%;
  top: 36%;
  /* transform: translate(-50%, -50%) scale(0);
  transition: transform 0.15s ease-in; */
}
</style>
