<!--单行输入框-->
<template>
  <div>
    <el-form-item label="提示语：">
      <el-input v-if="inputForm.rules" v-model="inputForm.options.placeholder" />
    </el-form-item>
    <el-form-item label="字数上限：">
      <el-input v-model="inputForm.options.maxLength" />
    </el-form-item>
    <el-form-item label="是否判重：">
      <el-radio-group v-model="inputForm.repetition">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="程序自动获取：">
      <el-radio-group v-model="inputForm.voluntarily">
        <el-radio :label="3">是</el-radio>
        <el-radio :label="6">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    inputForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {}
    }
  },
  mounted() {

  }
}
</script>
<style scoped></style>
