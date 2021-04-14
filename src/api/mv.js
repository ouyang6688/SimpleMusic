import request from "./http";

// 获取url
export function getMvlist(params) {
    return request({
        url:"mv/exclusive/rcmd",
        method:"get",
        params
    })
}

// 获取mv视频
export function getMvUrl(params) {
    return request({
        url:"mv/url",
        method:"get",
        params
    })
}