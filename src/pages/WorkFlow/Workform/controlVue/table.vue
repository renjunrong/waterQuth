<template>
  <div>
    <el-form-item label="提示语：">
      <el-input v-if="inputForm.rules" v-model="inputForm.options.placeholder" />
    </el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style scoped></style>
