import Vue from 'vue'
import Vuex from 'vuex'
import BI from './store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    BI
  }
})
