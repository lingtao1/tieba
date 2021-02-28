
<template>
  <div class="comment-item" @click="addComment">
    <van-cell :border="false">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="comment.image"
        @click.stop="$router.push(`/user/${comment.user_id}`)"
      />
      <p slot="title" class="name">{{ comment.user_name }}</p>
      <p slot="label" class="RDate">
        {{ comment.createtime | relativeTime }}
      </p>
      <p class="like-item">
        <van-icon
          @click.stop="onClickLike({ parent_id: comment.id })"
          :name="comment.like ? 'good-job' : 'good-job-o'"
        />
        <span class="text">{{ comment.like_num }}</span>
      </p>
    </van-cell>
    <div class="detail-content">
      <p class="text">{{ comment.content }}</p>
    </div>

    <div class="reply-count">{{ comment.reply_num }}条回复</div>
  </div>
</template>

<script>
import { CommentLike } from '@/api/comment'
export default {
  props: ['comment'],
  data() {
    return {}
  },
  methods: {
    async onClickLike(obj) {
      await CommentLike(obj)
      this.comment.like ? this.comment.like_num-- : this.comment.like_num++
      this.comment.like = !this.comment.like
    },
    addComment() {},
  },
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.comment-item {
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
  .like-item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    padding: 0 0 10px;
    p {
      font-size: 16px;
    }
  }
  .reply-count {
    border-top: 8px solid rgb(241, 241, 241);
    padding: 0 15px;
    font-size: 18px;

    line-height: 35px;
  }
}
</style>
