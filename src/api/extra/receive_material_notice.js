import request from '@/utils/request'

// 查询收料通知单列表
export function listReceive_material_notice(query) {
  return request({
    url: '/extra/erp/report/receive_material_notice/list',
    method: 'get',
    params: query
  })
}

// 查询收料通知单详细
export function getReceive_material_notice(fentryId) {
  return request({
    url: '/extra/erp/report/receive_material_notice/' + fentryId,
    method: 'get'
  })
}

// 新增收料通知单
export function addReceive_material_notice(data) {
  return request({
    url: '/extra/erp/report/receive_material_notice',
    method: 'post',
    data: data
  })
}

// 修改收料通知单
export function updateReceive_material_notice(data) {
  return request({
    url: '/extra/erp/report/receive_material_notice',
    method: 'put',
    data: data
  })
}

// 删除收料通知单
export function delReceive_material_notice(fentryId) {
  return request({
    url: '/extra/erp/report/receive_material_notice/' + fentryId,
    method: 'delete'
  })
}
