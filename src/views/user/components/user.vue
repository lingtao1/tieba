
<template>
  <div class="user">
    <van-cell class="van-warp" :border="false">
      <template #icon>
        <van-image round :src="info.image" class="avatar" />
      </template>
      <template #title>
        <p class="name">{{ info.name }}</p>
      </template>
      <template #label>
        <p class="synopsis">简介：签名是一种态度，我想我可以更酷...</p>
        <van-button type="default" class="btn-follow" round>关注</van-button>
      </template>
    </van-cell>

    <van-grid class="grid-warp" :column-num="3" :border="false">
      <van-grid-item class="grid-item">
        <template #text>
          <p class="text">
            <span class="num">{{ info.follow_num }}</span
            >关注
          </p>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template #text>
          <p class="text">
            <span class="num">{{ info.fans_num }}</span
            >粉丝
          </p>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template #text>
          <p class="text">
            <span class="num">{{ info.channel_num }}</span
            >吧
          </p>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import Bus from '../bus.js'
export default {
  props: ['id'],
  data() {
    return {
      info: [],
    }
  },
  methods: {},
  created() {
    Bus.$on('userinfo', (data) => {
      this.info = data
    })
  },
  mounted() {},
}
</script>
<style lang='less' scoped>
.user {
  height: 170px;
}
/deep/ .van-warp {
  padding-top: 25px;
  background: transparent;
  .avatar {
    width: 70px;
    height: 70px;
  }
  .van-cell__title {
    margin-top: -8px;
    padding-left: 20px;

    .name {
      font-size: 16px;
      color: #fff;
    }
  }

  .van-cell__label {
    margin: unset;
    .synopsis {
      padding: 5px 0 8px;
      color: #fff;
    }
    .btn-follow {
      height: 30px;
      width: 180px;
    }
  }
}

/deep/ .grid-warp {
  .grid-item {
    .van-grid-item__content {
      background: transparent;
    }
    .text {
      font-size: 12px;
      color: #fff;
      .num {
        margin-right: 2px;
        font-size: 18px;
      }
    }
  }
}
</style>
