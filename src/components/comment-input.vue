
<template>
  <div>
    <van-field
      class="input-warp"
      v-model="message"
      center
      clearable
      clear-trigger="always"
      left-icon="comment-o"
      :placeholder="placeholder"
      @click="$emit('click')"
      @focus="onFocus"
      @blur="onBlur"
      @input="$emit('input')"
      ref="input-comment"
    >
      <template #button>
        <van-button size="mini" class="btn-send" type="info" @click="onClick"
          >发送</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    placeholder: {
      default: '说点什么吧',
    },
    focus: {
      type: Boolean,
    },
  },
  data() {
    return {
      message: '',
    }
  },
  methods: {
    onClick() {
      this.$emit('clickBtn', this.message)
    },
    onBlur: debounce(function () {
      this.$emit('blur')
    }, 100),
    onFocus() {
      this.$emit('focus')
    },
  },
  created() {},
  mounted() {},
  watch: {
    focus: {
      handler: function (val) {
        if (val) {
          this.$nextTick(() => {
            this.$refs['input-comment'].$el.querySelector('input').focus()
          })
        }
      },
      immediate: true,
    },
  },
}
</script>
<style lang='less' scoped>
/deep/ .input-warp {
  .van-field__button {
    display: flex;
    align-items: center;
  }
  .btn-send {
    padding: 15px 10px;
    font-size: 12px;

    border-radius: 5px;
    border: 0;
  }
  .van-field__body {
    position: relative;
    .van-field__control {
      border-radius: 5px;
      padding-left: 5px;
      padding-right: 30px;
      margin-left: 10px;
      height: 30px;
      background: rgb(241, 241, 241);
    }
    .van-icon-clear {
      position: absolute;
      right: 62px;
    }
  }
}
</style>
