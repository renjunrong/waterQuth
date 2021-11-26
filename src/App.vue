<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import '@/assets/iconfont/iconfont.css'
export default {
  name: 'App'
}
</script>
<style lang="scss">
#app {
  font-family: Microsoft YaHei,Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
//   text-align: center;
  color: #2c3e50;
  background: #F4F6FA;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>
