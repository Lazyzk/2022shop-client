// 包含应用的所有接口的接口请求函数

// 2. 首页三级分类
// /api/product/getBaseCategoryList
// 请求方式get

import ajax from './ajax'

export function reqCategoryList() {
  return ajax({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
}
export const reqBannerList = () => ajax('/cms/banner')