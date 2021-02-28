
<template>
  <div class="detail-index">
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

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="暂无更多回复"
      loading-text=" "
      @load="onLoad"
      class="comment-list"
      ref="comment"
    >
      <detail-content
        :data="detailInfo"
        :loading="detailloading"
      ></detail-content>
      <order-bar @onOrder="onOrder" @onCheck="onCheck"></order-bar>
      <comment
        v-for="(item, index) in list"
        :key="index"
        :data="item"
        :detailId="detailId"
      ></comment>
    </van-list>

    <reply-modular
      :detailId="detailId"
      :isShow="reply_modular"
      @insertComment="insertComment"
      class="footer-bar"
    />
  </div>
</template>

<script>
import comment from './components/comment'
import orderBar from '@/components/order-bar'

import replyModular from './components/reply-modular'
import detailContent from './components/detail-content'
import { mapState } from 'vuex'
import { getCommentList } from '@/api/comment'
import { getDetail } from '@/api/detail'

export default {
  name: 'detailIndex',
  components: {
    comment,
    replyModular,
    detailContent,
    orderBar,
  },
  props: ['detailId'],
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      show: false,
      page: 1,
      detailInfo: [],
      detailloading: true,
      order: 'asc',
      isAll: true,
      reply_modular: false,
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      var { data } = await getCommentList({
        id: this.detailId,
        page: this.page,
        order: this.order,
        isAll: this.isAll,
      })

      this.list.push(...data)
      this.page++
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (data.length < 5) {
        this.finished = true
      }
    },
    insertComment($e) {
      this.list.push($e)
    },
    onOrder($e) {
      this.order = $e
      this.page = 1
      this.list = []
      this.onLoad()
      this.finished = false
      this.loading = true
    },
    onCheck($e) {
      this.isAll = $e
      this.page = 1
      this.list = []

      this.onLoad()
      this.finished = false
      this.loading = true
    },
    async loadDetail() {
      const { data } = await getDetail({ id: this.detailId })
      this.detailInfo = data
      this.detailloading = false
    },
    onClose() {
      console.log(this.$refs.closeEL.click())
    },
  },

  created() {
    this.loadDetail()
  },
  mounted() {
    // this.$refs.comment.$el.addEventListener('scroll', this.handleScroll)
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

.comment-list {
}

.footer-bar {
  position: fixed;
  align-items: center;
  bottom: 0;
}
</style>
