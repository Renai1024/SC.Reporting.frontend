import request from '@/utils/request'

// 查询气密性测试记录列表
export function listMesQimixingRecord(query) {
  return request({
    url: '/extra/mes/report/mes_qimixing_record/list',
    method: 'get',
    params: query
  })
}

// 查询气密性测试记录详细
export function getMesQimixingRecord(id) {
  return request({
    url: '/extra/mes/report/mes_qimixing_record/' + id,
    method: 'get'
  })
}

// 新增气密性测试记录
export function addMesQimixingRecord(data) {
  return request({
    url: '/extra/mes/report/mes_qimixing_record',
    method: 'post',
    data: data
  })
}

// 修改气密性测试记录
export function updateMesQimixingRecord(data) {
  return request({
    url: '/extra/mes/report/mes_qimixing_record',
    method: 'put',
    data: data
  })
}

// 删除气密性测试记录
export function delMesQimixingRecord(id) {
  return request({
    url: '/extra/mes/report/mes_qimixing_record/' + id,
    method: 'delete'
  })
}
