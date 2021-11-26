import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuedraggable from 'vuedraggable'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Pagination from '@/components/Pagination/index.js'
import Table from '@/components/Table/index.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(vuedraggable)
// Vue.prototype.global = global

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
