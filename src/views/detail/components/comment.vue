
<template>
  <div class="detail-item">
    <van-cell :border="false" @click="replyItemModuleShow = true">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="data.image"
        @click.stop="$router.push(`/user/${data.user_id}`)"
      />
      <p slot="title" class="name">{{ data.name }}</p>
      <p slot="label" class="RDate">{{ data.createtime | relativeTime }}</p>
      <p class="like-item">
        <van-icon
          @click.stop="onClickLike({ parent_id: data.id })"
          :name="data.like ? 'good-job' : 'good-job-o'"
        />
        <span class="text">{{ data.like_num }}</span>
      </p>
    </van-cell>
    <div class="detail-content" @click="replyItemModuleShow = true">
      <p class="text">
        {{ data.content }}
      </p>
      <div class="images"></div>
    </div>
    <reply-item
      class="reply-item-warp"
      :data="data.reply"
      :num="data.reply_num"
      @click.native="$router.push(`/detail/${detailId}/comment/${data.id}`)"
    ></reply-item>
    <van-popup
      v-model="replyItemModuleShow"
      :style="{ width: '100%' }"
      lazy-render
      position="bottom"
      class="reply-item-module"
    >
      <reply-item-module
        v-if="replyItemModuleShow"
        :data="data"
        :detailId="detailId"
        @onClose="replyItemModuleShow = false"
        @onInsert="insertReplyItem"
      ></reply-item-module>
    </van-popup>
  </div>
</template>

<script>
import { CommentLike } from '@/api/comment'
import replyItemModule from './reply-item-module'
import replyItem from './reply-item'
export default {
  name: 'comment',
  props: ['data', 'detailId'],
  components: {
    replyItemModule,
    replyItem,
  },
  data() {
    return {
      replyItemModuleShow: false,
    }
  },
  methods: {
    async onClickLike(obj) {
      await CommentLike(obj)
      this.data.like ? this.data.like_num-- : this.data.like_num++
      this.data.like = !this.data.like
    },
    insertReplyItem($e) {
      $e.from_uname = $e.name
      this.data.reply.push($e)
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.detail-item {
  padding: 5px 0;
  background: #fff;
  border-bottom: 1px solid rgba(190, 182, 182, 0.2);
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
      display: flex;
      margin: 8px 0 0;
      .image-item {
        flex: 1;
        max-width: 230px;
        max-height: 230px;
        margin: 5px;
        border-radius: 8px;
        overflow: hidden;
      }
    }
  }

  .like-item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 3px;
    font-size: 16px;
  }

  .reply-item-warp {
    margin: 0 20px;
  }

  .reply-item-module {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 99;
  }
}
</style>
