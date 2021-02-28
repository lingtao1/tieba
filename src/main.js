import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入iconfont
import './comment/iconfont/iconfont.css'

// 引入vant-ui
import Vant from 'vant'

import 'vant/lib/index.css'
Vue.use(Vant)

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
  attempt:0,
})

// 注册时可以配置额外的选项




// 初始化css样式
import '@/styles/base.css'

// 加载全局样式
import '@/styles/index.less'

// 加载rem基准值
import 'amfe-flexible'

// 引入处理时间过滤器
import '@/utils/dayjs'

// input表单获取焦点
Vue.directive('focus', {
// 当被绑定的元素插入到 DOM 中时……
inserted: function (el) {
// 聚焦元素
el.focus()
}
})





import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
