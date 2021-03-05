
<template>
  <div class="hedaer-warp" v-show="list.length">
    <header-channel
      title="最近逛的吧"
      :fn="historyFn"
      @fn1="isShow = !isShow"
      @fn2="isEdit = !isEdit"
    />
    <div class="icon-show" v-show="!isShow" @click="isShow = !isShow">
      <van-icon name="eye" />
    </div>
    <div class="icon-show" v-show="isEdit" @click="isEdit = !isEdit">
      <p>完成</p>
    </div>
    <van-skeleton class="skeleton" title :loading="loading" :animate="false">
      <transition name="v">
        <div v-show="isShow" class="transition-box">
          <swiper ref="mySwiper" :options="swiperOptions" class="swiper-warp">
            <swiper-slide
              v-for="(item, index) in list"
              :key="index"
              class="swiper-item-warp"
            >
              <history-item :data="item" @click.native="onClick(item, index)" />
              <van-icon name="clear" class="icon-clear" v-show="isEdit" />
            </swiper-slide>
          </swiper>
        </div>
      </transition>
    </van-skeleton>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import historyItem from './history-item'
import headerChannel from './header-channel'
import { getHistory, deteleHistory } from '@/api/channel'
export default {
  name: 'history-list',
  components: {
    Swiper,
    SwiperSlide,
    historyItem,
    headerChannel,
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        freeMode: true,
        freeModeMomentum: false,
      },
      historyFn: ['隐藏', '编辑'],
      list: [],
      isShow: true,
      isEdit: false,
      loading: true,
    }
  },
  methods: {
    async loadHistory() {
      var { data } = await getHistory()
      data = data.filter((item) => {
        item.name = item.name.replace('吧', '')
        return item
      })
      this.list = data

      this.loading = false
    },
    onClick(item, index) {
      if (this.isEdit) {
        this.list.splice(index, 1)
        this.deteleHistory(item.history_id)
      } else {
        this.$router.push(`/forum/${item.id}`)
        this.list.splice(index, 1)
        this.list.unshift(item)
      }
    },
    async deteleHistory(id) {
      await deteleHistory({ id })
    },
  },
  created() {},
  mounted() {},
  activated() {
    this.loadHistory()
  },
}
</script>
<style lang='less' scoped>
.hedaer-warp {
  position: relative;

  .icon-show {
    position: absolute;
    background: rgb(245, 245, 248);
    right: 13px;
    top: 5px;
    font-size: 22px;
    // z-index: 999999;
    p {
      margin-top: 3px;
      color: rgb(49, 118, 245);
      font-size: 12px;
    }
  }
}

.swiper-item-warp {
  position: relative;
  .icon-clear {
    position: absolute;
    top: -7px;
    right: -4px;
    font-size: 18px;
    color: rgb(218, 47, 47);
  }
}

.swiper-warp {
  padding: 10px;
  /deep/ .swiper-slide {
    width: unset;
    box-sizing: content-box;
    margin: 0 3px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);
  }
}

.skeleton {
  // background: red;
  height: 167px;
  padding: 10px;
  margin-left: 4px;
  /deep/ .van-skeleton__title {
    // margin: 10px;
    width: 120px;
    height: 147px;
    background: rgb(240, 240, 240);
  }
  /deep/ .van-skeleton__title:before {
    // margin: 10px;
    position: absolute;
    left: 139px;
    content: '';
    display: block;
    width: 120px;
    height: 147px;
    background: rgb(240, 240, 240);
  }
  /deep/ .van-skeleton__title::after {
    // margin: 10px;
    position: absolute;
    left: 264px;
    content: '';
    display: block;
    width: 120px;
    height: 147px;
    background: rgb(240, 240, 240);
  }
}

.draw-enter-active,
.draw-leave-active {
  transition: all 2s ease;
}
.draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter, .v-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  // transform: translate3d(0, 3rem, 0);
  // opacity: 0;
  height: 0 !important;
}

.transition-box {
  height: 167px;
  overflow: hidden;
}
</style>
