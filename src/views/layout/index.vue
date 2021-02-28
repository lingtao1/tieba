
<template>
  <div class="layout-index">
    <keep-alive>
      <router-view />
    </keep-alive>

    <van-tabbar route v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="hotel-o" to="/channel">话题</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/information">消息</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">我 的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data() {
    return {
      active: 0,
    }
  },
  methods: {},
  created() {
    this.$store.commit('addCachePage', 'layoutIndex')
  },
  mounted() {},
}
</script>
<style lang='less' scoped>
// .box {
//   height: 50px;
// }
</style>
