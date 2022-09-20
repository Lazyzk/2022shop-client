import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'
import store from '@/store'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err
    }
    // rethrow error
    return Promise.reject(err)
  })
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err
    }
    // rethrow error
    return Promise.reject(err)
  })
}

Vue.use(VueRouter)
// 向外暴露路由对象
const router = new VueRouter({
  mode: 'history',  //不带#
  // 应用中所有路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
   // 全局前置导航守卫
  // to 代表准备去的地方的路由对象
  // from 从哪个地方来的路由对象
  // next是一个函数
  // next()  代表无条件放行
  // next(false) 代表不放行，停在原地
  // next('/')  next({path:'/'})  代表最终让它去哪
  
  //token校验
  let token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断是否有用户信息，！！转换为布尔值
      let hasUserInfo = !!store.state.user.userInfo.nickName
      if (hasUserInfo) {
        next()
      } else {
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          alert('登录已过期')
          store.dispatch('resetUserInfo')
          next('/login?redirect:=' + to.path)
        }
      }
    }
  } else {
    if (to.path.indexOf('/trade') === 0 || to.path.startsWith('/pay') || to.path.startsWith('/center')) {
      next('/login?redirect='+to.path)
    } else {
      next()
    }
  }
})

export default router
