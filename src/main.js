import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import router from './router'
import store from './store'
import axios from './assets/js/axios';
import dialog from './assets/js/dialog';
import {sessionStor, localStor} from './common/plugin/store';

axios.setStore(store);
dialog.setStore(store);
const Vue = createApp(App)
Vue.use(Vuex)
Vue.use(store)
Vue.use(router)
Vue.config.globalProperties.$axios = axios
Vue.config.globalProperties.$dialog = dialog
Vue.config.globalProperties.$sessionStor = sessionStor
Vue.config.globalProperties.$localStor = localStor

Vue.mount('#app')
