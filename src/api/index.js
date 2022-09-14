// 包含应用的所有接口的接口请求函数

// 2. 首页三级分类
// /api/product/getBaseCategoryList
// 请求方式get

import ajax from './ajax'
import mockAjax from './mockAjax'
export function reqCategoryList() {
  return ajax({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
}
export const reqBannerList = () => mockAjax('/banners')

/* 
mock接口函数
*/
export const reqRecommends = () => mockAjax('/recommends')
export const reqFloors = () => mockAjax('/floors')

/* 
搜索分页列表
/api/list  POST

*/
export const reqSearch = (searchParams) => ajax.post('/list', searchParams)

// 4. 获取商品详情
// /item/{ skuId }
// GET
export const reqDetailInfo = (skuId) => {
  return ajax({
    url: `/item/${skuId}`,
    method: 'get'
  })
}
