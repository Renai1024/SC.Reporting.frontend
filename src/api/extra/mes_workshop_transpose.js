import request from '@/utils/request'

// 查询车间转序列表
export function listMes_workshop_transpose(query) {
  return request({
    url: '/extra/mes/report/mes_workshop_transpose/list',
    method: 'get',
    params: query
  })
}

// 查询车间转序详细
export function getMes_workshop_transpose(id) {
  return request({
    url: '/extra/mes/report/mes_workshop_transpose/' + id,
    method: 'get'
  })
}

// 新增车间转序
export function addMes_workshop_transpose(data) {
  return request({
    url: '/extra/mes/report/mes_workshop_transpose/add',
    method: 'post',
    data: data
  })
}

// 收料确认
export function updateMes_workshop_transpose(data) {
  return request({
    url: '/extra/mes/report/mes_workshop_transpose/confirm',
    method: 'put',
    data: data
  })
}

// 修改转序数量
export function changeQuantity (data) {
  return request({
    url: '/extra/mes/report/mes_workshop_transpose/change/quantity',
    method: 'put',
    data: data
  })
}

// 删除车间转序
export function delMes_workshop_transpose(id) {
  return request({
    url: '/extra/mes/report/mes_workshop_transpose/' + id,
    method: 'delete'
  })
}

// 获取车间列表（兼容旧接口）
export function get_workshop(query){
  return request({
    url: '/extra/erp/info/workshop/list',
    method: 'get',
    params: query
  })
}

// 获取员工列表（兼容旧接口）
export function get_worker(query){
  return request({
    url: '/extra/erp/info/worker/list',
    method: 'get',
    params: query
  })
}

// 通用搜索车间（编码或名称）
export function search_workshop(params) {
  return request({
    url: '/extra/erp/info/workshop/search',
    method: 'get',
    params: params
  })
}

// 通用搜索员工（编码或名称）
export function search_worker(params) {
  return request({
    url: '/extra/erp/info/worker/search',
    method: 'get',
    params: params
  })
}

export function search_material(params) {
  return request({
    url: '/extra/erp/info/material/search',
    method: 'get',
    params: params
  })
}