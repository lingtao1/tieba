import request from '@/utils/request'

export const getInformationList = params => {
    return request({
        method:'GET',
        url:'/information/getInformationList',
        showloading:false,
        params
    })
}