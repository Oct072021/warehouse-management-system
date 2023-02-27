import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/inbound/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/inbound/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/inbound/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/inbound/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/inbound/update',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/vue-element-admin/inbound/remove',
    method: 'post',
    data
  })
}

export function inboundTotal(data) {
  return request({
    url: '/vue-element-admin/inbound/total',
    method: 'get',
    params: { type: data }
  })
}
