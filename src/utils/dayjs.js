
// 引入dayjs 
import Vue from 'vue'
import dayjs from 'dayjs'

// 设置中文
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

Vue.filter('relativeTime',value=>{
   return   dayjs().from(value)
})