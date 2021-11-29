<template>
  <div>
    <el-form-item label="提示语：">
      <el-input v-model="inputForm.options.placeholder" />
    </el-form-item>
    <el-form-item label="数据校验：">
      <el-checkbox v-if="inputForm.rules" v-model="inputForm.rules[1].required">支持两位小数</el-checkbox>
      <el-checkbox v-if="inputForm.rules" v-model="inputForm.rules[2].required">必须是整数</el-checkbox>
      <el-checkbox v-if="inputForm.rules" v-model="inputForm.rules[3].required">必须大于0</el-checkbox>
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
    return {}
  }
}
</script>
<style scoped></style>
