let _ = {};

_.divide100 = (num) => {
	if (num % 100 == 0) {
		return num / 100;
	}
	return (num / 100).toFixed(2);
};

_.date_formate = (date) => {
	if (!date) {
		return '0000-00-00';
	}
	if (date instanceof String) {
		date = new Date(date);
	}
	let yyyy = date.getFullYear();
	let mm = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; // getMonth() is zero-based
	let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	return `${yyyy}-${mm}-${dd}`;
};

_.date_formate_yyyyMMdd = (date) => {
	if (!date) {
		return '00000000';
	}
	let yyyy = date.getFullYear();
	let mm = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; // getMonth() is zero-based
	let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	return `${yyyy}${mm}${dd}`;
};

_.date_formate_MMddHHSS = (dateString) => {
	if (dateString) {
		let mm = dateString.slice(5, 7);
		let dd = dateString.slice(8, 10);
		let hh = dateString.slice(11, 13);
		let ss = dateString.slice(14, 16);
		return `${mm}月${dd}日 ${hh}:${ss}`;
	}
	return '00月00日 00:00';
};

_.date_formate_MMdd_HHSS_CN = (dateString) => {
	if (dateString) {
		let mm = dateString.slice(5, 7);
		let dd = dateString.slice(8, 10);
		let hh = dateString.slice(11, 13);
		let ss = dateString.slice(14, 16);
		return `${mm}月${dd}日 ${hh}时${ss}分`;
	}
	return '00月00日 00时00分';
};

_.date_formate_YYYYMMdd_HHSS = (dateString, default_value, _symbal_) => {
	let _symbal = _symbal_ ? _symbal_ : '/';
	if (dateString) {
		let yyyy = dateString.slice(0, 4);
		let mm = dateString.slice(5, 7);
		let dd = dateString.slice(8, 10);
		let hh = dateString.slice(11, 13);
		let ss = dateString.slice(14, 16);
		return `${yyyy}${_symbal}${mm}${_symbal}${dd} ${hh}:${ss}`;
	}
	return default_value ? default_value : `0000${_symbal}00${_symbal}00 00:00`;
};

_.format = (date, fmt) => {
	if (!date) {
		return 'format date fail';
	}
	if (date instanceof String) {
		date = new Date(date);
	}
	let o = {
		'y+': date.getFullYear(),
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3),
		'S+': date.getMilliseconds(),
	};
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			if (k == 'y+') {
				fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length));
			} else if (k == 'S+') {
				let lens = RegExp.$1.length;
				lens = lens == 1 ? 3 : lens;
				fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens));
			} else {
				fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
			}
		}
	}
	return fmt;
};

_.isNull = (str) => !(typeof str === 'string' && str && str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));

_.isSomeNull = function(...args) {
	return Array.prototype.some.call(args, _.isNull);
};

_.mask = (val, start, end) => {
	val = String(val || '');
	if (!val) return '';

	if (start === undefined) {
		// 默认是手机号屏蔽中间四位
		start = Math.min(3, val.length);
		end = Math.min(7, val.length);
	} else {
		if (start < 0) {
			start = Math.max(0, start + val.length);
		}
		if (end === undefined) {
			// 传入start不传入end, 则替换至末尾
			end = val.length;
		} else if (end < 0) {
			end = Math.max(0, start, end + val.length);
		}
	}
	return val.substring(0, start) + Array(end - start + 1).join('*') + val.substr(end);
};

_.now = () => new Date().getTime();
_.isObject = () => Object.prototype.toString.call(value) === '[object Object]';
_.str = () => Array.prototype.join.call(arguments, '');

_.memoize = (fn) => {
	let cache = {};
	return (...args) => {
		let n = args[0];
		if (n in cache) {
			console.log('Fetching from cache', n);
			return cache[n];
		}
		console.log('Calculating result', n);
		let result = fn.apply(fn, args);
		cache[n] = result;
		return result;
	};
};

_.fix = (f) => ((f) => f(f))((g) => f((...a) => g(g)(...a))); // This is a variant of the Applicative order Y combinator
_.curry = (f) => _.fix((z) => (n, ...a) => (n > 0 ? (b) => z(n - 1, ...a, b) : f(...a)))(f.length);
_.curryrest = (f) => _.fix((z) => (n, ...a) => (n > 0 ? (b) => z(n - 1, ...a, b) : (...b) => f(...a, ...b)))(f.length);
_.compose = (f, g) => (x) => g(f(x));

_.throttled = (func, wait, options) => {
	let timeout, context, args, result;
	let previous = 0;
	if (!options) options = {};

	let later = () => {
		previous = options.leading === false ? 0 : _.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};

	let throttled = () => {
		let now = _.now();
		if (!previous && options.leading === false) previous = now;
		let remaining = wait - (now - previous);
		// eslint-disable-next-line no-invalid-this
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};

	throttled.cancel = () => {
		clearTimeout(timeout);
		previous = 0;
		timeout = context = args = null;
	};

	return throttled;
};

_.toURL = (app_path, origin, params) => {
	let encodedString = '';
	if (_.isObject(params)) {
		Object.keys(params).forEach(function(key) {
			if (encodedString) {
				encodedString += '&';
			}
			encodedString += encodeURI(key + '=' + params[key]);
		});
	}
	return _.str(app_path, origin, encodedString !== '' ? (/\?\S+=/.test(origin) ? '&' : '?') : '', encodedString);
};

let FnExpr = function(val) {
	FnExpr.match_val = val;
};

