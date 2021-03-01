
<template>
  <div class="information-container">
    <van-nav-bar class="nav-bar" title="消息" />
    <info-list v-if="$store.state.user"></info-list>
    <not-logged-in v-else class="not-logged-warp" />
  </div>
</template>

<script>
import infoList from './components/info-list'
import notLoggedIn from '@/components/not-logged-in'

export default {
  name: 'informationIndex',
  components: {
    infoList,
    notLoggedIn,
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
.not-logged-warp {
  padding-top: 86px !important;
}
</style>
