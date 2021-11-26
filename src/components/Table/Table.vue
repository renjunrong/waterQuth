<template>
  <div class="comm-table">
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column v-if="isSelect" type="selection" width="55" />
      <el-table-column v-if="isIndex" type="index" width="50" label="序号" />
      <el-table-column
        v-for="(item, index) in tableLabel"
        :key="index"
        :prop="item.name"
        :label="item.label"
        :width="item.width"
      />
      <el-table-column v-if="isState" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.Status"
            active-color="#157BD8"
            inactive-color="#DCDFE6"
            @change="stateChange(scope.row,scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column v-if="isOper" label="操作" width="200">
        <template slot-scope="scope">
          <slot name="operOne" :text="scope.row" />
          <slot name="operTwo" :text="scope.row" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    // 是否有多选框
    isSelect: {
      type: Boolean,
      default: false
    },
    // 是否有序号
    isIndex: {
      type: Boolean,
      default: true
    },
    // 是否有操作栏
    isOper: {
      type: Boolean,
      default: false
    },
    // 是否有状态
    isState: {
      type: Boolean,
      default: false
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    tableLabel: {
      type: Array,
      default: () => []
    }
    // tableData: Array,
    // 表头
  },
  data() {
    return {
    }
  },
  methods: {
    stateChange(row) {
      this.$emit('statusChange', row)
    },
    handleSelectionChange(val) {
      this.$emit('selectChange', val)
    }
  }

}
</script>
<style scoped></style>
