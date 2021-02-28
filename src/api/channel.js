
/** 频道模块 */

import request from '@/utils/request'


/** 用户请求登录 */
// export const login = data => {
//     return request({
//         method:'POST',
//         url:'/user/login',
//         data
//     })
// }

/** 新建频道 */
export const addChannel = data => {
    return request({
        method:'POST',
        url:'/channel/add',
        headers: {'Content-Type': 'multipart/form-data'},
        data,

    })
}

/*获取频道列表*/
export const getFollowChannel = () => {
    return request({
        method:'GET',
        url:'/channel/getFollowChannel',
        showloading:false,

    })
}

/*获取频道信息*/
export const getChannelInfo = params => {
    return request({
        method:'GET',
        url:'/channel/info',
        params,
        showloading:false
    })
}



export const getHistory = () => {
    return request({
        method:'GET',
        url:'/history/getHistory',
        showloading:false,

    })
}

export const followChannel = data =>{
        return request({
        method:'POST',
        url:'/channel/followChannel',
        // showloading:false,
        data
    })
}

export const deteleHistory = data =>{
        return request({
        method:'POST',
        url:'/history/deteleHistory',
        showloading:false,
        data
    })
}
