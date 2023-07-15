import Vue from 'vue';

const dns = 'https://oss.weponycar.com/',
	reg = /^(ftp|http|https):\/{2}\w*/;
const oss = Vue.directive('oss', (el, binding) => {
	if (el.tagName === 'IMG' && binding.value) {
		let link = reg.test(binding.value) ? binding.value : dns + binding.value;
		el.setAttribute(binding.arg, link);
	}
});

const origin = Vue.directive('origin', (el, binding) => {
	if (el.tagName === 'A' && binding.value) {
		let link = reg.test(binding.value) ? binding.value : wechat_path + binding.value;
		el.setAttribute(binding.arg, link);
	}
});

const img_error = Vue.directive('ossdef', (el, binding) => {
	if (el.tagName === 'IMG' && binding.value) {
		el.addEventListener('onerror', () => {
			el.setAttribute(binding.arg, binding.value);
			el.removeEventListener('onerror');
		});
	}
});

export {oss, origin, img_error};
