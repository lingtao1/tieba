
<template>
  <div class="history-item">
    <van-image class="channel-image" fit="cover" :src="data.image" />
    <p class="channel-name">{{ data.name }}</p>
    <p class="channel-synopsis">{{ data.synopsis }}</p>
    <p class="like-count">关注：3.3kw</p>
  </div>
</template>

<script>
export default {
  name: 'historyItem',
  props: ['data'],
  data() {
    return {}
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.history-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px;
  background: #fff;
  .channel-image {
    margin: 10px 20px 0;
    width: 40px;
    height: 40px;
  }
  .channel-name {
    margin-top: 10px;
    font-size: 14px;
  }
  p {
    font-size: 12px;
    color: #666;
    text-align: center;
  }
  .channel-synopsis {
    margin-top: 8px;
    width: 100px;
  }
  .like-count {
    margin-top: 8px;
  }
}
</style>
