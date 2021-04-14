import request from "./http"

export function getBanner(newurl) {
    return request({
        url: newurl,
        method:'get',
    })
}

//获取歌单详情
export function getDetail(params) {
    return request({
        url:"playlist/detail",
        method:"get",
        params
    })
}

// 获取歌单评论
export function getCommentLists(params){
    return request({
        url:"/comment/playlist",
        method:"get",
        params
    })
}

//最新音乐
export function getNewsong() {
    return request({
        url: "/personalized/newsong",
        method:'get',
    })
}