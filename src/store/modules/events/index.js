import {localStor, STORAGE_KEYS} from '@/common/plugin/store.events';

import {hook} from '@/common/plugin/hook.js';

import * as types from './mutation-types';

const state = {
	cityId: localStor.get(STORAGE_KEYS.CITY_ID) || 1, // 默认深圳
	user: {
		id: -1,
	},
};

const mutations = {
	[types.SET_CITY_ID](state, {cityId}) {
		state.cityId = cityId;
		localStor.set(STORAGE_KEYS.CITY_ID, cityId);
	},
	[types.SET_USER](state, {user}) {
		state.user = user;
	},
};

const actions = {
	getUserInfo({commit}, flush) {
		return new Promise(async (resolve) => {
			const user = await hook.userWithOpts({
				flush,
				default: {id: -1},
			});
			commit(types.SET_USER, {user});
			resolve();
		});
	},
};

export default {
	state,
	actions,
	mutations,
};
