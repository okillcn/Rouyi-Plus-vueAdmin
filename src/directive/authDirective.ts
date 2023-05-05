import type { App } from 'vue';
import { useUserInfo } from '/@/stores/userInfo';
import { judementSameArr } from '/@/utils/arrayOperation';

/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * @directive 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
 * @directive 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
 */
export function authDirective(app: App) {
	const all_permission = "*:*:*";

	// 单个权限验证（v-auth="xxx"）
	app.directive('auth', {
		mounted(el, binding) {
			const stores = useUserInfo();
			const flag = stores.userInfos.permissions.some((val: string) => {
				return val === binding.value || stores.userInfos.permissions.some((val: string) => val === all_permission);
			}
			);
			if (!flag) el.parentNode.removeChild(el);// 移除元素
			// if (!flag) el.style.display = 'none';// 隐藏元素
			// if (!flag) el.style.visibility = 'hidden';// 隐藏元素
			// if (!flag) el.style.opacity = '0';// 隐藏元素
			// if (!flag) el.setAttribute('disabled', 'disabled');添加:disabled属性
		},
	});
	// 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
	app.directive('auths', {
		mounted(el, binding) {
			let flag = false;
			const stores = useUserInfo();
			stores.userInfos.permissions.map((val: string) => {
				binding.value.map((v: string) => {
					if (val === v || stores.userInfos.permissions.some((val: string) => val === all_permission)) flag = true;
				});
			});
			if (!flag) el.parentNode.removeChild(el);
		},
	});
	// 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
	app.directive('auth-all', {
		mounted(el, binding) {
			const stores = useUserInfo();
			const flag = judementSameArr(binding.value, stores.userInfos.permissions);
			if (!flag) el.parentNode.removeChild(el);
		},
	});
}
