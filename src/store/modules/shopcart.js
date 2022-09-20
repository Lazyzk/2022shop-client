import { reqAddOrUpdateCart, reqShopCart, reqUpdateCartChecked, reqDeleteCart } from "@/api"
const state = {
  shopCartList: []
}
const mutations = {
  REQSHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList
  }
}
const actions = {
  async addOrUpdateCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateCart(skuId, skuNum)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async getCartList({ commit }, shopCartList) {
    const result = await reqShopCart(shopCartList)
    if (result.code === 200) {
      try {
        commit('REQSHOPCARTLIST', result.data[0].cartInfoList)
      } catch (error) {
        commit('REQSHOPCARTLIST', [])
      } 

    }
  },
  async updateCartChecked({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCartChecked(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async updateCartCheckedAll({ commit, dispatch, getters }, isChecked) {
    let promises = []
    state.shopCartList.forEach(item => {
      if (item.isChecked === isChecked) return
      let promise = dispatch('updateCartChecked', { skuId: item.skuId, isChecked })
      promises.push(promise)
    })
    return Promise.all(promises)
  },
  async getDeleteCart({ commit }, skuId) {
    const result = await reqDeleteCart(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async getDeleteCartAll({ commit, dispatch, getters }) {
    const promises = []
    state.shopCartList.forEach(item => {
      if (item.isChecked === 0) return
      let promise = dispatch('getDeleteCart', item.skuId)
      promises.push(promise)
    })
    return Promise.all(promises)
  }

}
const getters = {
  // cartInfoList(state) {
  //   const cartInfoList = state.shopCartList[0].cartInfoList
  //   return cartInfoList || []
  // }
}
export default {
  state,
  mutations,
  actions,
  getters
}