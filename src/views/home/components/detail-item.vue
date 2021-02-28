
<template>
  <div class="detail-item">
    <van-cell :border="false" @click="onClickToDetail(data.id)">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="data.user_image"
      />
      <p slot="title" class="name">{{ data.user_name }}</p>
      <p slot="label" class="RDate">
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
      <van-button
        class="btn"
        type="info"
        size="mini"
        @click="$router.push(`/forum/${data.channel_id}`)"
        >{{ data.channel_name }}</van-button
      >
      <div class="icon">
        <van-icon name="chat-o" class="icon-chat" />
        <span> {{ data.num }}</span>
      </div>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-top: 8px;
  margin-right: 25px;

  .btn {
    margin-left: 15px;
    background: rgba(0, 16, 235, 0.2);
    color: #000;
    border: 0;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-chat {
      margin-right: 3px;
    }
    span {
      font-size: 14px;
    }
  }
}
</style>
