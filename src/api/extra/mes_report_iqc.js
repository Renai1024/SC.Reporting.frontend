import request from '@/utils/request'

// 查询MES生产数据列表
export function listMes(query) {
  return request({
    url: '/extra/mes/report/iqc/list',
    method: 'get',
    params: query
  })
}

// 查询MES生产数据详细
export function getMes(id) {
  return request({
    url: '/extra/mes/report/iqc/' + id,
    method: 'get'
  })
}

// 新增MES生产数据
export function addMes(data) {
  return request({
    url: '/extra/mes/report/iqc/add',
    method: 'post',
    data: data
  })
}

export function addMesBatch(data){
  return request({
    url: '/extra/mes/report/iqc/addBatch',
    method: 'post',
    data: data
  })
}

// 修改MES生产数据
export function updateMes(data) {
  return request({
    url: '/extra/mes/report/iqc',
    method: 'put',
    data: data
  })
}

// 删除MES生产数据
export function delMes(id) {
  return request({
    url: '/extra/mes/report/iqc/' + id,
    method: 'delete'
  })
}
