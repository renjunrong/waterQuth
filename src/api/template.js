import request from '@/utils/request'
// 流程设计
export default {
  templateList(data) {
    return request({
      url: '/processTemplate/list',
      method: 'get',
      params: data // params
    })
  },
  firstTemplate(data) {
    return request({
      url: '/processTemplate',
      method: 'post',
      data
    })
  },
  templateType() {
    return request({
      url: '/processForm/templateType',
      method: 'get'
    })
  },
  templateTypeVal(val) {
    return request({
      url: `/processForm/${val}`,
      method: 'get'
    })
  },
  deleteTemplate(id) {
    return request({
      url: '/processTemplate/delete?id=' + id,
      method: 'post'

    })
  },
  queryTemplate(id) {
    return request({
      url: `/processTemplate/${id}`,
      method: 'post'
    })
  },
  editTemplate(data) {
    return request({
      url: 'processTemplate/update',
      method: 'post',
      data
    })
  },
  changeStatus(data) {
    return request({
      url: 'processTemplate/changeStatus',
      method: 'post',
      params: data
    })
  }

}
