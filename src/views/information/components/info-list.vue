
<template>
  <div class="info-list" ref="info-list">
    <van-pull-refresh
      class="refresh-warp"
      v-model="isLoading"
      @refresh="onRefresh"
      :disabled="disabled"
      ref="pull"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多回复"
        loading-text=" "
        @load="onLoad"
      >
        <info-item
          class="info-item-warp"
          v-for="(item, index) in list"
          :key="index"
          :data="item"
          @clickItem="onClickItem"
        ></info-item>
      </van-list>
    </van-pull-refresh>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ width: '100%' }"
      :overlay="false"
      :get-container="getContainer"
      duration="0.1"
      :lazy-render="false"
    >
      <comment-input
        class="comment-input-warp"
        @clickBtn="onClickBtn"
        @blur="onBlur"
        @focus="onFocus"
        :placeholder="placeholder"
        focus
        ref="comment-input"
      ></comment-input>
    </van-popup>
  </div>
</template>

<script>
import infoItem from './info-item'
import commentInput from '@/components/comment-input'
import { reply } from '@/api/comment'
import { getInformationList } from '@/api/information'
export default {
  name: 'infoList',
  components: {
    infoItem,
    commentInput,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      isLoading: false,
      placeholder: null,
      show: false,
      disabled: false,
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getInformationList({ page: this.page })
      this.list.push(...data)
      this.page++
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (data.length < 5) {
        this.finished = true
      }
    },

    onRefresh() {
      // this.$router.go(0)
      this.list = []
      this.loading = false
      this.finished = false
      this.page = 1
      this.isLoading = false
    },

    onFocus() {
      this.disabled = true
    },
    onBlur() {
      this.disabled = false
      this.show = false
    },
    getContainer() {
      return document.querySelector('.information-container')
    },
    async onClickBtn($e) {
      await reply({
        comment_id: this.comment.comment_id,
        reply_id: this.comment.id,
        reply_type: 'reply',
        content: $e,
        to_uid: this.comment.from_uid,
      })
      this.$toast.success('回复成功')
    },
    onClickItem($e) {
      this.comment = $e
      this.placeholder = `回复：${$e.from_uname}`
      this.show = true
      this.$nextTick(() => {
        this.$refs['comment-input'].$el.querySelector('input').focus()
      })
    },
    handleScroll() {
      this.$refs['comment-input'].$el.querySelector('input').blur()
    },
  },
  created() {},

  mounted() {
    this.$refs['info-list'].addEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang='less' scoped>
.info-list {
  // min-height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  top: 45px;
  bottom: 55px;
  overflow-y: auto;
}
.refresh-warp {
  /deep/ .van-pull-refresh__track {
    min-height: 70vh;
  }
}
</style>
