
<template>
  <div class="reply-item-module">
    <p class="reply-info">{{ `回复 ${data.name}：${data.content}` }}</p>
    <van-form
      @submit="onSubmit"
      @failed="onFailed"
      :show-error="false"
      :show-error-message="false"
    >
      <van-field
        v-model="message"
        autosize
        rows="2"
        show-word-limit
        type="textarea"
        placeholder="输入评论"
        class="textarea"
        :border="false"
        :rules="[{ required: true, message: '评论不能为空' }]"
      />
      <van-button class="btn-submit" type="info" size="mini"
        >发布评论</van-button
      >
    </van-form>
  </div>
</template>

<script>
import { reply } from '@/api/comment'

export default {
  name: 'replyItemModule',
  props: ['data', 'type'],
  data() {
    return {
      message: '',
    }
  },
  methods: {
    async onSubmit() {
      var obj = {
        comment_id: this.data.comment_id || this.data.id,
        reply_id: this.data.id,
        reply_type: this.data.user_id ? 'comment' : 'reply',
        content: this.message,
        to_uid: this.data.from_uid || this.data.user_id,
      }

      const { data } = await reply(obj)
      this.$emit('onInsert', data)
      this.$emit('onClose')
    },
    onFailed(error) {
      this.$toast({
        message: error.errors[0].message,
        position: 'top',
      })
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.reply-item-module {
  padding: 10px 10px;
  height: 125px;
  .reply-info {
    margin: 0 5px;
    font-size: 12px;
    color: #939484;
  }
  .textarea {
    padding: 5px 0;
    /deep/ .van-field__control {
      background: #e9e5e3;
      text-indent: 5px;
    }
    /deep/ .van-cell {
    }
  }

  .btn-submit {
    float: right;
    font-size: 12px;
    padding: 5px;
    margin-top: 5px;
  }
}
</style>
