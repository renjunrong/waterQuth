import request from '@/utils/request'
// 流程表单
export default {
  FormList(data) {
    return request({
      url: 'processForm/list',
      method: 'get',
      params: data // params
    })
  },
  AddForm(data) {
    return request({
      url: '/processForm',
      method: 'post',
      data
    })
  },
  status(data) {
    return request({
      url: '/processForm/changeStatus',
      method: 'post',
      params: data
    })
  },
  delete(id) {
    return request({
      url: `processForm/delete?id=${id}`,
      method: 'post'
    })
  },
  details(id) {
    return request({
      url: `processForm/${id}`,
      method: 'post'
    })
  },
  templateType() {
    return request({
      url: 'processForm/templateType',
      method: 'get'
    })
  }

}
