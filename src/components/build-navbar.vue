
<template>
  <div class="all">
    <h1>
      <slot>{{ title }}</slot>
    </h1>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {}
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
all {
  text-align: center;
}
h1 {
  padding: 6px 0 8px;
  text-align: center;
  font-size: 18px;
  font-weight: normal;
  background: #1989fa;
  color: #fff;
}

.title-warp {
  display: inline-block;
  max-width: 150px;
  overflow: hidden;
  height: 21px;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* text-align: center; */
  margin: 0 auto;
}
</style>
