
<template>
  <div class="no-login">
    <van-image :src="require('./weidenglu.jpg')" class="img" />
    <p>你还未登录，请登录后查看</p>
    <van-button type="info" block class="btn" @click="$router.push(`/my`)"
      >登录</van-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.no-login {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  .img {
    width: 200px;
  }
  p {
    margin-top: 10px;
  }
  .btn {
    margin-top: 30px;
    height: 40px;
    width: 70% !important;
    border-radius: 20px;
  }
}
</style>
