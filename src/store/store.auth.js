import Vuex from 'vuex';

import pub from './module/auth/appcommon';


const store = new Vuex.Store({
	modules: {
		pub,
	},
});

if (module.hot) {
	module.hot.accept(['./module/auth/appcommon'], () => {
		const newPub = require('./module/auth/appcommon').default;
		store.hotUpdate({
			modules: {
				pub: newPub,
			},
		});
	});
}

export default store;
