
<template>
  <div>
    <search-bar></search-bar>
    <div v-if="$store.state.user">
      <channels-history />
      <channels-follow />

      <van-image
        :src="require('./add.jpg')"
        round
        class="channel-add"
        @click="isBuildshow = true"
      ></van-image>
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
    </div>

    <not-logged-in v-else />
  </div>
</template>

<script>
import buildChannel from './components/build-channel'
import searchBar from '@/components/search-bar'
import channelsFollow from './components/channels-follow'
import channelsHistory from './components/channels-history'
import notLoggedIn from '@/components/not-logged-in'
export default {
  name: 'channel',
  components: {
    buildChannel,
    searchBar,
    channelsFollow,
    channelsHistory,
    notLoggedIn,
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

  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.channel-add {
  position: fixed;
  top: 65%;
  right: 5%;
  background: red;
  width: 50px;
  height: 50px;
}
</style>
