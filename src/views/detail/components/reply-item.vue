
<template>
  <div>
    <ul class="reply-item">
      <li v-for="(item, index) in data" :key="index">
        <span>{{ item.from_uname }}</span>
        <span v-if="item.reply_type == 'reply'"> 回复 {{ item.to_uname }}</span>
        <span> ：</span>
        <span>{{ item.content }}</span>
      </li>

      <li class="more" v-if="num > 2">
        查看全部{{ num }}条评论 <van-icon class="icon-arrow" name="arrow" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'replyItem',
  props: ['data', 'num'],
  components: {},
  data() {
    return {}
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.reply-item {
  padding: 0 5px;
  background: rgb(236, 236, 236);
  font-size: 13px;
  li {
    padding: 5px 0;
    white-space: normal;
    word-break: break-all;
  }
  .more {
    display: flex;
    align-items: center;
    color: #666;
    .icon-arrow {
      margin-top: 1.5px;
      margin-left: 3px;
    }
  }
}
</style>
