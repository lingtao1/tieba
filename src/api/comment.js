
/** 回复api */

import request from '@/utils/request'

/** 新建频道 */
export const addComment = data => {
    return request({
        method:'POST',
        url:'/comment/add',
        data,

    })
}

export const getCommentList = params => {
    return request({
        method:'get',
        url:'/comment/comment',
        showloading:false,
        
        params,

    })
}

export const CommentLike = data => {
    return request({
        method:'post',
        url:'/comment/like',
        data,
    })
}

/** 新建频道 */
export const reply = data => {
    return request({
        method:'POST',
        url:'/comment/reply',
        data,

    })
}



export const getOneComment = params => {
    return request({
        method:'GET',
        url:'/comment/getOneComment',
        params

    })
}

export const getReplyList = params => {
    return request({
        method:'GET',
        url:'/comment/getReplyList',
        showloading:false,
        params
    })
}