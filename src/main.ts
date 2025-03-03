import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';

import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'


import en from './i18n/en.json'
import th from './i18n/th.json'

const i18n = createI18n({
  locale: 'en', // กำหนดภาษาหลักเริ่มต้น
  messages: {
    en,
    th
  }
})
const pinia = createPinia()

const app = createApp(App)
app.use(router);
app.use(pinia)
app.use(i18n)
app.mount('#app')
