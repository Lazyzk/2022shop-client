import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import store from './store'
import './plugins/swiper'
import './mock/mockServer'
import MyPagination from "./components/Pagination"
import * as API from '@/api'
Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
Vue.component(MyPagination.name, MyPagination)
new Vue({
  beforeCreate() {
    // 1) 创建或指定事件总线对象, 保存到Vue的原型上
    Vue.prototype.$bus = this
    Vue.prototype.$API = API //当不适用vuex的时候，可以把接口请求函数全部装在对象当中挂在Vue原型身上
  },
  render: h => h(App),
  store,
  router,//注册路由器==>所有组件都可以直接访问2个对象：$router(路由器对象)与$route（当前路由信息对象）
}).$mount('#app')
