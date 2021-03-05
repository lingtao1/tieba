
<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <detail-item
      v-for="(item, index) in list"
      :key="index"
      :info="info"
      :data="item"
    />
  </van-list>
</template>

<script>
import { getUserPost } from '@/api/user'
import detailItem from './detail-item'
export default {
  props: ['info', 'id'],
  components: {
    detailItem,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      uid: 0,
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getUserPost({ id: this.id, page: this.page })
      this.list.push(...data)
      this.page++
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (data.length < 3) {
        this.finished = true
      }
    },
  },
  created() {},
  activated() {
    if (this.uid !== this.id) {
      this.list = []
      this.loading = false
      this.finished = false
      this.page = 1
      this.onLoad()
      this.uid = this.id
    }
  },
}
</script>
<style lang='less' scoped>
</style>
