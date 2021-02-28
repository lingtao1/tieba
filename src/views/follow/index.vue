
<template>
  <div>
    <search-bar></search-bar>
    <channels-history />
    <channels-follow />

    <van-popup
      :style="{ width: '100%', height: '100%' }"
      v-model="isBuildshow"
      closeable
      close-icon-position="top-left"
      lazy-render
      position="right"
    >
      <build-channel
        v-if="isBuildshow"
        @onClose="isBuildshow = false"
        @insertChannel="insertChannel"
      ></build-channel>
    </van-popup>

    <!-- <van-cell class="channel-item" @click="isBuildshow = true">
      <div slot="icon">
        <van-image fit="cover" :src="require('./add.jpg')" />
      </div>
      <div slot="title">
        <h1>创建吧</h1>
        <p>创建吧、做吧主11111111</p>
      </div>
    </van-cell> -->
  </div>
</template>

<script>
import buildChannel from './components/build-channel'
import searchBar from '@/components/search-bar'
import channelsFollow from './components/channels-follow'
import channelsHistory from './components/channels-history'

export default {
  name: 'channel',
  components: {
    buildChannel,
    searchBar,
    channelsFollow,
    channelsHistory,
  },

  data() {
    return {
      isBuildshow: false,
      isErrorShow: false,
    }
  },
  methods: {
    insertChannel($e) {
      if ($e.image) {
        $e.image = window.URL.createObjectURL($e.image)
      }
      this.channel.push($e)
    },
  },

  created() {
    console.log(1)
  },
  mounted() {},
}
</script>
<style lang='less' scoped>
</style>
