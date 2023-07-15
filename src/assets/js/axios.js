import Axios from 'axios';
import { shim } from 'promise.prototype.finally';
import {sessionStor} from '@/common/plugin/store';


shim();

let store = {};
const axios = Axios.create();
const requestMap = {};

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use((config) => {
		if(config.noneToken !== 1 ) {
			const uin = sessionStor.get('session_uin')
			const token = sessionStor.get('session_token')
			config.headers.token = token || ''
			config.headers.uin = uin || ''
		}
		if(config.contentType) {
			config.headers['Content-Type'] = config.contentType
			// config.headers.transformRequest = [data => data]
		}
	
	if (config.loading) {
		store.dispatch('open_loading', typeof config.loading === 'string' ? {msg: config.loading} : undefined);
	}

	if (config.mock) {
		config.adapter = (cfg) =>
			new Promise((resolve) => {
				setTimeout(
					() =>
						resolve({
							data: config.mock,
							status: 200,
							statusText: 'mock ok',
							config: cfg,
							headers: '',
						}),
					cfg.mockTimeout || 0
				);
			});
	}

	// config.url = root + config.url;

	config.cancelToken = config.cancelToken || Axios.CancelToken.source().token;

	if (config.successive) {
		const cancelToken = requestMap[config.url];
		if (cancelToken !== undefined) {
			cancelToken.reason = new Axios.Cancel('Canceled by successive request.');
		}
		requestMap[config.url] = config.cancelToken;
	} else if (config.single) {
		if (requestMap[config.url]) {
			config.cancelToken.reason = new Axios.Cancel('Canceled by singleton.');
		} else {
			requestMap[config.url] = config.cancelToken;
		}
	}

	if (config.method === 'post') {
		// config.data = qs.stringify(config.data);
	}

	return config;
});

// Add a response interceptor
axios.interceptors.response.use(
	(response) => {
		if (response.config.loading) {
			store.dispatch('destroy_loading');
		}
		if (response.config.successive || response.config.single) {
			delete requestMap[response.config.url];
		}
		// Do something with response data
		let data = response.data;
		response.message = data.hasOwnProperty('message') ? data.message : data.info;
		response.data = data.data;
		response.statusCode = data.hasOwnProperty('code') ? data.code : data.status;

		return response;
	},
	(error) => {
		if (error.config) {
			if (error.config.successive) {
				if (requestMap[error.config.url] === error.config.cancelToken) {
					delete requestMap[resp.config.url];
				}
			} else if (error.config.single) {
				delete requestMap[resp.config.url];
			}
			if (error.config.loading) {
				store.dispatch('destroy_loading');
			}
		}
		if (!Axios.isCancel(error)) {
			if (error.config && error.config.dialogError) {
				dialog.error();
			}
			try {
				console.log(JSON.stringify(error, null, 2));
			} catch (_err) {
				console.log(String(error));
			}
		}
		// Do something with response error
		return Promise.reject(error);
	}
);

axios.setStore = (_store) => (store = _store);

export default axios;
