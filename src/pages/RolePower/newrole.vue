<template>
  <div class="new-role">
    <el-form ref="roleForm" :model="roleForm" label-width="120px">
      <el-form-item label="角色名称">
        <el-input
          v-model="roleForm.roleName"
          placeholder="请输入不多于10个字的名称"
        />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input
          v-model="roleForm.description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入角色描述"
        />
      </el-form-item>

      <el-form-item label="菜单列表">
        <el-tree
          v-if="treeIF"
          ref="tree"
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :props="defaultProps"
          @check-change="handleCheckChange"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span class="radio-right">
              <el-checkbox v-model="data.check" :nodeid="data.lookList[0].id" @change="()=>menuChange(node,data,1)">仅查看</el-checkbox>
              <el-checkbox v-model="data.compile" :nodeid="data.editList[0].id" @change="()=>menuChange(node,data,2)">可编辑</el-checkbox>
            </span>
          </span>
        </el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cencel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api/usermanage'
export default {
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    keysId: {
      type: Array,
      default: () => []
    },
    rowId: Number,
    roleForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: JSON.parse(JSON.stringify(this.treeData)),
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeIF: true

    }
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
      data.children.compile = checked
      data.children.check = checked
    },
    // 修改状态的时候
    menuChange(node, data, type) {
      console.log(node)
      console.log(data)
      console.log(type)
      console.log(this.$refs.tree.getCheckedKeys())
      const linshieys = this.$refs.tree.getCheckedKeys()
      console.log(data.check)
      if (type === 1) {
        if (data.check) {
          data.check = true
          data.lookList.forEach(item => { this.keysId.push(item.id) })
        } else {
          data.check = false
          data.compile = false
          data.lookList.forEach(item => { this.keysId.splice(this.keysId.findIndex(obj => obj.id === item.id), 1) })
        }
      } else if (type === 2) {
        if (data.compile) {
          data.operationList.forEach(item => { this.keysId.push(item.id) })
          data.check = true
          this.$refs.tree.setCheckedKeys([...linshieys, ...[data.id]], true)
        } else {
          data.operationList.forEach(item => { this.keysId.splice(this.keysId.findIndex(obj => obj.id === item.id), 1) })
        }
      }
      console.log(this.keysId)
    },
    setCheckedKeys(keys, keysId) {
      console.log(keys, keysId)
      this.$refs.tree.setCheckedKeys(keys)
      keys.forEach(item => {
        if (item = this.treeData[0].id) {
          this.treeData[0].check = true
          this.treeData[0].compile = true
        }
        this.treeData[0].children.forEach(obj => {
          if (obj.id === item) {
            obj.check = true
            obj.compile = true
          }
          obj.children.forEach(subset => {
            if (subset.id === item) {
              subset.check = true
              subset.compile = true
            }
          })
        })
        // 查询要修改的集合
        // const node = this.$refs.tree.getNode(item)
      })
      this.data = JSON.parse(JSON.stringify(this.treeData))
    },
    reminder(code, message) {
      if (code === 20000) {
        this.$message.success(message)
      } else {
        this.$message.error(message)
      }
    },
    // 保存
    onSubmit() {
      const keyIds = this.$refs.tree.getCheckedKeys()
      if (this.rowId === 0) {
        api.addRole({
          permissionIds: this.unique([...keyIds, ...this.keysId]),
          description: this.roleForm.description,
          roleName: this.roleForm.roleName
        }).then(res => {
          this.reminder(res.code, res.data.message)
          this.$emit('submit', '')
        })
        return false
      }
      api.editRole({
        permissionIds: this.unique([...keyIds, ...this.keysId]),
        roleId: this.rowId,
        description: this.roleForm.description,
        roleName: this.roleForm.roleName
      }).then(res => {
        console.log(res)
        this.reminder(res.code, res.data.message)
        this.$emit('submit', '')
      })
    },
    cencel() {
      this.$emit('submit', '')
    },
    unique(arr) {
      return Array.from(new Set(arr))
    }
  }
}
</script>
<style lang="scss">
.new-role {
  .el-tree {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    opacity: 1;
  }
  .el-tree-node__content {
    border-bottom: 2px solid #f2f6fc;
  }
  .custom-tree-node {
    width: 70%;
    .radio-right {
      float: right;
    }
  }
}
</style>
