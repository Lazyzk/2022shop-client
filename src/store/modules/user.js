import {
  getUserTempId,
  setToken,
  getToken,
  removeToken,
} from '@/utils/userabout'
import { reqRegister, reqYzm, reqUserLogin, reqUserInfo, reqUserLogout } from '@/api'
const state = {
  userTempId: getUserTempId(),
  yzm: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  'USER_YZM'(state, yzm) {
    state.yzm = yzm
  },
  RECEIVE_TOKEN(state, token) {
    state.token = token
  },
  RECEIVE_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  RESET_USERINFO(state) {
    //这个里面包含用户信息和token
    state.userInfo = {}
    state.token = ''
  }
}
const actions = {
  async userRegister({ commit }, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async getYzm({ commit }, phone) {
    const result = await reqYzm(phone)
    if (result.code === 200) {
      commit('USER_YZM', result.data)
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async userLogin({ commit }, userInfo) {
    const result = await reqUserLogin(userInfo)
    if (result.code === 200) {
      commit('RECEIVE_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('RECEIVE_USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async resetUserInfo({ commit }) {
    removeToken()//先调用函数清空localStorage当中的token信息
    commit('RESET_USERINFO')
  },
  async userLogout({ commit }) {
    const result = await reqUserLogout()
    if (result.code === 200) {
      removeToken() //先调用函数清空localStorage当中的token信息
      commit('RESET_USERINFO')
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }

}
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}