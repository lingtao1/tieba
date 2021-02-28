
<template>
  <div>
    <div class="search-bar">
      <van-button
        class="search-btn"
        icon="search"
        round
        type="info"
        @click="$router.push('/search')"
        >搜吧 、搜贴 、搜人</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-bar',
  data() {
    return {
      show: false,
    }
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.search-bar {
  height: 36px;
  width: 375px;
  background-color: #1989fa;
  position: relative;
  .search-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    height: 29px;
    width: 92%;
    background: #fff;
    color: #a4acb6;
    /deep/ .van-button__content {
      justify-content: unset;
    }
  }
}
</style>
