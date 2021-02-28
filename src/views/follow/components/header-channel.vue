
<template>
  <van-cell class="header" :border="false" center :title="title">
    <div class="default-warp">
      <van-icon
        name="ellipsis"
        class="modify"
        @click="isEditShow = !isEditShow"
      />
      <div class="select" v-show="isEditShow">
        <p
          class="select-item"
          v-for="(item, index) in fn"
          :key="index"
          @click="
            $emit(`fn${index + 1}`)
            isEditShow = false
          "
        >
          {{ item }}
        </p>
      </div>
    </div>
  </van-cell>
</template>

<script>
export default {
  props: {
    title: {},
    fn: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      isEditShow: false,
    }
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.header {
  padding: 5px 15px;
  margin: 8px 0 0;
  background: transparent;
  overflow: unset;
  /deep/ .van-cell__value {
    overflow: unset;
    line-height: 0;
  }
  .modify {
    font-size: 20px;
    color: #000;
  }
  .default-warp {
    position: relative;
    .select {
      z-index: 9999999;
      position: absolute;
      top: 22px;
      right: 0;
      background: #fff;
      border-radius: 5px;
      box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);

      .select-item {
        width: 80px;
        border-bottom: 1px solid rgba(224, 224, 224, 0.5);
        font-size: 12px;
        text-align: center;
        line-height: 3;
        color: #000;
      }
      .select-item:last-child {
        border: 0;
      }
    }
  }
}
</style>
