import Vue from 'vue'
import pagination from './Pagination.vue'

const Pagination = {
  install: (vue) => {
    Vue.component('Pagination', pagination)
  }
}
export default Pagination
