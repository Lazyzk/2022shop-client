<template>
  <div>
    <TypeNav></TypeNav>
    Search
    <h2>{{$route.params.keyword}}</h2>
    <h3>{{$route.query.keyword2}}</h3>
    <h3>{{keyword3}}</h3>
    <h3>{{keyword4}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['keyword3', 'keyword4'],
  data() {
    return {

    }
  },
}

</script>

<style lang='less' scoped>

</style>
