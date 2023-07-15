const safe_close = (state, filter) => {
	let otherOpen = Object.entries(state).some(
		([key, node]) => key !== filter && (node instanceof Object && node.hasOwnProperty('show') && node.show)
	);
	if (!otherOpen) state.component_open_state = false;
};

const state = {
	component_open_state: false,
	component_loading: {
		show: false,
		msg: '',
		counter: 0,
	},
	component_dialog: {
		show: false,
		title: '',
		icon: '',
		content: '',
		confirm: '确定',
		cancel: '取消',
		indent: false,
		html: false,
		timer: 0,
		confirm_fn: null,
		cancel_fn: null,
		showConfirm: true,
		showCancel: true,
	},
};
const mutations = {
	open_loading(state, option) {
		state.component_loading.msg = option.msg;
		state.component_loading.counter += 1;
		state.component_open_state = true;
		state.component_loading.show = true;
	},
	destroy_loading(state) {
		if (state.component_loading.counter > 0) {
			state.component_loading.counter -= 1;
		}
		if (state.component_loading.counter <= 0) {
			state.component_loading.show = false;
			// state.component_open_state = false;
			safe_close(state, 'component_loading');
		}
	},

	open_dialog_msg(state, option) {
		let component_dialog = state.component_dialog;
		component_dialog.content = option.msg;
		component_dialog.confirm_fn = option.confirm_fn;
		component_dialog.cancel_fn = option.cancel_fn;
		state.component_open_state = true;
		component_dialog.show = true;
	},
	open_toast(state, msg) {
		let component_dialog = state.component_dialog;
		component_dialog.content = msg;
		component_dialog.showCancel = false;
		state.component_open_state = true;
		component_dialog.show = true;
	},
	open_dialog_err(state, msg) {
		let component_dialog = state.component_dialog;
		component_dialog.content = msg || '系统开小差了，请稍后再试！';
		component_dialog.showCancel = false;
		state.component_open_state = true;
		component_dialog.show = true;
	},
	open_dialog(state, option) {
		let component_dialog = state.component_dialog;
		Object.keys(option).forEach((key) => {
			if (key !== 'show' && component_dialog.hasOwnProperty(key)) {
				component_dialog[key] = option[key];
			}
		});
		state.component_open_state = true;
		component_dialog.show = true;
	},

	destroy_dialog(state) {
		// state.component_open_state = false;
		safe_close(state, 'component_dialog');
		let component_dialog = state.component_dialog;
		const meta_data = {
			title: '',
			icon: '',
			content: '',
			confirm: '确定',
			cancel: '取消',
			indent: false,
			html: false,
			timer: 0,
			confirm_fn: null,
			cancel_fn: null,
			showConfirm: true,
			showCancel: true,
			show: false,
		};
		Array.prototype.forEach.call(Object.keys(component_dialog), (key) => (component_dialog[key] = meta_data[key]));
	},
};
const actions = {
	open_loading({commit}, option) {
		commit('open_loading', option || {msg: '加载中'});
	},
	destroy_loading({commit}) {
		commit('destroy_loading');
	},
	open_dialog_msg({commit}, option) {
		commit('open_dialog_msg', option);
	},
	open_toast({commit}, msg) {
		commit('open_toast', msg);
	},
	open_dialog_err({commit}, msg) {
		commit('open_dialog_err', msg);
	},
	open_dialog({commit}, option) {
		commit('open_dialog', option);
	},
	destroy_dialog({commit}) {
		commit('destroy_dialog');
	},
};

export default {
	state,
	actions,
	mutations,
};
