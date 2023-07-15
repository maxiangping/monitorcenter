import _ from 'lodash';

import * as types from './mutation-types';

const state = {
	cityStatus: {
		adv_pic: [], // 活动图片
		num: 0, // 当前城市生效活动套餐数量
		user_num: 0, // 用户拥有券数量
	},

	couponList: [], // 可用优惠券列表
	parkingList: [], // 取车网点列表
	carList: [], // 车型列表

	purchasedCoupons: [],
};

const getters = {
	// 城市宣传图片
	cityAdPic: (state) => _.first(state.cityStatus.adv_pic) || require('../../../assets/imgs/bg_usercenter.png'),
	// 城市活动已结束
	isOver: (state) => state.cityStatus.num <= 0,
	// 是否购买有优惠券
	isIn: (state) => state.cityStatus.user_num > 0,
};

const mutations = {
	[types.SET_CITY_STATUS](state, cityStatus) {
		state.cityStatus = cityStatus;
	},

	[types.SET_COUPON_LIST](state, {list}) {
		state.couponList = list;
	},
	[types.SET_PARKING_LIST](state, {list}) {
		state.parkingList = list;
	},
	[types.SET_CAR_LIST](state, {list}) {
		state.carList = list;
	},

	[types.SET_PURCHASED_COUPONS](state, {list}) {
		state.purchasedCoupons = list;
	},
};

const actions = {};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
