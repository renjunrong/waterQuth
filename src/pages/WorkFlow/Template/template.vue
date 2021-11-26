<template>
  <div class="template">
    <div class="plate_top">
      <el-button @click="newFolder">流程设计</el-button>
      <div class="search_input">
        <el-input v-model="templateName" placeholder="请输入模板名称">
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="Search"
          />
        </el-input>
      </div>
    </div>
    <Table
      :is-index="true"
      :is-oper="true"
      :is-state="true"
      :table-data="tableData"
      :table-label="tableLabel"
      @statusChange="statusChange"
    >
      <template v-slot:operOne="dataRow">
        <div>
          <el-button type="text" @click="handleEdit(dataRow)">编辑</el-button>
          <el-button type="text" @click="handleDelete(dataRow)">删除</el-button>
        </div>
      </template>
    </Table>
    <Pagination :total="page.total" :pagesize="page.size" />
  </div>
</template>

<script>
import api from '@/api/template.js'
export default {
  data() {
    return {
      tableData: [],
      tableLabel: [
        { label: '模板名称', name: 'templateName', width: 200 },
        { label: '模板描述', name: 'templateDesc', width: 200 },
        { label: '创建人', name: 'createUser', width: 200 },
        { label: '创建时间', name: 'createDateStr', width: 200 },
        { label: '类别', name: 'templateTypeStr', width: 200 }
      ],
      templateName: '', // 模板类型
      page: {
        total: 10,
        size: 1
      }
    }
  },
  mounted() {
    this.searchList()
  },
  methods: {
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: `/plateform?id=${row.text.id}`
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteTemplate(row.text.id).then(res => {
          this.reminder(res.code, res.message)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // newFolder
    newFolder() {
      this.$router.push('/plateform')
    },
    async searchList() {
      const { data } = await api.templateList({
        templateName: this.templateName,
        current: this.page.size,
        size: 10
      })
      data.records.forEach(item => {
        item.templateStatus === 0 ? item.Status = false : item.Status = true
      })
      this.tableData = data.records
    },
    // 查询
    Search() {
      this.searchList()
    },
    reminder(code, message) {
      if (code === 20000) {
        this.$message.success(message)
        this.searchList()
      } else {
        this.$message.error(message)
      }
    },
    // 修改状态
    async statusChange(row) {
      const { code, message } = await api.changeStatus({
        id: row.id,
        templateStatus: row.Status === false ? 0 : 1
      })
      this.reminder(code, message)
    }
  }
}
</script>
<style lang="scss" scoped>
.template {
  .search_input {
    width: 240px;
    height: 30px;
    float: right;
  }
}
</style>
