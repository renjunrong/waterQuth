import request from '@/utils/request'

export default {
  modelSave(data) {
    return request({
      url: '/model/save',
      method: 'post',
      data
    })
  }
}
