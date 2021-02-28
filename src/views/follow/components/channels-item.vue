
<template>
  <van-swipe-cell class="swipe-warp">
    <van-cell class="channel-item" @click="onClick" :border="false">
      <template #icon>
        <van-image fit="cover" :src="data.image" />
      </template>
      <template #title>
        <h1>{{ data.name }}</h1>
      </template>
      <span v-show="isEditShow" class="mover iconfont">&#xe603;</span>
    </van-cell>
  </van-swipe-cell>
</template>

<script>
export default {
  name: 'channelsItem',
  props: ['data', 'isEditShow', 'disabled'],
  data() {
    return {}
  },
  methods: {
    onClick() {
      if (this.isEditShow) return false
      this.$router.push(`/forum/${this.data.id}`)
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.swipe-warp {
  height: 100%;
}
.channel-item {
  display: flex;
  align-items: center;
  /deep/ .van-image {
    display: flex;
    align-items: center;
    width: 30px;
    height: 30px;
  }
  /deep/ .van-image__img {
    border-radius: 8px;
  }
  /deep/ .van-cell__title {
    margin-left: 10px;
    h1 {
      font-size: 12px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      font-size: 8px;
      font-weight: 300;
    }
  }
}
.mover {
  font-size: 20px;
  padding: 0 5px;
}
</style>
