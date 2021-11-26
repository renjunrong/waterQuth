<template>
  <div>
    <button @click="login">登录</button>
  </div>
</template>

<script>
import api from '@/api/user.js'
export default {
  data() {
    return {}
  },
  methods: {
    async login() {
      // 获取登录权限
      const { data } = await api.login({ username: 'xiao', password: 123456 })
      // console.log(headers('A-Token'))
      if (data) {
        this.$router.push('/home')
      }
    }
  }

}
</script>
<style scoped></style>
