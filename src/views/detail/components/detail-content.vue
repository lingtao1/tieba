
<template>
  <div class="detail-content">
    <van-skeleton
      class="skeleton-warp"
      title
      avatar
      :row="4"
      :animate="false"
      :loading="loading"
    >
      <van-cell :border="false">
        <van-image
          slot="icon"
          class="avatar"
          round
          fit="cover"
          :src="data.user_image"
          @click="$router.push(`/user/${data.user_id}`)"
        />
        <p slot="title" class="name">{{ data.name }}</p>
        <p slot="label" class="RDate">{{ data.createtime | relativeTime }}</p>
      </van-cell>
      <div class="detail-content">
        <p class="title">{{ data.title }}</p>
        <p class="text">
          {{ data.content }}
        </p>
        <div class="images">
          <van-image
            v-for="(item, index) in data.images"
            :key="index"
            :src="item"
            @click="onClickImage(index)"
            class="image-item"
            fit="cover"
          />
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
export default {
  name: 'detailContent',
  props: ['data', 'loading'],
  data() {
    return {}
  },
  methods: {
    onClickImage(index) {
      ImagePreview({ images: this.data.images, startPosition: index })
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.skeleton-warp {
  margin-bottom: 205px;
  /deep/ .van-skeleton__avatar {
    width: 40px;
    height: 40px;
  }
}
.skeleton-warp::after {
  content: '';
  display: block;
  position: absolute;
  top: 155px;
  left: 10px;
  height: 200px;
  width: 355px;
  background: #f2f3f5;
  border-radius: 8px;
}

.detail-content {
  padding: 0 0 10px 0;
  border-radius: 8px;
  background: #fff;
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
        margin-top: 10px;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
      }
    }
  }
}
</style>
