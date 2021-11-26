import request from '@/utils/request'
// 用户
export default {
  login(data) {
    return request({
      url: '/user/login',
      method: 'post',
      params: data // params
    })
  }
}
