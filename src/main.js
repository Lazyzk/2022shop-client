import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import store from './store'
import './plugins/swiper'
import './mock/mockServer'
import MyPagination from "./components/Pagination"
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'
import './plugins/element' //加载element-ui相关的配置
import './plugins/validate'
Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
Vue.component(MyPagination.name, MyPagination)

import loading from '@/assets/images/loading.gif'
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
  loading,  // 指定未加载得到图片之前的loading图片
})
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
