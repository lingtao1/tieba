
<template>
  <div class="search-suggest">
    <van-cell
      v-for="(item, index) in list"
      center
      :key="index"
      @click="onSearch(item.title)"
      icon="search"
      :title="item.title"
      class="item"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggest } from '@/api/search'
export default {
  name: 'search-suggest',
  props: ['value'],
  data() {
    return {
      list: [],
    }
  },
  methods: {
    onSearch(val) {
      console.log(val)
      this.$emit('search', val)
    },
  },
  watch: {
    value: {
      handler: debounce(async function (val) {
        const { data } = await getSuggest({ keyword: val })
        this.list = data
      }, 1000),
      immediate: true,
    },
  },

  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.search-suggest {
  padding: 0 20px;
}
.item {
  box-sizing: border-box;
  padding: 8px 0;
  background: unset;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  /deep/ .van-cell__title {
    margin-left: 5px;
  }
}
</style>
