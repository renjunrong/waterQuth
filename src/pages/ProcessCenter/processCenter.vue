<template>
  <div class="process-center">
    <single
      v-for="(item, index) in processdata"
      :key="index"
      :single-list="item"
    />
  </div>
</template>

<script>
import single from './single.vue'
export default {
  components: {
    single
  },
  data() {
    return {
      processdata: [
        {
          title: '预算管理',
          children: [
            { type: 1, title: '预算编制审批' },
            { type: 1, title: '预算追加编制审批' },
            { type: 1, title: '预算执行审批' },
            { type: 1, title: '预算执行考核审批' }
          ]
        },
        {
          title: '合同管理',
          children: [
            { type: 1, title: '局机关合同签订审批流程' },
            { type: 1, title: '局机关合同变更流程' },
            { type: 1, title: '独立核算二级单位合同签订审批流程' },
            { type: 1, title: '独立核算二级单位合同变更流程' },
            { type: 1, title: '独立核算二级单位合同变更流程' },
            { type: 1, title: '独立核算二级单位合同变更流程' }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
