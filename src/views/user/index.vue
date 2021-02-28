
<template>
  <div ref="user-index">
    <div class="background">
      <div class="box">
        <van-icon
          name="arrow-left"
          class="arrow-left"
          :class="{ 'arrow-left-hide': isHide }"
        />
      </div>
      <van-nav-bar
        :title="info.name"
        left-arrow
        :border="false"
        @click-left="$router.back()"
        class="nav-bar-warp"
        ref="navbar"
      />
      <user :id="id" class="user-warp" ref="user" />
    </div>
    <list class="list-warp" :id="id" />
  </div>
</template>

<script>
import user from './components/user'
import list from './components/list'
import { getUserInfo } from '@/api/user'
import Bus from './bus.js'
export default {
  props: ['id'],
  components: {
    user,
    list,
  },
  data() {
    return {
      info: [],
      isHide: false,
    }
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      var navbar = this.$refs.navbar.$el
      var user = this.$refs.user.$el
      // console.log('user', user.scrollHeight, 'windows', scrollTop)
      // console.log(scrollTop - user.scrollHeight - 46)
      // navbar.style.opacity = scrollTop - user.scrollHeight - 46 + '%'

      scrollTop > 0 ? (this.isHide = true) : (this.isHide = false)

      navbar.style.opacity = (scrollTop / (user.scrollHeight - 46)) * 100 + '%'
    },
    async loadUserProfile() {
      const { data } = await getUserInfo({ id: this.id })
      this.info = data
      Bus.$emit('userinfo', data)
    },
  },
  created() {
    this.loadUserProfile()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang='less' scoped>
.background {
  background: url('./background.jpg') no-repeat;
  background-size: cover;
  .nav-bar-warp {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    opacity: 0;
    z-index: 99999;
    background: #fff !important;
    /deep/ .van-nav-bar__title {
      color: #000 !important;
    }
    /deep/.van-icon-arrow-left {
      color: #000 !important;
      opacity: 1 !important;
    }
  }
  .box {
    height: 46px;
    .arrow-left {
      padding: 0 14px;
      line-height: 46px;
      font-size: 16px;
      color: #fff;
    }
    .arrow-left-hide {
      display: none;
    }
  }
}

.list-warp {
  margin-top: -10px;
  border-radius: 15px 15px 0 0;
}
</style>
