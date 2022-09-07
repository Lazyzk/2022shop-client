import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'

Vue.use(VueRouter)
// 向外暴露路由对象
export default new VueRouter({
  mode: 'history',  //不带#
  // 应用中所有路由
  routes
})