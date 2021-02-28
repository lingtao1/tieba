
<template>
  <div class="build-channel">
    <build-navbar :title="'创建自己喜欢的吧'"> </build-navbar>
    <div class="tips">
      <span class="num">1</span> <span class="text">/ 填写信息</span>
    </div>

    <van-form
      @submit="onSubmit"
      @failed="onFailed"
      ref="form"
      :show-error="false"
      :show-error-message="false"
    >
      <van-field
        label="创建人*"
        v-model="channel['create-username']"
        disabled
        input-align="right"
      />

      <van-field
        label="吧名*"
        v-model="channel.name"
        input-align="right"
        :rules="channelRules.name"
      />

      <van-field label="简介" v-model="channel.synopsis" input-align="right" />

      <van-cell title="吧头像">
        <van-image
          class="load-image"
          fit="cover"
          :src="uploadimage ? uploadimage : require('./loadupdate.jpg')"
          @click="$refs['file-image'].click()"
        />
      </van-cell>
      <input
        type="file"
        @change="onUpdateImage"
        ref="file-image"
        accept="image/*"
        hidden
      />
      <van-button round block type="info" native-type="submit">创建</van-button>
    </van-form>

    <van-popup
      v-model="isImageCroppingShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      class="image-cropping-popup"
    >
      <image-cropping
        :file="toDoimage"
        v-if="isImageCroppingShow"
        @CroppedImage="fnCroppedImage"
        @onClose="isImageCroppingShow = false"
      ></image-cropping>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imageCropping from './image-cropping'
import { addChannel } from '@/api/channel'
import buildNavbar from '@/components/build-navbar'
export default {
  name: 'buildChannel',
  data() {
    return {
      channel: {
        'create-username': null,
        name: null,
        synopsis: null,
        image: null,
      },
      channelRules: {
        name: [
          {
            required: true,
            message: '请填写吧名',
          },
        ],
      },
      isImageCroppingShow: false,
      toDoimage: null,
      uploadimage: null,
    }
  },
  components: {
    imageCropping,
    buildNavbar,
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async onSubmit() {
      let formdata = new FormData()

      for (var item in this.channel) {
        formdata.append(item, this.channel[item])
      }

      try {
        const res = await addChannel(formdata)
        this.$emit('insertChannel', this.channel)
        this.$emit('onClose')
        this.$toast.success('创建成功！')
      } catch (err) {
        this.$toast.fail('创建失败！请稍后再试')
      }
    },
    onFailed(error) {
      //   console.log(error)
      this.$toast({
        message: error.errors[0].message,
        position: 'top',
      })
    },
    onUpdateImage() {
      this.toDoimage = this.$refs['file-image'].files[0]
      this.isImageCroppingShow = true
      // this.isImageCroppingShow = true
      this.$refs['file-image'].value = ''
    },
    fnCroppedImage($e) {
      this.uploadimage = window.URL.createObjectURL($e)
      const file = new window.File([$e], 'myimage.jpg', { type: 'image/*' })
      this.channel.image = file
    },
  },
  created() {
    this.channel['create-username'] = this.user.user
  },
  mounted() {},
}
</script>
<style lang='less' scoped>
.tips {
  margin: 10px 0;
  .num {
    padding-left: 20px;
    font-size: 40px;
  }
  .text {
    font-size: 16px;
  }
}

/deep/ .image-cropping-popup {
  background: #000;
}

.form {
  /deep/ .van-field__label {
    color: #000;
  }
  /deep/ .van-field__value {
    border-bottom: 1px solid #323233;
  }

  .load-image {
    width: 100px;
    height: 100px;
  }
}
</style>
