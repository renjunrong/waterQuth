import request from '@/utils/request'
// 用户
export default {
  roleList(data) {
    return request({
      url: '/system/role/pageList',
      method: 'get',
      params: data // params
    })
  },
  detailsRole(id) {
    return request({
      url: `/system/role/beforeEdit/${id}`,
      method: 'get'
    })
  },
  powerList() {
    return request({
      url: '/permission/list',
      method: 'get'
    })
  },
  editRole(data) {
    return request({
      url: '/system/role/edit',
      method: 'post',
      data
    })
  },
  addRole(data) {
    return request({
      url: '/system/role/add',
      method: 'post',
      data
    })
  },
  deleteRole(id) {
    return request({
      url: `system/delete/${id}`,
      method: 'post'
    })
  }

}
