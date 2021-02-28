
/** 搜索模块 */

import request from '@/utils/request'

export const getHistory = ()=>{
    return  request({
        method:'GET',
        url:`/search/getHistory`,
    })
}

export const getSuggest = params =>{
    return request({
        method:'GET',
        url:'/search/getSuggest',
        showloading:false,
        params
    })
}

export const getResultList = params =>{
    return request({
        method:'GET',
        url:'/search/getResultList',
        params,
        showloading:false,

    })
}

export const getResultChannels = params =>{
    return request({
        method:'GET',
        url:'/search/getResultChannels',
        params
    })
}

export const deteleAllHistory = () =>{
    return request({
        method:"GET",
        url:'/search/deteleAllHistory',
        showloading:false,
        
    })
}

export const deteleOneHistory = params =>{
    return request({
        method:"GET",
        url:'/search/deteleOneHistory',
        showloading:false,
        params
    })
}

