<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="cachePages">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return { transitionName: '' }
  },
  computed: {
    ...mapState(['cachePages']),
  },
  mounted() {},
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      if (parseInt(to.query._t) < parseInt(from.query._t)) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    },
  },
}
</script>
<style lang="less">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 200ms;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}

.slide-right-enter {
  opacity: 0;
  transform: translate(-100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
