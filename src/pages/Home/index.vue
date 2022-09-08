<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import TypeNav from '@/components/TypeNav/index.vue';
import ListContainer from './ListContainer/index.vue';
import TodayRecommend from './TodayRecommend/index.vue';
import Rank from './Rank/index.vue';
import Like from './Like/index.vue';
import Floor from './Floor/index.vue';
import Brand from './Brand/index.vue';

export default {
  name: 'Home',
  components: { TypeNav, ListContainer, TodayRecommend, Rank, Like, Floor, Brand },
  props: {},

  data() {
    return {

    }
  },
}

</script>

<style lang='less' scoped>

</style>
