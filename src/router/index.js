import Vue from 'vue'
import Router from 'vue-router'

// 路由数据
import routes from './routes'

Vue.use(Router)

// 导出路由 在main.js里使用
const router = new Router({
  routes
})

export default router