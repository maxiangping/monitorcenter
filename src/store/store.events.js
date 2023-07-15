import Vuex from 'vuex';

import pub from './module/events/appcommon';
import index from './module/events/index';
import spring from './module/events/spring';


const store = new Vuex.Store({
	modules: {
		pub,
		index,
		spring,
	},
});

if (module.hot) {
	module.hot.accept(['./module/events/appcommon', './module/events/index', './module/events/spring'], () => {
		const newPub = require('./module/events/appcommon').default;
		const newIdx = require('./module/events/index').default;
		const newSpring = require('./module/events/spring').default;
		store.hotUpdate({
			modules: {
				pub: newPub,
				index: newIdx,
				spring: newSpring,
			},
		});
	});
}

export default store;
