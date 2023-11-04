import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {SvgIcon, Loading} from './components/common'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'virtual:svg-icons-register'
import 'ant-design-vue/dist/reset.css'
import installDirective from './service/directives'
import { createPinia } from 'pinia'
// import axios from 'axios'
// import Vue from 'vue'
// axios.defaults.baseURL = ""
// Vue.prototype.$axios = axios
const app = createApp(App)
const pinia = createPinia()
// pinia.use(piniaPersist)
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.use(Antd)
installDirective(app)
app.component('svg-icon', SvgIcon)
app.component('loading', Loading)
app.mount('#app')
// createApp(App).use(Antd).use(pinia).use(router).mount('#app')
