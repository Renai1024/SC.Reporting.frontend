import request from '@/utils/request'

// 查询端子压接机数据列表
export function listMes_report_duanziyajieji(query) {
  return request({
    url: '/extra/mes/report/mes_report_duanziyajieji/list',
    method: 'get',
    params: query
  })
}

// 查询端子压接机数据详细
export function getMes_report_duanziyajieji(id) {
  return request({
    url: '/extra/mes/report/mes_report_duanziyajieji/' + id,
    method: 'get'
  })
}

// 新增端子压接机数据
export function addMes_report_duanziyajieji(data) {
  return request({
    url: '/extra/mes/report/mes_report_duanziyajieji',
    method: 'post',
    data: data
  })
}

// 修改端子压接机数据
export function updateMes_report_duanziyajieji(data) {
  return request({
    url: '/extra/mes/report/mes_report_duanziyajieji',
    method: 'put',
    data: data
  })
}

// 删除端子压接机数据
export function delMes_report_duanziyajieji(id) {
  return request({
    url: '/extra/mes/report/mes_report_duanziyajieji/' + id,
    method: 'delete'
  })
}
