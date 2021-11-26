import request from '@/utils/request'
// 用户
export default {
  structure() {
    return request({
      url: '/sysUser/dept/list',
      method: 'get'
    })
  }
}
