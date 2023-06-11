import Vue from 'vue'
import App from './App.vue'
// import { turn } from 'core-js/core/array'/

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
