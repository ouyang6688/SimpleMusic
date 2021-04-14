import axios from 'axios';

const service = axios.create({
    // baseURL: "http://192.168.54.3:3000",
    // baseURL: "http://musicapi.leanapp.cn",
    baseURL: "http://192.168.54.25:3000",
    timeout:30000000,     //请求超时时间
    header:{
        "Content-Type":"application/json;charset=UTF-8" //表单数据传递转化
    }
})

//request拦截器 发送数据到后台
service.interceptors.request.use(
    config=>{
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
)

//
service.interceptors.response.use(
    response=>{
        return response.data;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

export default service;