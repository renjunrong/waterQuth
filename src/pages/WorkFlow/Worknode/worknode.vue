<template>
  <div class="work-node">
    <Table
      :is-index="true"
      :is-oper="true"
      :table-data="tableData"
      :table-label="tableLabel"
    >
      <template v-slot:operOne="dataRow">
        <div>
          <el-button type="text" @click="handleEdit(dataRow)">编辑</el-button>
        </div>
      </template>
    </Table>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="节点名称" label-width="120px" prop="name">
          <el-input v-model="form.name" placeholder="请输入节点名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button class="operating" @click="eaitSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/worknode.js'
export default {
  data() {
    return {
      tableData: [],
      tableLabel: [
        { label: '节点类型', name: 'name', width: 200 },
        { label: '节点描述', name: 'descr' }
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        did: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入节点名称', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.seachList()
  },
  methods: {
    handleEdit(row) {
      this.dialogFormVisible = true
      this.form.name = row.text.name
      this.form.did = row.text.did
    },
    async seachList() {
      const { data } = await api.nodeList()
      this.tableData = data
    },
    eaitSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.editNode(this.form).then(res => {
            this.reminder(res.code, res.message)
            this.dialogFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    cancel() {
      this.dialogFormVisible = false
    },
    reminder(code, message) {
      if (code === 20000) {
        this.$message.success(message)
        this.seachList()
      } else {
        this.$message.error(message)
      }
    }
  }
}
</script>
<style lang="scss">
.work-node {
  .el-dialog {
    width: 35%;
  }
  .dialog-footer {
    text-align: center;
  }
  .operating {
    background: #157bd8;
    opacity: 1;
    border-radius: 1px;
    color: #fff;
  }
}
</style>
