import request from "./http"

//排行榜
export function getTopList(params) {
    return request({
        url:"/toplist",
        method:"get",
        params
    })
}

//排行榜歌曲
export function getTopListsDetail(params) {
    return request({
        url:"/playlist/detail",
        method:"get",
        params
    })
}