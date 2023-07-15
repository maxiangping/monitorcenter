let _ = {};
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

var factorial = _.memoize((x) => {
	if (x === 0) {
		return 1;
	}

	return x * factorial(x - 1);
});

console.log(factorial(1));

console.log(factorial(2));

console.log(factorial(3));

var isString = _.memoize((x) => {
	return typeof x === 'string';
});

console.log(isString(1));
console.log(isString('1'));
