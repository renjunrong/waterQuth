<template>
  <div class="radioVue">
    <el-form-item label="选项：">
      <div v-for="(item, index) in inputForm.options.options" :key="index">
        <el-input v-model="item.label" style="width:auto;" />
        <i class="el-icon-delete" @click="labelDelete(index)" />
        <i
          v-if="index === inputForm.options.options.length - 1"
          class="el-icon-circle-plus-outline"
          @click="labelAdd"
        />
      </div>
    </el-form-item>
    <el-form-item label="排列方式：">
      <el-select v-model="inputForm.options.arrange">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
      options: [
        {
          value: '1',
          label: '横向排列'
        },
        {
          value: '2',
          label: '竖向排列'
        }
      ]
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
.radioVue {
  .el-input {
    width: auto;
  }
  .el-input__inner {
    width: 100px;
  }
}
</style>
