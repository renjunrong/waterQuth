<template>
  <div class="menuSty">
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      text-color="#fff"
      active-text-color="#157BD8"
      @select="handSelect"
    >
      <menu-tree v-for="item in menuList" :key="item.index" :menu="item" />
    </el-menu>
  </div>
</template>

<script>
import menuTree from './menuTree.vue'
export default {
  components: {
    menuTree
  },
  data() {
    return {
      menuList: [
        { icon: 'el-icon-document', isMain: false, name: '任务台', url: 'work', index: '1' },
        { icon: 'el-icon-document', isMain: false, name: '流程中心', url: 'processcenter', index: '2' },
        {
          icon: 'el-icon-document',
          isMain: true,
          name: '工作流管理',
          url: '',
          index: '3',
          children: [
            { icon: '', isMain: false, name: '流程模板', url: 'template', index: '3-1' },
            { icon: '', isMain: false, name: '流程节点', url: 'worknode', index: '3-2' },
            { icon: '', isMain: false, name: '流程表单', url: 'workform', index: '3-3' }
          ]
        },
        { icon: 'el-icon-document', isMain: false, name: '用户管理', url: 'usermanage', index: '4' },
        { icon: 'el-icon-document', isMain: false, name: '角色权限', url: 'rolepower', index: '5' }
      ]
    }
  },
  methods: {
    handSelect(a, b) {
      console.log('handleselect', a, b)
    },
    handleRoute(index) {
      this.$router.push('/Work')
    }
  }
}
</script>
<style lang="scss" scoped>
.menuSty{
    width: 100%;
    height: 100%;
    text-align: center;
    .el-menu-vertical{
        height: 100%;
        background: linear-gradient(138deg, #1896FA 0%, #0074D0 100%);

    }

}
</style>
<style>
  .el-menu{
   background-color:transparent !important;
  }
</style>
