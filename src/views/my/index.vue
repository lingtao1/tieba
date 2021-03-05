
<template >
  <div class="my-index">
    <van-nav-bar class="nav-bar" :title="user ? '我的' : '游客'" />

    <div v-if="user">
      <van-cell center class="user-info">
        <div slot="title">
          <van-image class="my-avatar" round fit="cover" :src="userInfo.image">
            <template #loading>
              <van-loading ngtype="spinner" size="15" />
            </template>
          </van-image>
          <div class="user-details">
            <p class="my-name">
              {{ userInfo.name }}
            </p>
            <p class="my-details">
              <span>关注:{{ 11110111 | numConvert }}</span>
              <span>粉丝:{{ 1111111 | numConvert }}</span>
            </p>
          </div>
        </div>

        <van-button size="mini" type="default" @click="isUsesrEdit = true"
          >编辑</van-button
        >
      </van-cell>

      <van-grid class="user-total" :border="false">
        <van-grid-item text="收藏">
          <div slot="icon">{{ 1111111 | numConvert }}</div>
        </van-grid-item>
        <van-grid-item text="收藏">
          <div slot="icon">{{ 1111111 | numConvert }}</div>
        </van-grid-item>
        <van-grid-item text="收藏">
          <div slot="icon">{{ 1111111 | numConvert }}</div>
        </van-grid-item>
        <van-grid-item text="收藏">
          <div slot="icon">{{ 1111111 | numConvert }}</div>
        </van-grid-item>
      </van-grid>
    </div>

    <div v-else class="off-line">
      <van-cell class="off-line-item" to="/login">
        <div slot="title">
          <van-image
            class="off-line-item-image"
            :src="require('./off-line.jpg')"
            round
            fit="cover"
          />
          <h2>点击登录</h2>
        </div>
      </van-cell>
    </div>

    <van-button
      v-if="user"
      class="signout-btn"
      @click="onSignOut"
      type="info"
      block
      >退出登录</van-button
    >

    <van-popup
      :style="{ width: '100%', height: '100%', background: '#f5f5f8' }"
      v-model="isUsesrEdit"
      closeable
      close-icon-position="top-left"
      lazy-render
      position="right"
    >
      <userinfo-edit></userinfo-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
import userinfoEdit from './components/userinfo-edit'
export default {
  name: 'myIndex',
  components: {
    userinfoEdit,
  },
  data() {
    return {
      userInfo: [],
      isUsesrEdit: false,
    }
  },
  methods: {
    async loadUserProfile() {
      if (!this.user) return false
      const { data } = await getUserProfile()
      this.userInfo = data
    },

    onSignOut() {
      // 移除cookie
      Cookies.remove('token')
      //
      this.$store.commit('setUser', '')
    },
  },
  computed: {
    ...mapState(['user']),
  },
  activated() {
    if (this.user) {
      this.loadUserProfile()
    }
  },
  mounted() {},
  filters: {
    numConvert: function (num) {
      if (num >= 10000000) {
        num = Math.round(num / 1000000) / 10 + 'kw'
      } else if (num >= 10000) {
        num = Math.round(num / 1000) / 10 + 'w'
      } else if (num >= 1000) {
        num = Math.round(num / 100) / 10 + 'k'
      }
      return num
    },
  },
}
</script>
<style lang='less' scoped>
.user-info {
  margin: 20px 0 0;
  .my-avatar {
    width: 60px;
    height: 60px;
    float: left;
  }
  .user-details {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    .my-details {
      font-size: 12px;
      span {
        margin-right: 5px;
      }
    }
  }
  .my-name {
    color: #000;
  }
  /depp/ .van-button--small {
    height: 20px !important;
  }
  /deep/ .van-button--default {
    border: 1px solid #000;
  }
  /deep/ .van-cell__label {
    margin: 0;
    margin-left: 15px;
  }
  /deep/ .van-cell__title,
  .van-cell__value {
    flex: unset;
  }
  /deep/ .van-cell__title {
    width: 300px;
    overflow: hidden;
  }
}

.user-total {
  margin: 10px 0;
  /deep/ .van-grid-item__icon-wrapper {
    font-size: 18px;
  }
  /deep/ .van-grid-item__text {
    margin-top: 5px;
  }
}

.off-line {
  margin: 10px 0;
  .off-line-item {
    .off-line-item-image {
      width: 100px;
      height: 100px;
    }

    /deep/ .van-cell__title {
      display: flex;
      justify-content: center;
      text-align: center;
    }
    h2 {
      margin-top: 10px;
    }
  }
}

.signout-btn {
  margin-top: 40px;
  width: 90%;
  border-radius: 10px;
  margin: 40px auto 0;
}
</style>
