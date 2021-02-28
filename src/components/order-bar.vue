
<template>
  <div class="order-bar">
    <div class="content">
      <div
        class="all"
        :class="{ active: active == 'all' ? true : false }"
        @click="onClick('all')"
      >
        全部回复
      </div>
      <div
        class="justlook"
        :class="{ active: active == 'justlook' ? true : false }"
        @click="onClick('justlook')"
      >
        只看楼主
      </div>
    </div>
    <!-- <select class="order" @change="onChange" v-model="order">
      <option value="acs">按照时间正叙</option>
      <option value="desc">按照时间倒叙</option>
    </select> -->
    <div class="order">
      <div class="text" @click="orderShow = !orderShow">
        {{ `按照时间${order == 'acs' ? '正序' : '倒叙'}` }}
      </div>
      <div class="select" v-show="orderShow">
        <div
          class="value"
          :class="order == 'acs' ? 'value_active' : ''"
          @click="onClickOrder('acs')"
        >
          按照时间正叙
        </div>
        <div
          class="value"
          @click="onClickOrder('desc')"
          :class="order == 'desc' ? 'value_active' : ''"
        >
          按照时间倒叙
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      order: 'acs',
      active: 'all',
      orderShow: false,
    }
  },
  methods: {
    onClickOrder(sort) {
      console.log(sort)
      this.order = sort
      this.$emit('onOrder', this.order)
      this.orderShow = false
    },
    onClick(name) {
      if (this.active == name) return false
      this.active = name
      this.$emit('onCheck', name == 'all' ? true : false)
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.order-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  background-color: #fff;
  font-size: 14px;
  .content {
    display: flex;
    align-items: center;

    .all,
    .justlook {
      margin-left: 10px;
    }
  }

  .order {
    position: relative;
    border: 0;
    background: unset;
    outline: unset;
    margin-right: 25px;

    font-size: 14px;
    .text::after {
      position: absolute;
      top: 7px;
      right: -13px;
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 5px solid black;
      border-bottom: 5px solid transparent;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }
    .select {
      position: absolute;
      top: 100%;
      left: -10px;
      // padding: 0 10px;
      background: #fff;
      z-index: 9;
      .value {
        box-sizing: content-box;
        width: 90px;
        padding: 10px;
      }
      .value:active {
        background: rgb(245, 245, 245);
      }
      .value_active {
        color: #1989fa;
      }
    }
  }

  .active {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
