export const find = (list, f) => list.filter(f)[0];

export const deepCopy = (obj, cache = []) => {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	const hit = find(cache, c => c.original === obj);
	if (hit) {
		return hit.copy;
	}

	const copy = Array.isArray(obj) ? [] : {};

	cache.push({
		original: obj,
		copy
	});

	Object.keys(obj).forEach(key => {
		copy[key] = deepCopy(obj[key], cache);
	});

	return copy;
};

export const forEachValue = (obj, fn) => {
	Object.keys(obj).forEach(key => fn(obj[key], key));
};

export const isObject = (obj) => obj !== null && typeof obj === 'object';

export const isPromise = (val) => val && typeof val.then === 'function';

export const assert = (condition, msg) => {
	if (!condition) throw new Error(`[vuex] ${msg}`);
};

export const repeat = (str, times) => (new Array(times + 1)).join(str);

export const pad = (num, maxLength) => repeat('0', maxLength - num.toString().length) + num;
