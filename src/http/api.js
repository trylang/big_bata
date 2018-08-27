import axios from 'axios'
import config from './config.js' // 引入默认配置
// import { resolve } from 'url'
export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers
    })

    // 添加请求拦截器
    instance.interceptors.request.use(
      config => {
        config.responseType = config.url.indexOf('/data/download') >=0 ? 'blob' : 'json';
        return config
      },
      error => {
        console.log('request:', error)
        if (
          error.code === 'ECONNABORTED' &&
          error.message.indexOf('timeout') !== -1
        ) {
          console.log(
            '根据你设置的 timeout 判断请求超时了，你可以在这里加入超时的处理方案'
          )
        }

        const errorInfo = error.response
        if (errorInfo) {
          const errorStatus = errorInfo.code;         
          window.open(`/error/${errorStatus}`)
        }
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      response => {
        let data
        if (response.data === undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        if (!data.code) {
          return response;
        }
        switch (parseInt(data.code)) {
          case 0:
            if(data.total && Array.isArray(data.data)) {
              data.data.total = data.total 
            }
            return data.data
          case -3:
            return []
          case 514:
            return Promise.reject(data.msg)
          default:
            return Promise.reject(data.msg)
        }
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.msg = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址错误：${err.response.config.url}`
              break
            default:
          }
        }
        console.log(err)
        return Promise.reject(err) 
      }
    )

    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
