
<template>
  <div class="recommend-index" ref="recommend-index">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      loading-text=" "
      @load="loadRecommendList"
    >
      <detail-item
        v-for="(item, index) in list"
        :key="index"
        :data="item"
      ></detail-item>
    </van-list>
  </div>
</template>

<script>
import detailItem from './detail-item'
import { getRecommendList } from '@/api/detail'
import { debounce } from 'lodash'

export default {
  components: {
    detailItem,
  },
  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      finished: false,
      scrollTop: 0, // 列表滚动到顶部的距离
    }
  },
  methods: {
    async loadRecommendList() {
      const { data } = await getRecommendList({ page: this.page })
      this.list.push(...data)
      this.loading = false
      this.page++

      if (data.length < 5) {
        this.finished = true
      }
    },
  },
  created() {},
  mounted() {
    const recommendIndex = this.$refs['recommend-index']
    recommendIndex.addEventListener(
      'scroll',
      debounce(() => {
        this.scrollTop = recommendIndex.scrollTop
      })
    )
  },
  activated() {
    // 把记录的到顶部的距离重新设置回去
    this.$refs['recommend-index'].scrollTop = this.scrollTop
  },
}
</script>
<style lang='less' scoped>
.recommend-index {
  position: fixed;
  top: 80px;
  bottom: 50px;
  right: 0;
  left: 0;
  overflow-y: auto;
}
</style>
