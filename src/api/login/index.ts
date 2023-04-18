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
				url: '/10086/login',
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
				url: '/10086/system/auth/social-login/' + source,
				method: 'get',
				params: data
			})
		},
		signOut: (data: object) => {
			return request({
				url: '/10086/logout',
				method: 'post',
				headers: {
					isToken: false
				},
				data,
			});
		},
		getCodeImg: () => {
			return request({
				url: '/10086/captchaImage',
				headers: {
					isToken: false
				},
				method: 'get',
				timeout: 20000
			})
		},
		getCodeSms: () => {
			return request({
				url: '/10086/captsms',
				method: 'get',
				timeout: 20000
			})
		},
		getUserInfo: () => {
			return request({
				url: '/10086/getInfo',
				method: 'get',
			});
		},

	};
}
