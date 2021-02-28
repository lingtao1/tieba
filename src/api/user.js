
/** 用户模块 */

import request from '@/utils/request'


/** 用户请求登录 */
export const login = data => {
    return request({
        method:'POST',
        url:'/user/login',
        data
    })
}

/** 用户请求登录 */
export const getUserProfile = () => {
    return request({
        method:'GET',
        url:'/user/profile',
        showloading:false,
      
    })
}

export const getUserInfo = params =>{
        return request({
        method:'GET',
        url:'/user/getUserInfo',
        showloading:false,
        params
      
    })
}

/** 获取用户编辑信息 */
export const getUserinfoEdit = () => {
    return request({
        method:'GET',
        url:'/user/getUserinfoEdit'
    })
}

export const channgeUserSex = data=> {
    return request({
        method:'POST',
        url:'/user/channgeUserSex',
        data
    })
}

export const updateUserImage = data => {
    return request({
        method:'POST',
        url:'/user/updateUserImage',
        headers: {'Content-Type': 'multipart/form-data'},
        data
    })
}


export const getUserPost = params => {
    return request({
        method:'POST',
        url:'/user/getUserPost',
        params,
        showloading:false
    })
}

