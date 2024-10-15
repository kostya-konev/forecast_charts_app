import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { languages } from './i18n';
import { defaultLocale } from './i18n';
import {createI18n, useI18n} from 'vue-i18n'

const localeStorageLang = localStorage.getItem('lang');

const messages = Object.assign(languages);
const i18n = createI18n({
  legacy: false,
  locale: localeStorageLang || defaultLocale,
  fallbackLocale: 'en',
  messages
});

const app = createApp(App, {
  setup() {
    const {t} = useI18n();
    return {t};
  }
});

app.use(router)
app.use(i18n);
app.use(createPinia())

app.provide('changeLocale', (newLocale: string) => {
  i18n.global.locale.value = newLocale;
  localStorage.setItem('lang', newLocale);
});

app.mount('#app')
