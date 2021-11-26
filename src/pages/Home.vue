<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-container>
        <el-main>
          <Cumbs :cum-text="cumText" />
          <div class="entirety">
            <keep-alive>
              <transition name="fade" mode="out-in">
                <router-view />
              </transition>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/basics/Header'
import Menu from '@/basics/Menu'
import Cumbs from '@/basics/Cumbs'
import api from '@/api/user.js'
export default {
  components: {
    Header,
    Menu,
    Cumbs
  },
  data() {
    return {
      cumText: '任务台'
    }
  },
  mounted() {
    // 获取登录权限
    api.login({ username: 'superadmin', password: 123456 })
  }
}
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
  width: 100%;
  .el-main {
    padding: 10px 16px 16px 16px;
  }
}
.el-header {
  height: 50px !important;
  padding: 0;
}
.el-aside {
  height: 100%;
  // background: linear-gradient(138deg, #1896FA 0%, #0074D0 100%);
  // opacity: 1;
  // border-radius: 0px;
}
.entirety{
  width: calc(100％ – 16px);
  height: calc(100％ – 12px);;
  margin-top:12px;
  padding:8px;
  background: #fff;
  border-radius: 5px;
}

</style>
