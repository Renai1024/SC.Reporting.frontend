import request from '@/utils/request'

// 查询PLM项目列表
export function listPlm_project(query) {
  return request({
    url: '/extra/plm/report/plm_project/list',
    method: 'get',
    params: query
  })
}

// 查询PLM项目详细
export function getPlm_project(id) {
  return request({
    url: '/extra/plm/report/plm_project/' + id,
    method: 'get'
  })
}

// 新增PLM项目
export function addPlm_project(data) {
  return request({
    url: '/extra/plm/report/plm_project/add',
    method: 'post',
    data: data
  })
}

// 修改PLM项目
export function updatePlm_project(data) {
  return request({
    url: '/extra/plm/report/plm_project',
    method: 'put',
    data: data
  })
}

// 删除PLM项目
export function delPlm_project(id) {
  return request({
    url: '/extra/plm/report/plm_project/' + id,
    method: 'delete'
  })
}
