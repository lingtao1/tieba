
<template>
  <div class="all">
    <h1>回复</h1>
    <van-icon @click="$router.back()" class="icon" name="arrow-left" />
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
.all {
  position: relative;
  text-align: center;
}
h1 {
  padding: 10px 0 8px;
  text-align: center;
  font-size: 18px;
  font-weight: normal;
  background: #fff;
  color: #000;
}

.icon {
  position: absolute;
  top: 15px;
  left: 16px;
  font-size: 16px;
}

.title-warp {
  display: inline-block;
  max-width: 150px;
  overflow: hidden;
  height: 21px;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* text-align: center; */
  margin: 0 auto;
}
</style>
