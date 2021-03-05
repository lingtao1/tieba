
<template>
  <div class="list">
    <van-tabs class="tabs-warp" v-model="active" swipeable animated>
      <van-tab title="主页">
        <user-post :info="info" :id="id" />
      </van-tab>
      <van-tab title="帖子">
        <user-post :info="info" :id="id" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import userPost from './user-post'

export default {
  props: ['info', 'id'],
  components: {
    userPost,
  },
  data() {
    return {
      active: 1,
    }
  },
  methods: {},
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang='less' scoped>
.list {
  background: #f5f5f8;
  overflow: hidden;
  h1 {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 600;
  }
}

/deep/.tabs-warp {
  .van-tab {
    flex: 0 0 auto;
    padding: 20px;
  }
  .van-tab--active {
    font-weight: 700;
  }
  .van-tabs__line {
    width: 20px;
    bottom: 20px;
    background: #1989fa;
  }
}
</style>
