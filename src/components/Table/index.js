import Vue from 'vue'
import table from './Table.vue'

const Table = {
  install: (vue) => {
    Vue.component('Table', table)
  }
}
export default Table
