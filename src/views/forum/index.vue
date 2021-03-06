
<template>
  <div class="forumIndex" ref="forum">
    <div class="bg" ref="bg">
      <van-nav-bar
        ref="navbar"
        left-arrow
        :left-text="channelInfo.name"
        :border="false"
        @click-left="$router.back()"
        class="navbar-forum"
      />
      <div class="box">
        <van-icon v-show="isiconSHow" name="arrow-left" class="arrow-left" />
      </div>
      <van-cell class="forum-info">
        <van-image
          slot="icon"
          class="forum-avatar"
          fit="cover"
          :src="channelInfo.image"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="15" />
          </template>
        </van-image>
        <template #title>
          <h5 class="forum-name">
            {{ channelInfo.name }}
          </h5>
          <p class="forum-synopsis" v-show="channelInfo">
            简介：{{ channelInfo.synopsis }}
          </p>
          <p class="forum-data" v-show="channelInfo">
            关注：{{ channelInfo.follow_num }}
          </p>
        </template>

        <van-button
          v-show="channelInfo"
          class="follw-btn"
          type="default"
          @click="onFollow"
          >{{ channelInfo.isFollow ? '已关注' : '关注' }}</van-button
        >
      </van-cell>
    </div>

    <div class="content-warp">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        loading-text=" "
        @load="onLoad"
        class="forum-list"
      >
        <detail-item
          v-for="(item, index) in detailsList"
          :key="index"
          :id="item.id"
          :uid="item.user_id"
          :avatar="item.image"
          :name="item.name"
          :time="item.createtime"
          :title="item.title"
          :content="item.content"
          :images="item.images"
          :commentnum="item.comment_num"
          :cname="item.channel_name"
          :likenum="item.like_num"
          :likestate="item.like_state"
          @clickLike="clickLike(index)"
        />
      </van-list>

      <van-empty
        v-if="noDetails"
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无内容，踊跃发表"
      />
    </div>
    <button class="btn-add" v-show="!show" @click="show = true">
      <van-icon class="btn-add-icon" name="plus" />
    </button>

    <van-popup
      v-model="show"
      position="bottom"
      lazy-render
      closeable
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <build-details
        :forumId="forumId"
        @onClose="show = false"
        @insertDetail="insertDetail"
        :name="channelInfo.name"
      ></build-details>
    </van-popup>
  </div>
</template>

<script>
import buildDetails from './components/build-details'
import detailItem from '@/components/detail-item.vue'

import { getDetailList, getDetail } from '@/api/detail'
import { getChannelInfo, followChannel } from '@/api/channel'

export default {
  name: 'forumIndex',
  props: ['forumId'],
  components: {
    buildDetails,
    detailItem,
  },
  data() {
    return {
      isiconSHow: true,
      show: false,
      channelInfo: false,
      detailsList: [],
      loading: false,
      finished: false,
      page: 1,
      noDetails: false,
      finishedText: '没有更多了',
      scrollTop: 0,
      id: null,
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getDetailList({
        forumId: this.forumId,
        page: this.page,
      })

      this.detailsList.push(...data)
      this.page++
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (data.length < 3) {
        this.finished = true
        if (this.detailsList.length == 0) {
          this.finishedText = ''
          this.noDetails = true
        }
      }
    },

    async loadChannelInfo() {
      const { data } = await getChannelInfo({ id: this.forumId })
      this.channelInfo = data
    },
    async insertDetail($e) {
      const { data } = await getDetail({ id: $e })
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      var bg = this.$refs.bg
      scrollTop > 0 ? (this.isiconSHow = false) : (this.isiconSHow = true)
      this.$refs.navbar.$el.style.opacity =
        (scrollTop / (bg.scrollHeight - 46)) * 100 + '%'
    },
    async onFollow() {
      const { data } = await followChannel({ id: this.channelInfo.id })
      this.channelInfo.isFollow = !this.channelInfo.isFollow
    },
    clickLike(index) {
      const item = this.detailsList[index]
      item.like_state ? item.like_num-- : item.like_num++
      item.like_state = !item.like_state
    },
  },

  created() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  activated() {
    var timeout = setInterval(() => {
      document.documentElement.scrollTop = this.scrollTop
      if (this.scrollTop == document.documentElement.scrollTop) {
        clearInterval(timeout)
      }
    })

    if (this.id !== this.forumId) {
      Object.assign(this.$data, this.$options.data())
      this.loadChannelInfo()
      this.onLoad()
      this.id = this.forumId
    }
  },

  deactivated() {
    this.scrollTop = document.documentElement.scrollTop
    // console.log('deactivated', this.scrollTop)
  },
}
</script>
<style lang='less' scoped>
.bg {
  background: skyblue;
  .box {
    height: 46px;
    .arrow-left {
      padding: 0 16px;
      line-height: 46px;
      font-size: 16px;
      color: #1989fa;
    }
  }
}

.navbar-forum {
  position: fixed;
  right: 0;
  left: 0;
  background: white;
  opacity: 0;
  /deep/ .van-nav-bar__text {
    margin: 0 0 0 20px;
    font-size: 18px;
    color: #000;
  }
}
.forum-info {
  background: transparent;
  padding-bottom: 30px;
  .forum-avatar {
    // margin: 12px 0;
    width: 60px;
    height: 60px;
    border: 2px solid #fff;
    border-radius: 25px;
    overflow: hidden;
  }
  /deep/ .van-cell__title {
    margin-top: 5px;
    margin-left: 15px;
    width: 133px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .forum-name {
      font-size: 20px;
    }
    p {
      font-size: 10px;
      line-height: 14px;
      margin: 3px 0 0 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  /deep/ .van-cell__value {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .follw-btn {
      margin-top: 5px;
      padding: 5px 0;
      width: 55px;
      border-radius: 30px;
      height: unset;
      font-size: 12px;
    }
    .follw-btn-active {
      background: gray;
    }
  }
}

.forum-list {
  background: unset;
}

.btn-add {
  z-index: 20;
  position: fixed;
  top: 80%;
  right: 8%;
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #1c1c1c;
  .btn-add-icon {
    display: block;

    font-style: 20px;
    line-height: 50px;
    color: #fff;
    font-size: 30px;
  }
}
.custom-image {
  margin-top: 120px;
  /deep/ .van-empty__image {
    width: 100px;
    height: 100px;
  }
  /deep/ .van-empty__description {
    margin-top: 20px;
  }
}

.content-warp {
  margin-top: -10px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  background: #f5f5f8;
}
</style>
