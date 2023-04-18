import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';
import { useLoginApi } from '/@/api/login/index';
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			permissions: [],
			roles: [],
			user: {
				// 用户信息
				userId: 0,
				appId: 0,
				userName: '',
				nickName: '',
				userType: '',
				email: '',
				phonenumber: 0,// 手机号
				sex: '',// 性别
				avatar: '',// 头像
				status: '',// 状态
				delFlag: '',// 删除标志
				loginIp: '',// 登录IP
				loginDate: '',// 登录时间
				remark: '',// 备注
				intro: '',// 介绍
				webSite: '',// 网站
				createBy: '',// 创建者
				createTime: '',// 创建时间
				updateBy: '',// 更新者
				updateTime: '',// 更新时间
				app: {
					// 应用信息
					createBy: '',
					createTime: '',
					updateBy: '',
					updateTime: '',
					parentName: '',
					parentId: 0,
					children: [],
					ancestors: '',
					appId: 0,
					orderNum: 0,
					appName: '',
					icon: '',
					introduction: '',
					web: '',
					version: '',
					announcement: '',
					updateAddress: '',
				},
				roles: [],
				roleIds: [],
				postIds: [],
				roleId: 0,
				admin: false,
			},

		},
	}),
	actions: {
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.getUserInfo()) {
				this.userInfos = Session.getUserInfo();
			} else {
				const userInfos: any = await this.getApiUserInfo();
				this.userInfos = userInfos;
			}
		},
		async getApiUserInfo() {
			return new Promise((resolve) => {
				setTimeout(() => {
				const userInfo = useLoginApi().getUserInfo().then((res) => {
						Session.setUserInfo(res.data);
						return res.data;
					});
					resolve(userInfo);
				}, 0);
			});
		},
	},

});
