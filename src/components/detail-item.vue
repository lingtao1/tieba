
<template>
  <div class="detail-item">
    <van-cell :border="false" @click="onClickToDetail(data.id)">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="data.image || 'https://img.yzcdn.cn/vant/cat.jpeg'"
        @click.stop="$router.push(`/user/${data.user_id}`)"
      />
      <p slot="title" class="name">{{ data.name }}</p>
      <p slot="label" class="RDate" v-show="data.createtime">
        {{ data.createtime | relativeTime }}
      </p>
    </van-cell>
    <div class="detail-content" @click="onClickToDetail(data.id)">
      <p class="title">{{ data.title }}</p>
      <p class="text">
        {{ data.content }}
      </p>
      <div class="images">
        <van-image
          v-for="(item, index) in data.images"
          :key="index"
          :src="item"
          lazy-load
          show-loading
          @click.stop="onClickImage(index)"
          class="image-item"
          :class="data.images.length > 1 ? 'more' : 'only_one'"
          fit="cover"
        />
      </div>
    </div>
    <div class="ops">
      <div class="ops-item iconfont" name="share-o">&#xe6d1;</div>
      <p class="ops-item ops-item-flex">
        <span class="iconfont" @click="onClickToDetail(data.id)"
          >&#xe609;
        </span>
        <span class="text">{{ data.comment_num }}</span>
      </p>
      <p class="ops-item ops-item-flex icon-godjob">
        <van-icon
          @click="onClickLike(data.id)"
          class="icon-godjob"
          :name="data['like_state'] ? 'good-job' : 'good-job-o'"
        >
        </van-icon
        ><span class="text">{{ data.like_num }}</span>
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
  props: ['data'],
  data() {
    return {}
  },
  methods: {
    async onClickLike(id) {
      await likeDetail({ id })

      this.data['like_state']
        ? this.data['like_num']--
        : this.data['like_num']++
      this.data['like_state'] = !this.data['like_state']
    },
    onClickToDetail(id) {
      this.$router.push(`/detail/${id}`)
    },
    onClickImage(index) {
      ImagePreview({ images: this.data.images, startPosition: index })
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
        width: 66%;
        max-height: 250px;
      }
    }
  }

  .ops {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    .ops-item {
      flex: 1;
      text-align: center;
      font-size: 16px;
      // font-weight: 300;
    }
    .ops-item-flex {
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        padding-left: 5px;
        font-size: 16px;
      }
    }
    .icon-godjob {
      font-size: 20px;
      .text {
        padding-left: 1px;
        font-size: 16px;
      }
    }
  }
}
</style>
