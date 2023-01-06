import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from './stores'
createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(pinia)
  .mount('#app')
