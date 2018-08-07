import axios from './api'

/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将URL独立成文件，接口分成不同的模块
 */

let domain = document.domain;

let urlBase = '';
switch (domain) {
  case '127.0.0.1':
  case 'localhost':
    urlBase = 'http://localhost:3000/index';
    break;
  default:
    break;
}
export const tryList = params => {
  return axios({
    url: '/string',
    method: 'get',
    params
  })
}

export default {
  tryList
}
