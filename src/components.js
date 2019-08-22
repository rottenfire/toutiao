import layoutHeader from './components/home/layout-header.vue'
import layoutAside from './components/home/layout-aside.vue'
import breadCrumb from './components/common/breadCrumb.vue'

export default {
  install (Vue) {
    Vue.component('layout-header', layoutHeader)
    Vue.component('layout-aside', layoutAside)
    Vue.component('bread-crumb', breadCrumb)
  }
}
