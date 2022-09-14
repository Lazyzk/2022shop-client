<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  mounted() {
    this.$store.dispatch('getRecommends')
    this.$store.dispatch('getFloors')
  },
  computed: {
    ...mapState({
      floors: state => state.home.floors
    })
  },
}

</script>

<style lang='less' scoped>

</style>
