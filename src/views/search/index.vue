
<template>
  <div class="search-index">
    <form action="/">
      <van-search
        v-model="val"
        show-action
        placeholder="请输入搜索关键词"
        clearable
        shape="round"
        class="search-input"
        @search="onSearch"
        @cancel="$router.back()"
        @input="isResultShow = false"
      />
    </form>
    <div class="search-content">
      <div v-show="val.length == 0">
        <search-history
          @onHistorySearch="onHistory($event)"
          :searchHistory="searchHistory"
        ></search-history>
      </div>
      <div v-if="val.length > 0">
        <search-result v-if="isResultShow" :value="val"></search-result>
        <search-suggest
          v-else
          :value="val"
          @search="onSuggest($event)"
        ></search-suggest>
      </div>
    </div>
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import searchSuggest from './components/search-suggest'

export default {
  name: 'search-index',
  components: {
    searchHistory,
    searchResult,
    searchSuggest,
  },
  data() {
    return {
      val: '',
      isResultShow: false,
      searchHistory: '',
    }
  },
  methods: {
    onClickClear() {
      this.val = ''
      this.$refs.search.focus()
    },

    onSuggest(e) {
      this.val = e
      this.onSearch()
    },

    onHistory(e) {
      this.val = e
      this.onSearch()
    },

    async onSearch(val) {
      this.searchHistory = this.val
      this.isResultShow = true
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.search-index {
}
.search-input {
  /deep/ .van-search__action {
    padding: 0 20px 0 15px;
    font-size: 16px;
  }
}

.search-content {
  margin-top: 10px;
}
</style>
