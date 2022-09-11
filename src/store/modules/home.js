import { reqCategoryList } from "@/api"
import { reqBannerList } from "@/api"
const state = {
  categoryList: [],
  bannerList: []
}
const mutations = {
  RECEIVE_CATEGORY_LIST(state, categoryList) {
    state.categoryList = categoryList.splice(0, 15)
  },
  RECEIVE_BANNER_LIST(state, bannerList) {
    state.bannerList = bannerList
  }
}
const actions = {
  async getCategoryList({ commit }) {
    const result = await reqCategoryList()
    if (result.code === 200) {
      const categoryList = result.data
      commit('RECEIVE_CATEGORY_LIST', categoryList)
    }
  },
  async getBannerList({ commit }) {
    const result = await reqBannerList()
    if (result.code === 200) {
      const bannerList = result.data
      commit('RECEIVE_BANNER_LIST', bannerList)
    }
  }
}
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters,
}