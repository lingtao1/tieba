import Vue from 'vue'
import Vuex from 'vuex'
// 引入js-cookie 方便操作cookie
import Cookies from 'js-cookie'
Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    user: Cookies.get('token') || '', // 获取本地存储 判断用户是否登录
    cachePages: ['layoutIndex','searchIndex','detailIndex','forumIndex','userIndex']

  },
  mutations: {
    setUser(state,data){
      state.user = data;
    },

    // 添加缓存页面
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },

    // 移除缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
      console.log('remove',state.cachePages);
    }


  },
  actions: {
  },
  modules: {
  },

})
