
<template>
  <div>
    <div class="hedaer-warp">
      <header-channel title="我的关注" :fn="followFn" @fn1="edit" />
      <div class="edit" v-show="isEditShow" @click="done">完成</div>
    </div>
    <van-skeleton
      :row="5"
      :row-width="'101%'"
      class="skeleton"
      :loading="loading"
      :animate="false"
    >
      <van-cell-group class="channel-warp">
        <draggable
          v-model="channel"
          chosenClass="chosen"
          forceFallback="true"
          group="people"
          animation="100"
          @start="onStart"
          @end="deteleDisabled = false"
          @update="onUpdate"
          :disabled="disabled"
        >
          <transition-group>
            <channel-item
              :disabled="deteleDisabled"
              class="channel-item-warp"
              v-for="item in channel"
              :key="item.id"
              :data="item"
              :isEditShow="isEditShow"
              @open="disabled = true"
              @close="disabled = false"
            ></channel-item>
          </transition-group>
        </draggable>
      </van-cell-group>
    </van-skeleton>
  </div>
</template>

<script>
import channelItem from './channels-item'
import draggable from 'vuedraggable'
import { getFollowChannel } from '@/api/channel'
import headerChannel from './header-channel'
export default {
  name: 'channels-follow',
  components: {
    channelItem,
    draggable,
    headerChannel,
  },
  data() {
    return {
      channel: [],
      drag: false,
      loading: true,
      followFn: ['编辑'],
      isEditShow: false,
      disabled: true,
      deteleDisabled: true,
    }
  },
  methods: {
    onStart(e) {
      console.log(e)
      this.deteleDisabled = true
    },
    onUpdate() {
      console.log(this.channel)
    },
    edit() {
      this.isEditShow = true
      this.disabled = false
      this.deteleDisabled = false
    },
    done() {
      this.isEditShow = false
      this.disabled = true
      this.deteleDisabled = true
    },
    async loadChannel() {
      try {
        const { data } = await getFollowChannel()
        this.channel = data
        this.loading = false
      } catch (err) {
        this.isErrorShow = true
      }
    },
  },
  created() {
    this.loadChannel()
  },
  mounted() {},
}
</script>
<style lang='less' scoped>
.hedaer-warp {
  position: relative;
  .edit {
    position: absolute;
    right: 13px;
    top: 5px;
    margin-top: 3px;
    background: rgb(245, 245, 248);
    font-size: 12px;
    color: rgb(49, 118, 245);
  }
}
.channel-warp {
  flex-wrap: wrap;
  background: transparent;
  overflow: hidden;
  .channel-item-warp {
    cursor: move;
  }
}
.skeleton {
  margin: 0;
  padding: 0;
  background: transparent;
  .van-skeleton__content {
    overflow: hidden;
    .van-skeleton__row {
      margin: 0;
      height: 50px;
      background: rgb(240, 240, 240);
    }
  }
}
</style>
