<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ cumText }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>

export default {
  props: {
    cumText: String
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb{
    margin-top: 16px;
    // margin-left: 10px;
    display: inline-block;
}
</style>
