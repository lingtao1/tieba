
<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="暂无更多评论"
    loading-text=" "
    @load="onLoad"
    class="comment-list"
    ref="comment"
  >
    <order-bar @onOrder="onOrder" @onCheck="onCheck"></order-bar>
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :data="item"
      :detailId="id"
    ></comment-item>
  </van-list>
</template>

<script>
import { getCommentList } from '@/api/comment'
import commentItem from './comment-item'
import orderBar from '@/components/order-bar'

export default {
  props: ['id'],
  components: {
    orderBar,
    commentItem,
  },

  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      show: false,
      page: 1,
      order: 'asc',
      isAll: true,
      save_id: null,
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据

      var { data } = await getCommentList({
        id: this.id,
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
  },
  created() {},
  mounted() {},
  activated() {
    if (this.id !== this.save_id) {
      // 初始化数据
      Object.assign(this.$data, this.$options.data())
      this.onLoad()
      this.save_id = this.id
    }
  },
}
</script>
<style lang='less' scoped>
</style>
