
<template>
  <div class="build-details">
    <build-navbar :title="name"> </build-navbar>

    <van-form
      @submit="onSubmit"
      @failed="onFailed"
      :show-error-message="false"
      :show-error="false"
    >
      <van-field
        v-model="detail.title"
        placeholder="请输入标题"
        :rules="[{ required: true, message: '请填写标题' }]"
      />
      <van-field
        v-model="detail.content"
        placeholder="请输入内容"
        :rules="[{ required: true, message: '请填写内容' }]"
        rows="5"
        autosize
        type="textarea"
      >
      </van-field>

      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader
            v-model="detail.images"
            :max-count="9"
            multiple
            accept="image/*"
          />
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >发布</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import buildNavbar from '@/components/build-navbar'
import { addDetail } from '@/api/detail'
import { mapState } from 'vuex'

export default {
  name: 'buildDetails',
  props: ['forumId', 'name'],
  components: {
    buildNavbar,
  },
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      detail: {
        title: '',
        content: '',
        images: [],
      },
    }
  },
  methods: {
    async onSubmit() {
      var form = this.ProcessingDetail()
      try {
        const { data } = await addDetail(form)
        this.$emit('insertDetail', data)
        this.$emit('onClose')
      } catch (err) {
        if (this.user) {
          this.$toast.fail('发生了一些错误，请稍后尝试')
        } else {
          this.$toast.fail('当前未登录，请登录')
        }
      }
    },
    ProcessingDetail() {
      var form = new FormData()
      for (var item in this.detail) {
        form.append(item, this.detail[item])
        if (item == 'images') {
          for (var imags in this.detail[item]) {
            form.append('images[]', this.detail[item][imags].file)
          }
        }
      }
      form.append('parent_id', this.forumId)
      return form
    },
    onFailed(error) {
      this.$toast({
        message: error.errors[0].message,
        position: 'top',
      })
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang='less' scoped>
/deep/ .van-uploader__wrapper {
  flex-wrap: unset;
}
</style>
