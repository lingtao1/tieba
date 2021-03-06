
<template>
  <div class="detail-index">
    <!-- 头部导航条 -->
    <van-nav-bar
      left-arrow
      :border="false"
      @click-left="$router.back()"
      class="navbar-detail"
    >
      <van-button
        slot="title"
        center
        type="default"
        size="small"
        :icon="detailInfo.image"
        class="navbar-detail-info"
        @click="$router.push(`/forum/${detailInfo.parent_id}`)"
        >{{ detailInfo.channel_name }}</van-button
      >
    </van-nav-bar>
    <!-- /头部导航条 -->

    <main ref="main">
      <!-- 主体内容 -->
      <detail-content
        :data="detailInfo"
        :loading="detailloading"
      ></detail-content>
      <!-- /主体内容 -->

      <!-- 回复列表 -->
      <comment-list :id="detailId" />
      <!-- /回复列表 -->
    </main>

    <!-- 底部 -->
    <reply-modular
      :detailId="detailId"
      :isShow="reply_modular"
      @insertComment="insertComment"
      class="footer-bar"
    />

    <!-- /底部 -->
  </div>
</template>

<script>
import commentList from './components/comment-list'

import replyModular from './components/reply-modular'
import detailContent from './components/detail-content'
import { mapState } from 'vuex'

import { getDetail } from '@/api/detail'
import { debounce } from 'lodash'

export default {
  name: 'detailIndex',
  components: {
    commentList,
    replyModular,
    detailContent,
  },
  props: ['detailId'],
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      detailInfo: [],
      detailloading: true,
      reply_modular: false,
      scrollTop: 0,
    }
  },
  methods: {
    insertComment($e) {
      this.list.push($e)
    },
    async loadDetail() {
      const { data } = await getDetail({ id: this.detailId })
      this.detailInfo = data
      this.detailloading = false
    },
  },

  created() {},
  mounted() {},
  activated() {
    if (this.id !== this.detailId) {
      Object.assign(this.$data, this.$options.data())
      this.id = this.detailId
    }
    this.loadDetail()
    const main = this.$refs.main
    main.scrollTop = this.scrollTop
    main.addEventListener(
      'scroll',
      debounce(() => {
        this.scrollTop = main.scrollTop
      })
    )
  },
}
</script>
<style lang='less' scoped>
.navbar-detail {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  .navbar-detail-info {
    background: rgb(245, 244, 244);
    min-width: 40px;
    border: 0;
    border-radius: 5px;
    overflow: hidden;
    .van-icon__image {
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 5px;
    }
  }
}

main {
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}

.footer-bar {
  position: fixed;
  align-items: center;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
