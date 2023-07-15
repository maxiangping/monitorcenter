import Vue from 'vue';

let store = {};
/*
title: '',
icon: '',
content: '',
confirm: '确定',
cancel: '取消',
indent: false,
html: false,
timer: 0,
confirm_fn: null,
showConfirm: true,
showCancel: true,
open: false,
*/
const dialog = new Vue({
	methods: {
		msg(msg, fn, fnCancel) {
			store.dispatch('open_dialog_msg', {
				msg: msg,
				confirm_fn: fn,
				cancel_fn: fnCancel,
			});
		},
		toast(msg) {
			store.dispatch('open_toast', msg);
		},
		error(msg) {
			store.dispatch('open_dialog_err', msg);
		},
		custom(option) {
			store.dispatch('open_dialog', option);
		},
	},
});

dialog.setStore = (_store) => (store = _store);

export default dialog;
