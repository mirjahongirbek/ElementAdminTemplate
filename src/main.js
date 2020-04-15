import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import {
  IMaskComponent
} from 'vue-imask'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import './permission'
import './icons' // icon
import './utils/error-log' // error log
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
Vue.component('imask-input', IMaskComponent);
import {
  mockXHR
} from '../mock'

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
Vue.config.silent = true
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale
})
Vue.component("v-chart", ECharts)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
