<template>
  <el-submenu v-if="menu.isMain" :index="menu.index">
    <template slot="title">
      <i :class="menu.icon" />
      <span slot="title">{{ menu.name }}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.index" :menu="item" />
  </el-submenu>
  <el-menu-item v-else :index="menu.index" @click="handleRoute(menu)">
    <i :class="menu.icon" />
    <span slot="title">{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute(menu) {
      this.$router.push('/' + menu.url)
    }
  }
}
</script>

<style scoped lang="scss">
// .el-submenu, .el-menu-item {
//   background-color: #3c4b5a44;
// }
</style>
