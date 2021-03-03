
<template>
  <div class="search-result">
    <div class="no-find" v-if="nofind">
      <van-image :src="require('./404.png')"></van-image>
    </div>
    <div v-else>
      <div class="channel-mod">
        <van-cell
          v-if="channels.channelInfo"
          :icon="channels.channelInfo.image"
          :title="channels.channelInfo.name"
          :label="channels.channelInfo.synopsis"
          class="channel-banner"
          @click="$router.push(`/forum/${channels.channelInfo.id}`)"
        />
        <div class="channel-order" v-if="channels.channelItem">
          <van-cell
            v-for="(item, index) in channels.channelItem"
            :key="index"
            :icon="item.image"
            :title="item.name"
            label="接口连接上来看"
            class="channel-item"
            @click="$router.push(`/forum/${item.id}`)"
          />
        </div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多帖子"
        loading-text=" "
        @load="onLoadList"
        class="detail-list"
      >
        <detail-item
          v-for="(item, index) in list"
          :key="index"
          :id="item.id"
          :uid="item.user_id"
          :avatar="item.user_image"
          :name="item.channel_name"
          :time="item.createtime"
          :title="item.title"
          :content="item.content"
          :images="item.images"
          :commentnum="item.num"
          :cname="item.channel_name"
          :likenum="item.like_num"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import detailItem from '@/components/detail-item'
import { getResultList, getResultChannels } from '@/api/search'

export default {
  name: 'search-result',
  components: {
    detailItem,
  },
  props: ['value'],
  data() {
    return {
      list: [],
      channels: [],
      loading: false,
      finished: false,
      nofind: false,
      page: 1,
    }
  },
  methods: {
    async onLoadList() {
      const { data } = await getResultList({
        keyword: this.value,
        page: this.page,
      })

      this.list.push(...data)
      this.page++

      this.loading = false

      // 数据全部加载完成
      if (data.length < 3) {
        this.finished = true
      }
    },
    async onLoadChannels() {
      const { data } = await getResultChannels({
        keyword: this.value,
      })
      this.channels = data
    },
  },
  created() {
    this.onLoadChannels()
  },
  mounted() {},
}
</script>
<style lang='less' scoped>
.no-find {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  /deep/ .van-image {
    width: 280px;
  }
}

.search-result {
}
.channel-mod {
  .channel-banner {
    padding: 10px 20px;
    /deep/ .van-icon {
      height: 45px;
      width: 45px;
      /deep/ .van-icon__image {
        width: 100%;
        height: 100%;
      }
    }
    /deep/ .van-cell__title {
      margin-left: 10px;
      font-size: 14px;
      overflow: hidden;
      /deep/ .van-cell__label {
        margin-top: 4px;
        overflow: hidden;
        font-size: 12px;
      }
    }
  }

  .channel-order {
    display: flex;

    .channel-item {
      width: 50%;
      /deep/ .van-cell__title {
        margin-top: -2px;
        margin-left: 0px;
        font-size: 12px;
        transform: scale(0.8);
      }
      /deep/ .van-icon {
        height: 40px;
        width: 40px;
        /deep/ .van-icon__image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
