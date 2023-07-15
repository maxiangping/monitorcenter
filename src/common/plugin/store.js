import 'vue';

import store from 'store';
import sessionStorage from 'store/storages/sessionStorage';
import localStorage from 'store/storages/localStorage';

export const sessionStor = store.createStore(sessionStorage);
export const localStor = store.createStore(localStorage);

