<template>
  <div class="plate-form">
    <h3>流程自定义设计</h3>
    <el-form ref="ruleForm" :rules="rules" :model="templateform" label-width="120px">
      <el-form-item label="流程名称：" prop="templateName">
        <el-input v-model="templateform.templateName" placeholder="请输入流程名称" />
      </el-form-item>
      <el-form-item label="模板类别：" prop="templateType">
        <el-select v-model="templateform.templateType" placeholder="请选择模板类别" @change="typeChange">
          <el-option v-for="(item,index) in temTypes" :key="index" :label="item.name" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="关联表单：" prop="processFormId">
        <el-select v-model="templateform.processFormId" placeholder="请选择关联表单">
          <el-option v-for="(item,index) in temForms" :key="index" :label="item.formName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="可见范围：">
        <el-select v-model="templateform.visible" multiple placeholder="请选择">
          <el-option
            label=""
            value="templateform.visible"
            class="multipleClass"
          >
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;" />
            <el-checkbox-group v-model="templateform.visible" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流程描述：" prop="templateDesc">
        <el-input
          v-model="templateform.templateDesc"
          type="textarea"
          :rows="4"
          placeholder="请输入流程描述"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api/template.js'
const cityOptions = ['办公室', '局领导', '局长办公会', '党委会', '节水科', '排水所']
export default {
  data() {
    return {
      // 模板类型
      temTypes: [],
      // 关联表单
      temForms: [],
      // 模板表单
      templateform: {
        templateName: '',
        templateType: '',
        processFormId: '',
        templateDesc: '',
        visibleRange: '',
        visible: []
      },
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      IFedit: 0,
      rules: {
        templateName: [
          { required: true, message: '请输入流程名称', trigger: 'change' },
          { min: 1, max: 25, message: '请输入不多于25字流程名称', trigger: 'change' }
        ],
        templateType: [
          { required: true, message: '请选择模板类别', trigger: 'change' }
        ],
        processFormId: [
          { required: true, message: '请选择模板表单', trigger: 'change' }
        ],
        templateDesc: [
          { min: 0, max: 500, message: '不多于500字', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.IFedit = 1
      this.details(this.$route.query.id)
    }
    this.templateType()
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    // 下一步
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.IFedit === 0) {
            api.firstTemplate(this.templateform).then(res => {
              if (res.code === 20000) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            api.editTemplate(this.templateform).then(res => {
              if (res.code === 20000) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            })
          }
        } else {
          this.$message({
            message: '请完善必填项',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 获取类型
    async templateType() {
      const { data } = await api.templateType()
      this.temTypes = data
    },
    async typeChange(val) {
      this.templateform.processFormId = ''
      const { data } = await api.templateTypeVal(val)
      this.temForms = data
    },
    // 获取详情
    async details(id) {
      const { data } = await api.queryTemplate(id)
      console.log(data)
      this.typeChange(data.templateType)
      this.templateform = data
    }
  }
}
</script>
<style lang="scss" scoped>
.plate-form {
  width: 100%;
  .el-form {
    width: 40%;
    .el-select{
      width: 100%;
    }
  }
}
</style>
<style>
.el-select-dropdown__list .multipleClass{
  height: auto;
}
</style>
