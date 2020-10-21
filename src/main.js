import Vue from 'vue'
import App from './App.vue'
import babelPolyfill from 'babel-polyfill'

Vue.use(babelPolyfill)

new Vue({
  el: '#app',
  render: h => h(App)
})
