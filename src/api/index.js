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
// 6. 添加到购物车(对已有物品进行数量改动)
// /cart/addToCart/{ skuId }/{ skuNum }
// POST  (在请求头中需要加入UUID的标识;请求头的名称叫userTempId)

export const reqAddOrUpdateCart = (skuId, skuNum) => {
  return ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}

//获取购物车列表
// /cart/cartList
//get
export const reqShopCart = () => {
  return ajax({
    url: '/cart/cartList',
    method: 'get'
  })
}

// 切换商品选中状态
// 请求地址
// /api/cart/checkCart/{skuID}/{isChecked}
//  请求方式
// GET
export const reqUpdateCartChecked = (skuId, isChecked) => {
  return ajax({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}

// 删除购物车商品
// 请求地址
// /api/cart/deleteCart/{skuId}
// 请求方式
// DELETE
export const reqDeleteCart = (skuId) => {
  return ajax({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}

// 注册用户
//  请求地址
// /user/passport/register
// 请求方式
// POST
export const reqRegister = (userInfo) => {
  return ajax({
    url: '/user/passport/register',
    method: 'post',
    data: userInfo
  })
}
// 获取验证码
export const reqYzm = (phone) => {
  return ajax({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get',
  })
}
//  登录
// /user/passport/login
// 请求方式
// POST
export const reqUserLogin = (userInfo) => {
  return ajax({
    url: '/user/passport/login',
    method: 'post',
    data: userInfo
  })
}

//根据token获取用户信息
///api/user/passport/auth/getUserInfo
//get

export const reqUserInfo = () => {
  return ajax({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
  })
}
//退出登录
///api/user/passport/logout
//get

export const reqUserLogout = () => {
  return ajax({
    url: '/user/passport/logout',
    method: 'get'
  })
}
// 获取订单交易页信息
// 请求地址
// /order/auth/trade
// 请求方式
// GET
export const reqTradeInfo = () => {
  return ajax({
    url: '/order/auth/trade',
    method: 'get'
  })
}
//请求提交订单（真正的去创建订单）
///api/order/auth/submitOrder?tradeNo={tradeNo}
//POST
//body

export const reqSubmitOrder = (tradeNo,tradeData) => {
  return ajax({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data:tradeData
  })
}
//获取支付信息
///api/payment/weixin/createNative/{orderId}
//get
export const reqPayInfo = (orderId) => {
  return ajax({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
  })
}

//查询订单支付状态
///api/payment/weixin/queryPayStatus/{orderId}
//get
export const reqPayStatus = (orderId) => {
  return ajax({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })
}
//请求获取我的订单数据分页列表
///api/order/auth/{page}/{limit}
//get

export const reqMyOrderInfo = (page,limit) => {
  return ajax({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
  })
}
