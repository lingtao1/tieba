
<template>
  <div class="userinfo-edit">
    <build-navbar title="个人信息"></build-navbar>
    <div class="list">
      <van-cell class="item" title="头像" center @click="onClickEditImage">
        <div class="content">
          <van-image class="image" fit="cover" :src="this.userInfo.image" />
          <van-icon class="icon" name="arrow" />
          <input
            type="file"
            hidden
            ref="image"
            @change="fileChannge"
            accept="image/*"
          />
        </div>
      </van-cell>
      <van-cell class="item" title="性别" center @click="isEditSexShow = true">
        <div class="content">
          <p>{{ this.userInfo.sex }}</p>
          <van-icon class="icon" name="arrow" />
        </div>
      </van-cell>
    </div>

    <van-popup
      v-model="isEditSexShow"
      :style="{ width: '100%', height: '50%' }"
      lazy-render
      position="bottom"
    >
      <sex-edit
        v-if="isEditSexShow"
        @onClose="isEditSexShow = false"
        @onSexChange="userInfo.sex = $event"
        :sex="userInfo.sex"
      ></sex-edit>
    </van-popup>

    <van-popup
      v-model="isImageCroppingShow"
      position="bottom"
      :style="{ height: '100%', background: '#000' }"
      closeable
      close-icon-position="top-left"
    >
      <image-cropping
        v-if="isImageCroppingShow"
        :file="image"
        @CroppedImage="CroppedImage"
        @onClose="isImageCroppingShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import buildNavbar from '@/components/build-navbar'
import sexEdit from './sex-edit'
import imageCropping from '../../follow/components/image-cropping'
import { getUserinfoEdit, updateUserImage } from '@/api/user'

export default {
  name: 'userinfoEdit',
  components: {
    buildNavbar,
    sexEdit,
    imageCropping,
  },
  data() {
    return {
      isEditSexShow: false,
      isImageCroppingShow: false,
      image: null,
      userInfo: [],
    }
  },
  methods: {
    async loadUserinfo() {
      const { data } = await getUserinfoEdit()
      this.userInfo = data
    },
    onClickEditImage() {
      this.$refs.image.click()
    },
    fileChannge() {
      this.image = this.$refs.image.files[0]
      this.isImageCroppingShow = true
      this.$refs.image.value = ''
    },
    async CroppedImage($e) {
      const file = new window.File([$e], 'myimage.jpg', { type: 'image/*' })

      const form = new FormData()
      form.append('image', file)

      const { data } = await updateUserImage(form)
      this.userInfo.image = window.URL.createObjectURL($e)
    },
  },
  created() {
    this.loadUserinfo()
  },
  mounted() {},
}
</script>
<style lang='less' scoped>
.userinfo-edit {
  font-style: 16px;
}
.item {
  .content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #000;
    .image {
      width: 60px;
      height: 60px;
      border-radius: 6px;
      overflow: hidden;
    }
    .icon {
      margin-left: 10px;
    }
  }
}
</style>
