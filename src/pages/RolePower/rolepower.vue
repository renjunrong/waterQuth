<template>
  <div class="role-power">
    <div class="plate_top">
      <el-button @click="newRole">新建角色</el-button>
    </div>
    <Table
      :is-index="true"
      :is-oper="true"
      :table-data="tableData"
      :table-label="tableLabel"
    >
      <template v-slot:operOne="dataRow">
        <div>
          <el-button type="text" @click="handleEdit(dataRow)">编辑</el-button>
          <el-button type="text" @click="handleDelete(dataRow)">删除</el-button>
        </div>
      </template>
    </Table>
    <Pagination :total="page.total" :pagesize="page.size" />
    <el-dialog :title="dialogTitle" :visible.sync="roleDialogForm">
      <newroleVue v-if="roleDialogForm" ref="newrole" :tree-data="treeData" :row-id="rowId" :role-form="roleForm" @submit="submit" />
    </el-dialog>
  </div>
</template>

<script>
import newroleVue from './newrole.vue'
import api from '@/api/usermanage'
export default {
  components: {
    newroleVue
  },
  data() {
    return {
      tableData: [],
      tableLabel: [
        { label: '角色名称', name: 'name', width: 200 },
        { label: '涉及的子模块', name: 'remark', width: 300 },
        { label: '描述', name: 'remark' }
      ],
      page: {
        total: 0,
        size: 10,
        current: 1
      },
      roleDialogForm: false,
      dialogTitle: '新建角色',
      treeData: [],
      keysId: [], // 权限数据
      rowId: 0,
      roleForm: {
        roleName: '',
        description: ''
      },
      keys: [],
      getChild: []
    }
  },
  mounted() {
    this.seachList()
    this.powerList()
  },
  methods: {
    // 新建角色
    newRole() {
      this.roleDialogForm = true
      this.roleForm.roleName = ''
      this.roleForm.description = ''
      this.powerList()
    },
    // 获取权限数据
    handleEdit(row) {
      api.detailsRole(row.text.id).then(res => {
        this.roleForm.roleName = row.text.name
        this.roleForm.description = row.text.remark
        this.roleDialogForm = true
        this.$nextTick(() => {
          const keys = []; const keysId = []
          res.data.forEach(item => {
            if (item.type === 2) {
              keysId.push(item.id)
            } else if (item.type === 1) {
              keys.push(item.id)
            }
          })
          this.rowId = row.text.id
          this.keys = keys
          this.$refs.newrole.setCheckedKeys(keys, keysId)

          // this.treeData = res.data
        })
      })
    },

    // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteRole(row.text.id).then(res => {
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.seachList()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查询
    async seachList() {
      const { data } = await api.roleList({
        current: this.page.current,
        size: this.page.size
      })
      this.tableData = data.records
    },
    // 获取默认树形数据
    async powerList() {
      const { data } = await api.powerList()
      const getChild = [data[0].id]
      this.$nextTick(() => {
        this.treeData = data
        // 去掉有children的id 避免收齐影响
        this.treeData[0].children.forEach(item => {
          if (item.children.length > 0) {
            this.getChild = getChild.push(item.id)
          }
        })
      })
    },
    submit() {
      this.roleDialogForm = false
      this.powerList()
    }

  }
}
</script>
<style lang="scss" scoped></style>
