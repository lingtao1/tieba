
<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="暂无更多回复"
      @load="onLoad"
    >
      <van-cell
        class="van-cell-warp"
        v-for="(item, index) in list"
        :key="index"
        @click="onClickReply(item)"
      >
        <div class="comment-item">
          <van-cell :border="false">
            <van-image
              slot="icon"
              class="avatar"
              round
              fit="cover"
              :src="item.image"
              @click.stop="$router.push(`/user/${item.from_uid}`)"
            />
            <p slot="title" class="name">{{ item.name }}</p>
            <p slot="label" class="RDate">
              {{ item.createtime | relativeTime }}
            </p>
          </van-cell>
          <div class="detail-content">
            <p class="text">
              {{ item.reply_type == 'reply' ? `回复 ${item.to_uname}：` : ''
              }}{{ item.content }}
            </p>
          </div>
        </div>
      </van-cell>
    </van-list>

    <van-popup
      v-model="replyItemModuleShow"
      :style="{ width: '100%' }"
      lazy-render
      position="bottom"
      class="reply-item-module"
    >
      <reply-item-module
        v-if="replyItemModuleShow"
        :data="data"
        @onInsert="onInsert"
        type="reply"
      />
    </van-popup>
  </div>
</template>

<script>
import { getReplyList } from '@/api/comment'
import replyItemModule from '../../detail/components/reply-item-module'

export default {
  name: 'replyList',
  props: ['id', 'reply'],
  components: {
    replyItemModule,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      replyItemModuleShow: false,
      data: [],
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getReplyList({ id: this.id, page: this.page })
      this.list.push(...data)
      this.page++
      this.loading = false
      if (data.length < 5) {
        this.finished = true
      }
    },
    onClickReply(item) {
      this.data = item
      this.replyItemModuleShow = true
    },
    onInsert($e) {
      this.list.push($e)
      this.replyItemModuleShow = false
    },
  },
  created() {},
  mounted() {},
  watch: {
    reply(val) {
      this.list.push(val)
    },
  },
}
</script>
<style lang='less' scoped>
.van-cell-warp {
  padding: 0px;
  margin: 0px;
}
/deep/ .van-cell {
  padding: 0px;
  margin: 0px;
}
.comment-item {
  padding: 10px;
  border-radius: 8px;
  background: #fff;
  /deep/ .van-cell {
    background: unset;
  }
  .avatar {
    width: 40px;
    height: 40px;
  }
  p {
    margin-left: 5px;
  }

  /deep/ .van-cell__label {
    margin-top: 0;
  }
  .detail-content {
    // display: -webkit-box;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 5;
    overflow: hidden;
    margin: 15px 0 0;
    padding: 0 10px 10px;

    p {
      font-size: 16px;
    }
  }
}
</style>
