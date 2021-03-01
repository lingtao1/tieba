
<template>
  <van-cell
    class="info-item"
    title="单元格"
    label="描述信息"
    @click="
      $router.push(`/detail/${data.detail_id}/comment/${data.comment_id}`)
    "
  >
    <template #icon>
      <van-image
        class="user-image"
        lazy-load
        :src="data.from_image"
        fit="cover"
        round
        @click.stop="$router.push(`/user/${data.from_uid}`)"
      />
    </template>
    <template #title>
      <p class="username">{{ data.from_uname }}</p>
      <p class="reply-content">回复{{ data.to_uname }}：{{ data.content }}</p>
    </template>

    <template #label>
      <p class="detail-title">
        {{ data.comment_content }}
      </p>
      <p class="channel-name">
        {{ data.channel_name }} {{ data.createtime | relativeTime }}
      </p>
    </template>

    <div class="detail-info">
      <div class="detail-image">
        <van-image
          v-if="data.detail_images"
          lazy-load
          class="detail-image"
          :src="data.detail_images"
          fit="cover"
        />
      </div>

      <p class="reply" @click.stop="onClickComment(data.id, data.from_uname)">
        <van-icon name="comment-o" /> 回复
      </p>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'info-item',
  props: ['data'],
  data() {
    return {}
  },
  methods: {
    onClickComment() {
      this.$emit('clickItem', this.data)
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
.info-item {
  display: flex;
  margin: 5px 0;
  .user-image {
    margin-top: 5px;
    width: 40px;
    height: 40px;
  }
  /deep/ .van-cell__title {
    flex: 1;
    padding: 0 10px;
    .channel-name {
      padding-top: 10px;
    }
    .username {
      font-size: 14px;
    }
    .reply-content {
      font-size: 14px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .detail-title {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  /deep/ .van-cell__value {
    flex: unset;
  }
  .detail-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .detail-image {
      width: 50px;
      height: 60px;
    }

    .reply {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
