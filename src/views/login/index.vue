
<template>
  <div class="login-index">
    <van-nav-bar
      class="nav-bar"
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <van-form
      :show-error="false"
      :show-error-message="false"
      @submit="onSubmit"
      @failed="onFailed"
      class="login-form"
    >
      <van-field
        v-model="loginInfo.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="formRoules.username"
      />
      <van-field
        v-model="loginInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="formRoules.password"
      />
      <div style="margin: 16px">
        <van-button class="submit-btn" block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
import Cookies from 'js-cookie'

export default {
  name: 'loginIndex',
  data() {
    return {
      loginInfo: {
        username: null,
        password: null,
      },
      formRoules: {
        username: [
          {
            required: true,
            message: '请填写用户名',
            pattern: /^[A-Za-z0-9]{6,20}$/,
          },
        ],
        password: [
          {
            required: true,
            message: '请填写用户名',
            pattern: /^[A-Za-z0-9]{6,12}$/,
          },
        ],
      },
    }
  },
  methods: {
    async onSubmit() {
      // 开启等待提示框
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0, //展示时长(ms)，值为 0 时，toast 不会消失
      })

      try {
        const { data } = await login(this.loginInfo)
        console.log(data)
        Cookies.set('token', data.token)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.token)
        this.$router.back()
      } catch (err) {
        this.$toast.fail('用户名或者密码错误')
      }
    },
    onFailed(error) {
      //   console.log(error)
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
.login-form {
  margin-top: 30px;
  .submit-btn {
    margin: 100px 0;
    border-radius: 8px;
  }
  /deep/ .van-field__label {
    width: 50px;
  }
}
</style>
