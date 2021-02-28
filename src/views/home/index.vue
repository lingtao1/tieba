
<template>
  <div class="index">
    <search-bar></search-bar>
    <van-tabs class="channel" swipeable v-model="active">
      <van-tab title="关注">
        <recommend></recommend>
      </van-tab>
      <van-tab title="推荐">
        <recommend></recommend>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import recommend from './components/recommend'
import follow from './components/follow'
import searchBar from '@/components/search-bar'
export default {
  name: 'HomeIndex',
  components: {
    searchBar,
    recommend,
    follow,
  },
  data() {
    return {
      list: ['关注', '推荐'],
      active: 1,
    }
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.channel {
  position: fixed;
  top: 36px;
  width: 100%;
  bottom: 50px;
  overflow-y: auto;
  /deep/ .van-tab {
    margin: 10px 0;
    display: unset;
    width: 80px;
    height: 40px;
    text-align: center;
  }
  /deep/ .van-tabs__line {
    bottom: 20px;
    width: 30px;
    background: #1989fa;
  }
}
</style>
