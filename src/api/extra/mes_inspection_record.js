import request from '@/utils/request'

// 查询检验数据列表
export function listMes_inspection_record(query) {
  return request({
    url: '/extra/mes/report/mes_inspection_record/list',
    method: 'get',
    params: query
  })
}

// 获取已绑箱码列表
export function listMes_inspection_record_withBoxCode(query) {
  return request({
    url: '/extra/mes/report/mes_inspection_record/listBoxCode',
    method: 'get',
    params: query
  })
}

// 查询检验数据详细
export function getMes_inspection_record(id) {
  return request({
    url: '/extra/mes/report/mes_inspection_record/' + id,
    method: 'get'
  })
}

// 新增工序一检验数据
export function addMes_inspection_record1(data) {
  return request({
    url: '/extra/mes/report/mes_inspection_record/add1',
    method: 'post',
    data: data
  })
}

// 新增工序二检验数据
export function addMes_inspection_record2(data) {
  return request({
    url: '/extra/mes/report/mes_inspection_record/add2',
    method: 'post',
    data: data
  })
}

// 新增工序三检验数据
export function addMes_inspection_record3(data) {
  return request({
    url: '/extra/mes/report/mes_inspection_record/add3',
    method: 'post',
    data: data
  })
}

// 新增箱码绑定
export function addMes_inspection_record4(data) {
  return request({
    url: '/extra/mes/report/mes_inspection_record/add4',
    method: 'post',
    data: data
  })
}

//新增客户箱码绑定
export function addMes_inspection_record5(data) {
  return request({
    url: '/extra/mes/report/mes_inspection_record/add5',
    method: 'post',
    data: data
  })
}

// 修改检验数据
export function updateMes_inspection_record(data) {
  return request({
    url: '/extra/mes/report/mes_inspection_record',
    method: 'put',
    data: data
  })
}

// 删除检验数据
export function delMes_inspection_record(id) {
  return request({
    url: '/extra/mes/report/mes_inspection_record/' + id,
    method: 'delete'
  })
}
