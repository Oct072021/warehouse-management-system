import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/outbound/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/outbound/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/outbound/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/outbound/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/outbound/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/vue-element-admin/outbound/remove',
    method: 'post',
    data: { id: data }
  })
}

export function outboundTotal(data) {
  return request({
    url: '/vue-element-admin/outbound/total',
    method: 'get',
    params: { type: data }
  })
}
