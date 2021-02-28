
<template>
  <van-cell class="footer-bar" center>
    <form class="reply-form">
      <van-field
        v-model="message"
        type="text"
        placeholder="写评论..."
        class="reply-input"
        @focus="onClickInput"
        @blur="onBlur"
        ref="input"
      />
    </form>
    <van-button
      v-show="isShowInput"
      type="info"
      size="mini"
      class="reply-submit"
      :disabled="isInput"
      @click="onSubmit"
      >提交</van-button
    >
  </van-cell>
</template>

<script>
import { addComment, reply } from '@/api/comment'
import { debounce } from 'lodash'

export default {
  props: ['comment', 'isShow'],
  data() {
    return {
      message: '',
      isInput: false,
      type: null,
      isShowInput: false,
    }
  },
  methods: {
    async onSubmit() {
      var obj = {
        comment_id: this.comment.id,
        reply_id: this.comment.id,
        reply_type: 'comment',
        content: this.message,
        to_uid: this.comment.user_id,
      }

      const { data } = await reply(obj)
      this.$emit('onInsert', data)
      this.message = ''
    },
    onBlur: debounce(function () {
      this.isShowInput = false
    }, 200),
    onClickInput() {
      this.isShowInput = true
    },
  },
  created() {},
  mounted() {},
  watch: {
    message: {
      immediate: true,
      handler: function (val) {
        val.trim() == '' ? (this.isInput = true) : (this.isInput = false)
      },
    },
    isShow(val) {
      this.$refs.input.$el.getElementsByTagName('input')[0].blur()
    },
  },
}
</script>
<style lang='less' scoped>
.footer-bar {
  width: 100%;
  /deep/ .van-cell__value {
    display: flex;
    align-items: center;
  }
  .icon-comment {
    font-size: 16px;
  }
  .reply-form {
    width: 100%;
    flex: 1;
    .reply-input {
      padding-left: 10px;
      height: 30px;
      border-radius: 5px;
      background: rgb(238, 238, 238);
    }
  }
  .reply-submit {
    padding: 0 10px;
    margin-left: 8px;
    height: 30px;
    border: 0;
    border-radius: 10px;
  }

  .not-thing {
    background: rgb(174, 202, 255);
  }
}
</style>
