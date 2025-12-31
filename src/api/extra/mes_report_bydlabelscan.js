import request from '@/utils/request'

// 查询bydlabelscan列表
export function listBydlabelscan(query) {
  return request({
    url: '/extra/mes/report/bydlabelscan/list',
    method: 'get',
    params: query
  })
}

// 查询bydlabelscan详细
export function getBydlabelscan(materialCode) {
  return request({
    url: '/extra/mes/report/bydlabelscan/' + materialCode,
    method: 'get'
  })
}

// 新增bydlabelscan
export function addBydlabelscan(data) {
  return request({
    url: '/extra/mes/report/bydlabelscan',
    method: 'post',
    data: data
  })
}

// 修改bydlabelscan
export function updateBydlabelscan(data) {
  return request({
    url: '/extra/mes/report/bydlabelscan',
    method: 'put',
    data: data
  })
}

// 删除bydlabelscan
export function delBydlabelscan(materialCode) {
  return request({
    url: '/extra/mes/report/bydlabelscan/' + materialCode,
    method: 'delete'
  })
}
