import request from '@/utils/request'
// 流程节点
export default {
  nodeList() {
    return request({
      url: '/process/node/list',
      method: 'get'
    })
  },
  editNode(data) {
    return request({
      url: '/process/node/edit',
      method: 'post',
      data
    })
  }
}
