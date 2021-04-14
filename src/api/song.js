import request from "./http"

//获取歌单详情
export function get(params) {
    return request({
        url:"",
        method:"get",
        params
    })
}

//获取歌曲详情
export function getSongDetail(params) {
    return request({
        url:"/song/detail",
        method:"get",
        params
    })
}

//获取歌曲url
export function getSongUrl(params) {
    return request({
        url:"/song/url",
        method:"get",
        params
    })
}

// 获取歌词
export function getSongLyric(params){
    return request({
        url:"lyric",
        method:"get",
        params
    })
}

