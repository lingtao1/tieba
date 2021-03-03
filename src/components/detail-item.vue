
<template>
  <div class="detail-item" @click="$router.push(`/detail/${id}`)">
    <van-cell :border="false" >
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="avatar"
        @click.stop="$router.push(`/user/${uid}`)"
      />
      <p slot="title" class="name">{{ name }}</p>
      <p slot="label" class="RDate">
        {{ time | relativeTime }}
      </p>
    </van-cell>
    <div class="detail-content" >
      <p class="title">{{ title }}</p>
      <p class="text">
        {{ content }}
      </p>
      <div class="images">
        <van-image
          v-for="(item, index) in images"
          :key="index"
          :src="item"
          lazy-load
          show-loading
          @click.stop="onClickImage(index)"
          class="image-item"
          :class="images.length > 1 ? 'more' : 'only_one'"
          fit="cover"
        />
      </div>
    </div>
    <div v-if="cname" class="ops" >
      <van-button
        class="bar-name"
        type="info"
        size="mini"
        @click.stop="$router.push(`/forum/${cid}`)"
        >{{ cname }}</van-button
      >
      <div class="info">
        <i class="chat" >
          <van-icon name="chat-o" />
          <span> {{ commentnum }}</span>
        </i>
        <i class="like" @click.stop="onClickLike">
          <van-icon :name="likestate ? 'good-job' : 'good-job-o'" />
          <span> {{ likenum || 0 }}</span>
        </i>
      </div>
    </div>

    <div  v-else class="ops" >
      <div class="ops-item iconfont" name="share-o">&#xe6d1;</div>
      <p class="ops-item ops-item-flex">
        <span class="iconfont">&#xe609; </span>
        <span class="text">{{ commentnum }}</span>
      </p>
      <p class="ops-item ops-item-flex icon-godjob" @click.stop="onClickLike">
        <span class="iconfont">{{likestate ? '&#xe600' : '&#xe601'}} </span>
        <span class="text">{{ likenum || 120 }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { likeDetail } from '@/api/detail'
import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)

export default {
  props: {
    data: Object,
    id: Number,
    uid: Number,
    cid: Number,
    avatar: String,
    name: String,
    time: String,
    title: String,
    content: String,
    images: Array,
    cname: String,
    commentnum: Number,
    likestate: Boolean,
    likenum: Number,
  },
  data() {
    return {}
  },
  methods: {
    async onClickLike() {
      console.log(1)
      // await likeDetail({ id: this.id })
      this.likestate ? this.likenum-- : this.likenum++
      this.likestate = !this.likestate
    },
    onClickImage(index) {
      ImagePreview({ images: this.images, startPosition: index })
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.detail-item {
  margin: 8px 10px;
  padding: 0 0 10px 0;
  border-radius: 8px;
  background: #fff;

  .RDate {
    margin-left: 5px;
  }
  /deep/ .van-cell {
    background: unset;
  }
  .avatar {
    width: 40px;
    height: 40px;
  }

  p {
    margin-left: 5px;
  }

  /deep/ .van-cell__label {
    margin-top: 0;
  }
  .detail-content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    margin: 0 10px;
    p {
      font-size: 16px;
    }
    .images {
      margin: 8px 0 0;

      .image-item {
        box-sizing: border-box;

        border-radius: 8px;
        overflow: hidden;
      }
      .more {
        padding: 3px;
        width: 33%;
        height: 120px;
      }
      .only_one {
        width: 100%;
        max-height: 250px;
      }
    }
  }
}
.ops {
  margin-top: 8px;
  padding: 0 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  .bar-name {
    background: rgba(0, 16, 235, 0.2);
    color: #000;
    border: 0;
  }
  .info {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 5px;
      span {
        margin-left: 2px;
      }
    }
  }

  // no cname
  .ops-item {
    flex: 1;
    text-align: center;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 3px;
      font-size: 15px;
    }
  }
}
</style>
