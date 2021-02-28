
<template>
  <div class="comment-container">
    <header-bar></header-bar>
    <div class="fixed-warp" ref="comment">
      <comment @loadComment="loadComment" :comment="comment"></comment>
      <reply :id="commentId" :reply="reply"></reply>
    </div>

    <reply-modular
      :isShow="reply_modular"
      :comment="comment"
      @onInsert="onInsert"
      class="footer-bar"
    />
  </div>
</template>

<script>
import comment from './components/comment'
import reply from './components/reply'
import headerBar from './components/header-bar'
import replyModular from './components/reply-modular'
import { getOneComment } from '@/api/comment'
export default {
  name: 'commentIndex',
  props: ['commentId', 'detailId'],
  components: {
    comment,
    reply,
    headerBar,
    replyModular,
  },
  data() {
    return {
      replyItemModuleShow: false,
      reply_modular: false,
      comment: [],
      reply: null,
    }
  },
  methods: {
    handleScroll() {
      this.reply_modular = !this.reply_modular
    },
    async loadComment() {
      const { data } = await getOneComment({ id: this.commentId })
      this.comment = data
    },
    onInsert($e) {
      this.reply = $e
    },
  },
  created() {
    this.loadComment()
  },
  mounted() {
    this.$refs.comment.addEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang='less' scoped>
.reply-item-module {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 99;
}
.fixed-warp {
  position: absolute;
  left: 0;
  right: 0;
  top: 42px;
  bottom: 52px;
  overflow-y: auto;
}

.footer-bar {
  position: fixed;
  align-items: center;
  bottom: 0;
}
</style>
