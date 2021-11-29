<!--单行输入框-->
<template>
  <div>
    <el-form-item label="提示语：">
      <el-input v-if="inputForm.rules" v-model="inputForm.options.placeholder" />
    </el-form-item>
    <el-form-item label="字数上限：">
      <el-input v-model="inputForm.options.maxLength" />
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
