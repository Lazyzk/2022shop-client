/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
import axios from "axios";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
const service = axios.create({
  baseURL: '/api',
  timeout: 20000,
})
//添加请求拦截器
service.interceptors.request.use((config) => {

  //显示请求进度条
  NProgress.start()
  return config
})
service.interceptors.response.use(
  response => {
    //隐藏进度条
    NProgress.done()
    return response.data
  },
  error => {
    //隐藏进度条
    NProgress.done()
    alert(error.message || '未知的请求错误')
    throw error
  }
)
export default service