import Vue from 'vue'
import iView from 'iview'
import VCharts from 'v-charts'
import echarts from 'echarts'
import dayjs from 'dayjs'

import 'iview/dist/styles/iview.css'

import App from './App.vue'

import router from './router/index'
import store from './store/index'
import api from './http/index'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts 
Vue.prototype.dayjs = dayjs

window.eventBus = new Vue()

Vue.use(api)
Vue.use(iView)
Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
