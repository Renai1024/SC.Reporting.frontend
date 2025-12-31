import request from '@/utils/request'

// 查询bydlabelprint列表
export function listBydlabelprint(query) {
  return request({
    url: '/extra/mes/report/bydlabelprint/list',
    method: 'get',
    params: query
  })
}

// 查询bydlabelprint详细
export function getBydlabelprint(MaterialCode) {
  return request({
    url: '/extra/mes/report/bydlabelprint/' + MaterialCode,
    method: 'get'
  })
}

// 新增bydlabelprint
export function addBydlabelprint(data) {
  return request({
    url: '/extra/mes/report/bydlabelprint',
    method: 'post',
    data: data
  })
}

// 修改bydlabelprint
export function updateBydlabelprint(data) {
  return request({
    url: '/extra/mes/report/bydlabelprint',
    method: 'put',
    data: data
  })
}

// 删除bydlabelprint
export function delBydlabelprint(MaterialCode) {
  return request({
    url: '/extra/mes/report/bydlabelprint/' + MaterialCode,
    method: 'delete'
  })
}
