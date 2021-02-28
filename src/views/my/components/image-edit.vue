
<template>
  <div class="image-edit">
    <div class="image-cropping">
      <img :src="image" alt="" ref="myimage" />
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  props: ['image'],
  data() {
    return {}
  },
  components: {
    buildNavbar,
  },
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
</style>
