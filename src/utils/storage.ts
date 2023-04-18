import Cookies from 'js-cookie';

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
	setKey(key: string) {
		// @ts-ignore
		return `${__NEXT_NAME__}:${key}`;
	},
	// 设置永久缓存
	set<T>(key: string, val: T) {
		window.localStorage.setItem(Local.setKey(key), JSON.stringify(val));
	},
	// 获取永久缓存
	get(key: string) {
		let json = <string>window.localStorage.getItem(Local.setKey(key));
		return JSON.parse(json);
	},
	// 移除永久缓存
	remove(key: string) {
		window.localStorage.removeItem(Local.setKey(key));
	},
	// 移除全部永久缓存
	clear() {
		window.localStorage.clear();
	},
};

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置临时缓存
	set<T>(key: string, val: T) {
		if (key === 'token') return Cookies.set(key, val);
		window.sessionStorage.setItem(Local.setKey(key), JSON.stringify(val));
	},
	// 获取临时缓存
	get(key: string) {
		if (key === 'token') return Cookies.get(key);
		let json = <string>window.sessionStorage.getItem(Local.setKey(key));
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key: string) {
		if (key === 'token') return Cookies.remove(key);
		window.sessionStorage.removeItem(Local.setKey(key));
	},
	// 移除全部临时缓存
	clear() {
		Cookies.remove('token');
		window.sessionStorage.clear();
	},

	
	getUserInfo() {
		return Session.get('userInfo')
	},
	setUserInfo(userInfo: any) {
		Session.set('userInfo', userInfo)
	},
	getToken() {
		return Session.get('token')
	},
	setToken(token: string) {
		Session.set('token', token)
	},
};

/**
 * 设置cookie
 * @param name cookie名称
 * @param value cookie值
 * @param days cookie过期时间
 * @param path cookie路径
 * @param domain cookie域名
 * */
export const cookie = {
	set(name: string, value: string, days: number, path: string, domain: string) {
		let expires = new Date();
		expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
		document.cookie =
			name +
			'=' +
			escape(value) +
			';expires=' +
			expires.toUTCString() +
			';path=' +
			path +
			';domain=' +
			domain;
	},
	/**
	 * 获取cookie
	 * @param name cookie名称
	 * */
	get(name: string) {
		let arr,
			reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
		if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
		else return null;
	},
	/**
	 * 删除cookie
	 * @param name cookie名称
	 * */
	remove(name: string) {
		let exp = new Date();
		exp.setTime(exp.getTime() - 1);
		let cval = cookie.get(name);
		if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString();
	},

};


