<template>
  <el-pagination
    :current-page="pagesize"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>

export default {
  props: {
    total: Number,
    pagesize: Number
  },
  data() {
    return {}
  },
  methods: {
    // 每页多少条
    handleSizeChange(val) {
      this.$emit('SizeChange', val)
    },
    // 当前多少页
    handleCurrentChange(val) {
      this.$emit('CurrentChange', val)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style scoped></style>
