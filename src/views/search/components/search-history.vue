
<template>
  <div class="search-history">
    <h1 class="history-header" v-if="list.length > 0">
      <span>历史记录</span>
      <div class="edit">
        <div v-if="isEidt">
          <van-icon
            class="icon-delete"
            @click="deteleAllHistory"
            name="delete-o"
          />
          <van-button
            class="edit-btn"
            type="default"
            size="mini"
            @click="isEidt = false"
            >完成</van-button
          >
        </div>

        <van-button
          v-else
          class="edit-btn"
          type="default"
          size="mini"
          @click="isEidt = true"
          >编辑</van-button
        >
      </div>
    </h1>
    <ul class="history-container">
      <li class="history-item" v-for="(item, index) in list" :key="index">
        <div
          @click="isEidt ? deteleOneHistory(item, index) : onClickSearch(item)"
        >
          {{ item }}
        </div>
        <van-icon v-if="isEidt" name="close" class="icon-close" />
      </li>
    </ul>
  </div>
</template>

<script>
import { getHistory, deteleAllHistory, deteleOneHistory } from '@/api/search'
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'search-history',
  props: ['searchHistory'],
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      list: [],
      isEidt: false,
    }
  },
  methods: {
    async deteleAllHistory() {
      try {
        await deteleAllHistory()
        this.list = []
        this.isEidt = false
      } catch (err) {}
    },
    async loadHistory() {
      if (this.user) {
        var { data } = await getHistory()
      } else {
        var data = JSON.parse(Cookies.get('user-history'))
      }
      this.list = data
    },
    async deteleOneHistory(value, index) {
      var list = this.list
      this.list.splice(index, 1)

      if (this.user) {
        try {
          await deteleOneHistory({ value })
        } catch (err) {
          this.list = list
        }
      } else {
        Cookies.set('user-history', this.list)
      }

      if (this.list.length == 0) {
        this.isEidt = false
      }
    },
    onClickSearch(item) {
      this.$emit('onHistorySearch', item)
    },
  },
  created() {
    this.loadHistory()
  },
  mounted() {},
  watch: {
    searchHistory() {
      this.list.unshift(this.searchHistory)
      this.list = this.list.filter((item, index, array) => {
        return array.indexOf(item, 0) == index
      })
      if (!this.user) {
        Cookies.set('user-history', this.list)
      }
    },
  },
}
</script>
<style lang='less' scoped>
.search-history {
  padding: 10px;
  .edit {
    position: relative;
    height: 10px;
    width: 40px;
    .edit-btn {
      font-size: 12px;
      padding: 10px 5px;
      background: unset;
      border: 1px solid #000;
      transform: scale(0.8);
    }
    .icon-delete {
      font-size: 15px;
      position: absolute;
      top: 10px;
      right: 45px;
    }
  }
}
.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: normal;
  font-size: 16px;
}

.history-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  .history-item {
    position: relative;
    padding: 3px 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 12px;
    font-size: 14px;
    .icon-close {
      position: absolute;
      top: -4px;
      right: -5px;
      color: #000;
    }
  }
}
</style>
