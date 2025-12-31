import request from '@/utils/request'

// 查询碳化硅自动锁螺丝数据列表
export function listTorque(query) {
  return request({
    url: '/extra/mes/report/torque/list',
    method: 'get',
    params: query
  })
}

// 查询碳化硅自动锁螺丝数据详细
export function getTorque(id) {
  return request({
    url: '/extra/mes/report/torque/' + id,
    method: 'get'
  })
}

// 新增碳化硅自动锁螺丝数据
export function addTorque(data) {
  return request({
    url: '/extra/mes/report/torque/add',
    method: 'post',
    data: data
  })
}

// 修改碳化硅自动锁螺丝数据
export function updateTorque(data) {
  return request({
    url: '/extra/mes/report/torque',
    method: 'put',
    data: data
  })
}

// 删除碳化硅自动锁螺丝数据
export function delTorque(id) {
  return request({
    url: '/extra/mes/report/torque/' + id,
    method: 'delete'
  })
}
