<!--单行输入框-->
<template>
  <div>
    <el-form-item label="提示语：">
      <el-input v-if="inputForm.rules" v-model="inputForm.options.placeholder" />
    </el-form-item>
    <el-form-item label="程序自动获取：">
      <el-checkbox v-model="inputForm.voluntarily">获取当前系统时间</el-checkbox>
    </el-form-item>
    <el-form-item label="格式：">
      <el-radio-group v-model="inputForm.format">
        <el-radio :label="'yyyy-MM-dd HH:mm:ss'">时分秒</el-radio>
        <el-radio :label="'yyyy-MM-dd HH:mm'">时分</el-radio>
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

  },
  methods: {

  }
}
</script>
<style scoped></style>
