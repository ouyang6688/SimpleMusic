import request from "./http";

export function getSearchHot() {
    return request({
        url: "/search/hot",
        method: "get"
    })
}

export function getSearchArr(params) {
    return request({
        url: "/search",
        method: "get",
        params
    })
}