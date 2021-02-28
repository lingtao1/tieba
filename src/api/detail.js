
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
export const addDetail = data => {
    return request({
        method:'POST',
        url:'/detail/add',
        headers: {'Content-Type': 'multipart/form-data'},
        data,

    })
}

/*获取频道列表*/
export const getDetailList = params => {
    return request({
        method:'GET',
        url:`/detail/getDetailList`,
        showloading:false,
        params
    })
}

/*获取频道列表*/
export const likeDetail = params => {
    return request({
        method:'GET',
        url:`/detail/like`,
        params
    })
}

export const getRecommendList = params => {
    return request({
        method:'GET',
        url:`/detail/getRecommendList`,
        params,
        showloading:false,
    })
}

export const getDetail = params =>  {
        return request({
        method:'GET',
        url:`/detail/getOneDetail`,
        showloading:false,
        params
    })
}