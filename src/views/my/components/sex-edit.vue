
<template>
  <div>
    <van-picker
      class="picker-warp"
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { channgeUserSex } from '@/api/user'
export default {
  props: ['sex'],
  data() {
    return {
      columns: [
        {
          values: ['男', '女', '保密'],
          defaultIndex: 0,
        },
      ],
    }
  },
  methods: {
    async onConfirm(value, index) {
      if (this.sex == value[0]) {
        this.onCancel.apply(this)
      }

      try {
        console.log(value[0])
        await channgeUserSex({ sex: value[0] })
        this.onCancel.apply(this)
        this.$emit('onSexChange', value[0])
      } catch (err) {
        console.log(err)
      }
    },
    onCancel() {
      this.$emit('onClose')
    },
    channgeColumnsIndex() {
      this.columns[0].values.forEach((item, index) => {
        if (item == this.sex) this.columns[0].defaultIndex = index
      })
    },
  },
  created() {
    this.channgeColumnsIndex()
  },
  mounted() {},
}
</script>
<style lang='less' scoped>
.picker-warp {
  /deep/ button {
    font-size: 14px;
  }
}
</style>
