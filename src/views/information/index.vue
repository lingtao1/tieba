
<template>
  <div class="information-container">
    <van-nav-bar class="nav-bar" title="消息" />
    <info-list></info-list>
  </div>
</template>

<script>
import infoList from './components/info-list'

export default {
  name: 'informationIndex',
  components: {
    infoList,
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.information-container {
  position: relative;
  .nav-bar {
    position: fixed;
    left: 0;
    right: 0;
  }
}
</style>
