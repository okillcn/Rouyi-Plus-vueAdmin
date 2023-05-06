import request from '/@/utils/request';

/**
 *
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 * @method socialLogin 第三方登录
 * @method getCodeImg 获取验证码
 */
export function useLoginApi() {
	return {
		signIn: (data: object) => {
			return request({
				url: '/login',
				method: 'post',
				headers: {
					isToken: false
				},
				data,
			});
		},
		socialLogin(source: any, code: any, state: any) {
			const data = {
				code,
				state
			}
			return request({
				url: '/system/auth/social-login/' + source,
				method: 'get',
				params: data
			})
		},
		signOut: () => {
			return request({
				url: '/logout',
				method: 'post',
			});
		},
		getCodeImg: () => {
			return request({
				url: '/captchaImage',
				headers: {
					isToken: false
				},
				method: 'get',
				timeout: 20000
			})
		},
		getCodeSms: () => {
			return request({
				url: '/captsms',
				method: 'get',
				timeout: 20000
			})
		},
		getUserInfo: () => {
			return request({
				url: '/getInfo',
				method: 'get',
			});
		},

	};
}
