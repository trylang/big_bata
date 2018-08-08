import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import App from './App.vue'
import router from './router/index'
import store from './store'
import api from './http/index'

Vue.config.productionTip = false

Vue.use(api)
Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
