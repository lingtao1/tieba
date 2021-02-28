
<template>
  <van-cell class="footer-bar" center>
    <van-icon name="comment-o" class="icon-comment" />
    <form class="reply-form">
      <van-field
        v-model="message"
        type="text"
        placeholder="写评论..."
        class="reply-input"
        @blur="onBlur"
        @click="onClickInput"
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
import { addComment } from '@/api/comment'
import { debounce } from 'lodash'

export default {
  props: ['detailId', 'isShow'],
  data() {
    return {
      message: '',
      isInput: false,
      isShowInput: false,
    }
  },
  methods: {
    async onSubmit() {
      if (this.message.trim() == '') return false
      try {
        const { data } = await addComment({
          detail_id: this.detailId,
          content: this.message,
        })

        this.$toast.success('发布成功！')
        this.$emit('insertComment', data)
        this.$refs.input.$el.getElementsByTagName('input')[0].blur()
        this.message = ''
      } catch (err) {
        this.$toast.fail('网络或服务器端错误，请稍后再尝试！')
      }
    },
    onClickInput() {
      this.isShowInput = true
      this.$refs.input.$el.getElementsByTagName('input')[0].focus()
    },
    onBlur: debounce(function () {
      this.isShowInput = false
    }, 200),
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
    margin-left: 10px;
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
