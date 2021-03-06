
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
      <user :info="info" class="user-warp" ref="user" />
    </div>
    <list class="list-warp" :id="id" :info="info" />
  </div>
</template>

<script>
import user from './components/user'
import list from './components/list'
import { getUserInfo } from '@/api/user'

export default {
  name: 'userIndex',
  props: ['id'],
  components: {
    user,
    list,
  },
  data() {
    return {
      info: [],
      isHide: false,
      uid: 0,
      scrollTop: 0,
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
      scrollTop > 0 ? (this.isHide = true) : (this.isHide = false)
      navbar.style.opacity = (scrollTop / (user.scrollHeight - 46)) * 100 + '%'
    },
    async loadUserProfile() {
      const { data } = await getUserInfo({ id: this.id })
      this.info = data
    },
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  activated() {
    var timer = setInterval(() => {
      document.documentElement.scrollTop = this.scrollTop
      if (document.documentElement.scrollTop == this.scrollTop) {
        clearInterval(timer)
      }
    })
    if (this.uid !== this.id) {
      Object.assign(this.$data, this.$options.data())
      this.loadUserProfile()
      this.uid = this.id
    }
  },
  deactivated() {
    this.scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
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
