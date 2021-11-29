<template>
  <div>
    <el-form-item label="提示语：">
      <el-input v-model="inputForm.options.placeholder" />
    </el-form-item>
    <el-form-item label="上传个数：">
      <el-radio-group v-model="inputForm.options.minLength">
        <el-radio label="1">单个</el-radio>
        <el-radio label="10">多个(小于等于10)</el-radio>
      </el-radio-group>

    </el-form-item>
    <el-form-item label="文件格式：">
      {{ inputForm.options.format }}
    </el-form-item>
    <el-form-item label="单个文件大小：">
      <el-input v-model="inputForm.options.fileSzie">
        <template slot="append">mb</template>
      </el-input>
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
