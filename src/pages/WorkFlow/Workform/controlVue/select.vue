<template>
  <div class="checkboxVue">
    <el-form-item label="选项：">
      <div v-for="(item, index) in formOptions" :key="index">
        <el-input v-model="item.label" style="width:auto;" />
        <i class="el-icon-delete" @click="labelDelete(index)" />
        <i
          v-if="index === formOptions.length - 1"
          class="el-icon-circle-plus-outline"
          @click="labelAdd"
        />
      </div>
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
      formOptions: this.inputForm.options.options
    }
  },
  methods: {
    labelDelete(index) {
      this.inputForm.options.options.splice(index, 1)
    },
    labelAdd() {
      this.inputForm.options.options.push({ value: '', label: '' })
    }
  }
}
</script>
<style lang="scss" scoped>
.checkboxVue {
  .el-input {
    width: auto;
  }
  .el-input__inner {
    width: 100px;
  }
}
</style>
