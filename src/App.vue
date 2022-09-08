<template>
  <div id="app">
    <Header></Header>
    <!-- 所有一级路由都在此显示 -->
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
// import { reqCategoryList } from './api';
export default {
  name: "App",
  mounted() {
    this.$store.dispatch('getCategoryList')
  },
  components: { Header, Footer }
}
</script>

<style lang='less' scoped>

</style>
