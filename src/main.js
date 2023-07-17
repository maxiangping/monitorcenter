import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import router from './router'
import store from './store'
import axios from './assets/js/axios';
import dialog from './assets/js/dialog';
import {sessionStor, localStor} from './common/plugin/store';
import naive from 'naive-ui'

axios.setStore(store);
dialog.setStore(store);

const app = createApp(App)
app.use(Vuex)
app.use(store)
app.use(router)
app.use(naive)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$dialog = dialog
app.config.globalProperties.$sessionStor = sessionStor
app.config.globalProperties.$localStor = localStor
app.config.errorHandler = () =>{
  //
}

app.mount('#app')


