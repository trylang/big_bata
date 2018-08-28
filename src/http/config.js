let config = {
  methods: 'post',
  baseURL: '', // 前端URL前缀
  headers: { // 请求头信息
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data: {}, // 参数
  timeout: 10000, // 设置超时时间
  withCredentials: false, // 携带凭证
  responseType: 'JSON'
}

let domain = document.domain
switch (domain) {
  case '127.0.0.1':
  case 'localhost':
    config.baseURL = '/api/'
    break
  case '192.168.14.98':
    // config.baseURL = 'http://localhost:3000/index';
    // config.baseURL = '/api/'
    config.baseURL = 'http://123.59.0.194:8010/'
    break
  case '123.59.0.194':
    // config.baseURL = 'http://localhost:3000/index';
    // config.baseURL = '/api/'
    config.baseURL = 'http://123.59.0.194:8030/'
    break
  default:
    break
}

export default config
