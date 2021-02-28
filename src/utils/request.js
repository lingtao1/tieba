
import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store/'

import Vue from 'vue';
import { Toast } from 'vant';

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

  request.interceptors.response.use(config => {
    if(config.status){
      showLoading().clear()
    }
    return config;
  })

export default request