import request from '@/utils/request'

// 查询焊接结果记录列表
export function listWeld(query) {
  return request({
    url: '/extra/mes/report/weld_record/list',
    method: 'get',
    params: query
  })
}

// 查询焊接结果记录详细
export function getWeld(id) {
  return request({
    url: '/extra/mes/report/weld_record/' + id,
    method: 'get'
  })
}

// 新增焊接结果记录
export function addWeld(data) {
  return request({
    url: '/extra/mes/report/weld_record/add',
    method: 'post',
    data: data
  })
}

// 新增焊接结果记录
export function addWeldBatch(data) {
  return request({
    url: '/extra/mes/report/weld_record/addBatch',
    method: 'post',
    data: data
  })
}

// 修改焊接结果记录
export function updateWeld(data) {
  return request({
    url: '/extra/mes/report/weld_record',
    method: 'put',
    data: data
  })
}

// 删除焊接结果记录
export function delWeld(id) {
  return request({
    url: '/extra/mes/report/weld_record/' + id,
    method: 'delete'
  })
}
