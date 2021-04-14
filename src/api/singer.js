import request from "./http"

//获取歌手
export function getArtistLists(params) {
    return request({
        url:"/artist/list",
        method:"get",
        params
    })
}

export function getTopArtistLists(parmas) {
    return request({
        url:"/top/artists",
        method:"get",
        parmas
    })
}

export function getArtists(params) {
    return request({
        url:"/artists",
        method:"get",
        params
    })
}

export function getMusicLists(params) {
    return request({
        url:"/comment/music",
        method:"get",
        params
    })
}