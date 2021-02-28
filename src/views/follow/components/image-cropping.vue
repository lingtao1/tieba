
<template>
  <div>
    <div class="image-cropping">
      <img :src="image" alt="" ref="myimage" />
    </div>
    <van-nav-bar
      class="navbar-warp"
      right-text="确认"
      @click-right="onClickCommit"
    />
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'imageCropping',
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null,
    }
  },
  props: {
    file: {
      required: true,
    },
  },
  methods: {
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        }, 'image/jpeg')
      })
    },
    async onClickCommit() {
      const file = await this.getCroppedCanvas()
      this.$emit('CroppedImage', file)
      this.$emit('onClose')
    },
  },
  created() {
    this.$nextTick(() => {
      var image = this.$refs.myimage
      this.cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        viewMode: 1,
        autoCrop: true,
        autoCropArea: 0.8,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        dragMode: 'move',
      })
    })
  },
  mounted() {},
}
</script>
<style lang='less' scoped>
.image-cropping {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
img {
  display: block;
  min-width: 100%;
  max-width: 375px;
}
.navbar-warp {
  position: fixed;
  bottom: 0px;
  width: 375px;
  background-color: #000;
  /deep/ .van-nav-bar__text {
    color: #fff;
    display: block;
    padding: 5px 10px;
    margin: 0 10px 30px 0;
    background-color: #1989fa;
    border-radius: 5px;
  }
}
</style>
