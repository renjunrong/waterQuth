<template>
  <div class="template">
    <div class="plate_top">
      <el-button @click="newFolder">新建表单</el-button>
      <div class="search_input">
        <el-input v-model="formName" placeholder="请输入模板名称">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="Search" />
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
import api from '@/api/workform.js'
export default {
  data() {
    return {
      tableData: [],
      tableLabel: [
        { label: '表单名称', name: 'formName', width: 200 },
        { label: '表单描述', name: 'formDesc', width: 200 },
        { label: '表单类型', name: 'formTypeStr', width: 200 },
        { label: '创建人', name: 'createUser', width: 200 },
        { label: '创建时间', name: 'createDate', width: 200 }
      ],
      formName: '', // 模板类型
      page: {
        total: 0,
        size: 10,
        current: 1
      }
    }
  },
  mounted() {
    this.searchList()
  },
  methods: {
    // 编辑
    handleEdit(row) {
      this.$router.push(`/controlform?${row.text.id}`)
    },
    // 删除
    async handleDelete(row) {
      const { code } = await api.delete(row.text.id)
      this.reminder(code)
    },
    // newFolder 新增表单
    newFolder() {
      this.$router.push('/controlform')
    },
    async searchList() {
      const { data } = await api.FormList({
        current: this.page.current,
        size: this.page.size,
        formName: this.formName
      })
      data.records.forEach(item => {
        item.formStatus === 0 ? item.Status = false : item.Status = true
      })
      this.tableData = data.records
    },
    // 查询
    Search() {
      this.searchList()
    },
    reminder(code) {
      if (code === 20000) {
        this.$message.success('操作成功')
        this.searchList()
      }
    },
    // 修改状态
    async statusChange(row) {
      const { code } = await api.status({
        id: row.id,
        formStatus: row.Status === false ? 0 : 1
      })
      this.reminder(code)
    }
  }
}
</script>
<style lang="scss" scoped>
.template {
  .search_input{
    width: 240px;
    height: 30px;
    float: right;
  }
}
</style>