FnExpr.prototype = {
	constructor: FnExpr,
	expr: function(requirement) {
		this.requirement = requirement;
		return this;
	},
	match: function(cb) {
		if (this.requirement && cb instanceof Function) {
			try {
				let _args = [];
				if (typeof FnExpr.match_val !== 'undefined') {
					_args.push(FnExpr.match_val);
				}
				cb();
			} catch (error) {
				this.pance = true;
				return this;
			}
		}
		return this;
	},
	unwrap: function(cb) {
		if (!this.requirement && cb instanceof Function) {
			try {
				cb();
			} catch (error) {
				this.pance = true;
				return this;
			}
		}
		return this;
	},
	pance: function(cb) {
		if (this.pance && cb instanceof Function) {
			cb();
		}
		return this;
	},
};

_.expr = function(requirement) {
	return new FnExpr().expr(requirement);
};

_.eq = function(_var, ..._const) {
	// let _const = Array.prototype.splice.call(arguments, 1);
	if (_const.length === 0) return new FnExpr().expr(false);
	if (_var instanceof Function) {
		_var = _var.apply(Object, _const);
	}
	if (['number', 'string', 'boolean', 'undefined'].includes(typeof _var)) {
		let length = _const.length;
		for (let i = 0; i < length; ++i) {
			let val = _const[i];
			if (_var === val || _var == val) {
				return new FnExpr(val).expr(true);
			}
		}
	}
	return new FnExpr().expr(false);
};

_.set = (target, current, cb) => {
	if (!(target instanceof Object) || !(current instanceof Object)) return;
	Object.keys(target).forEach(function(name) {
		let value = current[name];
		if (typeof value !== 'undefined' && target.hasOwnProperty(name)) {
			// 如果有callback，先执行callback
			if (typeof cb === 'function') {
				target[name] = cb(name, value);
				return;
			}

			// 如果是对象，进行深层次拷贝
			if (Object.prototype.toString.call(target[name]) === '[object Object]') {
				_.set(target[name], current[name], cb);
				return;
			}

			target[name] = value;
		}
	});
};

_.copy = (target, filter) => {
	if (!(target instanceof Object)) throw new Error('copy object error!');
	if (Array.isArray(target)) return target.slice();
	let res = {};
	Object.keys(target).forEach(function(name) {
		if (filter instanceof Array && filter.indexOf(name) > -1) return;
		// 如果是对象，进行深层次拷贝
		let node = target[name];
		if (node && Object.prototype.toString.call(node) === '[object Object]') {
			res[name] = _.copy(node);
			return;
		}
		res[name] = node;
	});
	return res;
};

// 价格输入框限制
_.checkPrice = (price) => {
	price = '' + price;
	price = price
		.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
		.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
		.replace('.', '$#$')
		.replace(/\./g, '')
		.replace('$#$', '.')
		.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
	if (price.indexOf('.') < 0 && price != '') {
		// 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
		price = parseFloat(price);
	}
	return price;
};

/*
 * 中国正常GCJ02坐标---->百度地图BD09坐标
 * 腾讯地图用的也是GCJ02坐标
 * @param double $lat 纬度
 * @param double $lng 经度
 */

_.convert_gcj02_to_bd09 = (lat, lng) => {
	let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	let x = lng;
	let y = lat;
	let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
	let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
	lng = z * Math.cos(theta) + 0.0065;
	lat = z * Math.sin(theta) + 0.006;

	return {
		lng: lng,
		lat: lat,
	};
};

/*
* 百度地图BD09坐标---->中国正常GCJ02坐标
* 腾讯地图用的也是GCJ02坐标
* @param double $lat 纬度
* @param double $lng 经度
* @return array();
*/

_.convert_bd09_to_gcj02 = (lat, lng) => {
	let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	let x = lng - 0.0065;
	let y = lat - 0.006;
	let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
	let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
	lng = z * Math.cos(theta);
	lat = z * Math.sin(theta);
	return {
		lng: lng,
		lat: lat,
	};
};

_.dataStr = function(data) {
	let newData = {}
	let str = ''
	const prefix_sign = '&!5wWk'
	const suffix_sign = 'E*QR4V'
	Object.keys(data).sort().map(key => {
		newData[key]=data[key]
	})
	Object.keys(newData).map(key => {
		str += key + '=' + encodeURIComponent(newData[key])
	})
	return `${prefix_sign}${str}${suffix_sign}`
}

_.gettimefl = (startTimme, endTime, isDay) => {
	// 两个时间戳相差的毫秒数
	const usedTime = endTime - startTimme;
	// 计算相差的天数  
	let days = 0
	if(isDay) {
		 days = Math.floor(usedTime / (24 * 3600 * 1000));
		// 计算天数后剩余的毫秒数
		// const leave1 = usedTime % (24 * 3600 * 1000); 
	}
	// 计算出小时数  
	const hours = Math.floor(usedTime / (3600 * 1000));
	// 计算小时数后剩余的毫秒数
	const leave2 = usedTime % (3600 * 1000);   
	// 计算相差分钟数
	const minutes = Math.floor(leave2 / (60 * 1000));
	const leave3 = leave2 % (60 * 1000);   
	 // 计算相差秒数
	const seconds = Math.floor(leave3 / ( 1000));
	const time = `${hours}:${minutes >= 10 ? minutes : '0'+ minutes}:${seconds >= 10 ? seconds : '0'+ seconds}`
	return isDay ? `${days}:${time}` : time;
}

export default _;
