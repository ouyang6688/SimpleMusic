import request from "./http"

// 获取验证码
export function getCaptcha(params) {
    return request({
        url:"captcha/sent",
        method:"get",
        params
    })
}

// 验证验证码

export function getCaptchaVerify(params) {
    return request({
        url:"captcha/sent",
        method:"get",
        params
    })
}