const safe_close = (state, filter) => {
	let otherOpen = Object.entries(state).some(
		([key, node]) => key !== filter && (node instanceof Object && node.hasOwnProperty('show') && node.show)
	);
	if (!otherOpen) state.component_open_state = false;
};

const appcommon = {
	state: {
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
			className: '',
			footerBorderTop: true,
		},
		component_pophtml: {
			show: false,
			title: '',
			bntext: '',
		},
		component_preview: {
			show: false,
			imgs: [],
			index: 0,
		},
		component_searchmap: {
			show: false,
			lat: 0,
			lng: 0,
			callback: null,
			result: {
				lat: '',
				lng: '',
				address: '',
			},
		},
		component_book: {
			show: false,
			commit: false, // 数据没提前之前，其它地方不能使用
			refer: '',
			start_date: '',
			end_date: '',
			lat: '',
			lng: '',
			address: '',
		},
	},
	mutations: {
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
			component_dialog.confirm = option.confirm || '确定';
			component_dialog.cancel = option.cancel || '取消';
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
				className: '',
			};
			Array.prototype.forEach.call(
				Object.keys(component_dialog),
				(key) => (component_dialog[key] = meta_data[key])
			);
		},

		open_pophtml(state, option) {
			let component_pophtml = state.component_pophtml;

			component_pophtml.tpl = option.tpl;
			component_pophtml.title = option.title;
			component_pophtml.bntext = option.bntext;

			state.component_open_state = true;
			component_pophtml.show = true;
		},
		destroy_pophtml(state) {
			let component_pophtml = state.component_pophtml;
			component_pophtml.title = '';
			component_pophtml.tpl = '';
			component_pophtml.bntext = '';
			// state.component_open_state = false;
			safe_close(state, 'component_pophtml');
			component_pophtml.show = false;
		},

		open_preview(state, option) {
			let component_preview = state.component_preview;
			component_preview.index = option.index || 0;
			component_preview.imgs = option.imgs;

			state.component_open_state = true;
			component_preview.show = true;
		},
		destroy_preview(state) {
			let component_preview = state.component_preview;
			component_preview.index = 0;
			component_preview.imgs = [];

			// state.component_open_state = false;
			safe_close(state, 'component_preview');
			component_preview.show = false;
		},
		open_searchmap(state, option) {
			let component_searchmap = state.component_searchmap;

			component_searchmap.lat = option.lat;
			component_searchmap.lng = option.lng;
			if (option.hasOwnProperty('callback') && option.callback instanceof Function) {
				component_searchmap.callback = option.callback;
			}

			component_searchmap.result = {
				lat: '',
				lng: '',
				address: '',
			};

			state.component_open_state = true;
			component_searchmap.show = true;
		},
		cleanup_searchmap(state) {
			let component_searchmap = state.component_searchmap;

			component_searchmap.lat = 0;
			component_searchmap.lng = 0;
			component_searchmap.callback = null;
			component_searchmap.result = {
				lat: '',
				lng: '',
				address: '',
			};
			component_searchmap.show = false;
		},
		destroy_searchmap(state, option) {
			let component_searchmap = state.component_searchmap;

			component_searchmap.lat = 0;
			component_searchmap.lng = 0;

			if (component_searchmap.callback instanceof Function) {
				component_searchmap.callback();
			}

			if (option instanceof Object) {
				component_searchmap.result = {
					lat: option.lat,
					lng: option.lng,
					address: option.address,
				};
			}

			// state.component_open_state = false;
			safe_close(state, 'component_searchmap');
			component_searchmap.show = false;
		},
		open_book(state, option) {
			let component_book = state.component_book;

			component_book.refer = option.refer;
			component_book.start_date = option.start_date;
			component_book.end_date = option.end_date;

			component_book.lat = option.lat;
			component_book.lng = option.lng;
			component_book.address = option.address;

			state.component_open_state = true;
			component_book.show = true;
		},
		restore_component_book(state, option) {
			Object.assign(state.component_book, option);
		},
		destroy_book(state, option) {
			let component_book = state.component_book;
			// 提交数据，此时并不应销毁数据
			if (option && option.hasOwnProperty('commit')) {
				component_book.commit = true;
			}

			// 销毁数据
			if (option && option.hasOwnProperty('clean')) {
				component_book.commit = false;
				component_book.refer = '';
				component_book.start_date = '';
				component_book.end_date = '';

				component_book.lat = '';
				component_book.lng = '';
				component_book.address = '';
			}
			// state.component_open_state = false;
			safe_close(state, 'component_book');
			component_book.show = false;
		},
	},
	actions: {
		open_loading({commit}, option) {
			commit('open_loading', option ? option : {msg: '加载中'});
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
		open_pophtml({commit}, option) {
			commit('open_pophtml', option);
		},
		destroy_pophtml({commit}) {
			commit('destroy_pophtml');
		},
		open_preview({commit}, option) {
			commit('open_preview', option);
		},
		destroy_preview({commit}) {
			commit('destroy_preview');
		},
		open_searchmap({commit}, option) {
			commit('open_searchmap', option);
		},
		cleanup_searchmap({commit}) {
			commit('cleanup_searchmap');
		},
		destroy_searchmap({commit}, option) {
			commit('destroy_searchmap', option);
		},
		open_book({commit}, option) {
			commit('open_book', option);
		},
		restore_component_book({commit}, option) {
			commit('restore_component_book', option);
		},
		destroy_book({commit}, option) {
			commit('destroy_book', option);
		},
	},
};

export default appcommon;
