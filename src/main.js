import Vue from 'vue'
import iView from 'iview'
import VCharts from 'v-charts'
import 'iview/dist/styles/iview.css'

import App from './App.vue'

import router from './router/index'
import store from './store/index'
import api from './http/index'

Vue.config.productionTip = false

Vue.use(api)
Vue.use(iView)
Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
