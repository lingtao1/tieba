
import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store/'
import router from '@/router'
import Cookies from 'js-cookie'


import Vue from 'vue';
import { Toast,Dialog  } from 'vant';


Vue.use(Toast);

var request = axios.create({
    baseURL:'index',
    
    transformResponse:[function(data){
      try{
        return JSONbig.parse(data)
      } catch(err){
        console.log('转换失败',err)
        return data
      }
    }],
    // 控制加载框
    showloading:true,
})


function showLoading (){
  var totas; 
  totas = Toast.loading({
    message: '加载中...',
    forbidClick: true,
  })
  return totas
}


request.interceptors.request.use(config => {
  
  // 发送请求前显示loading动画
  if(config.showloading){
    showLoading ()
  }
    // 在发送请求之前，加入token
    config.headers.Authorization = store.state.user;
    return config; 
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
   request.interceptors.response.use(
     config => {
      if(config.status){
        showLoading().clear()
      }
      return config;
    },
  )

  request.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const { status } = error.response
      showLoading().clear()
      switch (status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit('setUser', null)
          Cookies.remove('token')
          Dialog.confirm({
            title: '用户未登录',
            confirmButtonText:'前往登录'
          })
          .then(() => {
            router.replace({
              path: '/my'
            })
          })
          .catch(() => {

          });
          break;
        case 403:
          store.commit('setUser', null)
          Cookies.remove('token')
          Dialog.confirm({
            title: '当前用户登录信息无效，请重新登录',
            confirmButtonText:'前往登录'
          })
          .then(() => {
            router.replace({
              path: '/my'
            })
          })
          .catch(() => {

          });
          break;
        default:
          showLoading().clear()
          Toast.fail({
            message: '发生了些错误',
            forbidClick: true,
          })

      }
    }

    
  )

export default request