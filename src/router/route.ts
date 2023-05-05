import { RouteRecordRaw } from 'vue-router';

/**
 * 建议：路由 path 路径与文件夹名称相同，找文件可浏览器地址找，方便定位文件位置
 *
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      link：        	是否超链接菜单，开启外链条件，`1、link: 链接地址不为空 2、isIframe:false`
 *      isHide：        是否隐藏此路由
 *      noCache：       是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上，默认 false
 *      isIframe：      是否内嵌窗口，开启条件，`1、isIframe:true 2、link：链接地址不为空`
 *      roles：         当前路由权限标识，取角色管理。若为空数组则无权限控制
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

// 扩展 RouteMeta 接口
declare module 'vue-router' {
	interface RouteMeta {
		title?: string;
		link?: string | null;
		isHide?: boolean;
		noCache?: boolean;
		isAffix?: boolean;
		isIframe?: boolean;
		roles?: string[];
		icon?: string;
	}
}

/**
 * 定义动态路由
 * 前端添加路由，请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `/@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/layout/index.vue'),
		redirect: '/home',
		meta: {
			noCache: true,
		},
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('/@/views/home/index.vue'),
				meta: {
					title: 'message.router.home',
					link: '',// 超链接菜单
					isHide: false,// 是否隐藏
					noCache: true,// 是否缓存组件状态
					isAffix: false,// 是否固定在 tagsView 栏上
					isIframe: false,// 是否内嵌窗口
					roles: ['admin', 'common'],
					icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system',
				name: 'system',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/system/menu',
				meta: {
					title: 'message.router.system',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin'],
					icon: 'iconfont icon-xitongshezhi',
				},
				children: [
					{
						path: '/system/menu',
						name: 'systemMenu',
						component: () => import('/@/views/system/menu/index.vue'),
						meta: {
							title: 'message.router.systemMenu',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'iconfont icon-caidan',
						},
					},
					{
						path: '/system/role',
						name: 'systemRole',
						component: () => import('/@/views/system/role/index.vue'),
						meta: {
							title: 'message.router.systemRole',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'ele-ColdDrink',
						},
					},
					{
						path: '/system/user',
						name: 'systemUser',
						component: () => import('/@/views/system/user/index.vue'),
						meta: {
							title: 'message.router.systemUser',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'iconfont icon-icon-',
						},
					},
					{
						path: '/system/dept',
						name: 'systemDept',
						component: () => import('/@/views/system/dept/index.vue'),
						meta: {
							title: 'message.router.systemDept',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'ele-OfficeBuilding',
						},
					},
					{
						path: '/system/dic',
						name: 'systemDic',
						component: () => import('/@/views/system/dic/index.vue'),
						meta: {
							title: 'message.router.systemDic',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'ele-SetUp',
						},
					},
				],
			},
			{
				path: '/limits',
				name: 'limits',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/limits/frontEnd',
				meta: {
					title: 'message.router.limits',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-quanxian',
				},
				children: [
					{
						path: '/limits/frontEnd',
						name: 'limitsFrontEnd',
						component: () => import('/@/layout/routerView/parent.vue'),
						redirect: '/limits/frontEnd/page',
						meta: {
							title: 'message.router.limitsFrontEnd',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: '',
						},
						children: [
							{
								path: '/limits/frontEnd/page',
								name: 'limitsFrontEndPage',
								component: () => import('/@/views/limits/frontEnd/page/index.vue'),
								meta: {
									title: 'message.router.limitsFrontEndPage',
									link: '',
									isHide: false,
									noCache: true,
									isAffix: false,
									isIframe: false,
									roles: ['admin', 'common'],
									icon: '',
								},
							},
							{
								path: '/limits/frontEnd/btn',
								name: 'limitsFrontEndBtn',
								component: () => import('/@/views/limits/frontEnd/btn/index.vue'),
								meta: {
									title: 'message.router.limitsFrontEndBtn',
									link: '',
									isHide: false,
									noCache: true,
									isAffix: false,
									isIframe: false,
									roles: ['admin', 'common'],
									icon: '',
								},
							},
						],
					},
					{
						path: '/limits/backEnd',
						name: 'limitsBackEnd',
						component: () => import('/@/layout/routerView/parent.vue'),
						meta: {
							title: 'message.router.limitsBackEnd',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: '',
						},
						children: [
							{
								path: '/limits/backEnd/page',
								name: 'limitsBackEndEndPage',
								component: () => import('/@/views/limits/backEnd/page/index.vue'),
								meta: {
									title: 'message.router.limitsBackEndEndPage',
									link: '',
									isHide: false,
									noCache: true,
									isAffix: false,
									isIframe: false,
									roles: ['admin', 'common'],
									icon: '',
								},
							},
						],
					},
				],
			},
			{
				path: '/menu',
				name: 'menu',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/menu/menu1',
				meta: {
					title: 'message.router.menu',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-caidan',
				},
				children: [
					{
						path: '/menu/menu1',
						name: 'menu1',
						component: () => import('/@/layout/routerView/parent.vue'),
						redirect: '/menu/menu1/menu11',
						meta: {
							title: 'message.router.menu1',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
						children: [
							{
								path: '/menu/menu1/menu11',
								name: 'menu11',
								component: () => import('/@/views/menu/menu1/menu11/index.vue'),
								meta: {
									title: 'message.router.menu11',
									link: '',
									isHide: false,
									noCache: true,
									isAffix: false,
									isIframe: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
							},
							{
								path: '/menu/menu1/menu12',
								name: 'menu12',
								component: () => import('/@/layout/routerView/parent.vue'),
								redirect: '/menu/menu1/menu12/menu121',
								meta: {
									title: 'message.router.menu12',
									link: '',
									isHide: false,
									noCache: true,
									isAffix: false,
									isIframe: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
								children: [
									{
										path: '/menu/menu1/menu12/menu121',
										name: 'menu121',
										component: () => import('/@/views/menu/menu1/menu12/menu121/index.vue'),
										meta: {
											title: 'message.router.menu121',
											link: '',
											isHide: false,
											noCache: true,
											isAffix: false,
											isIframe: false,
											roles: ['admin', 'common'],
											icon: 'iconfont icon-caidan',
										},
									},
									{
										path: '/menu/menu1/menu12/menu122',
										name: 'menu122',
										component: () => import('/@/views/menu/menu1/menu12/menu122/index.vue'),
										meta: {
											title: 'message.router.menu122',
											link: '',
											isHide: false,
											noCache: true,
											isAffix: false,
											isIframe: false,
											roles: ['admin', 'common'],
											icon: 'iconfont icon-caidan',
										},
									},
								],
							},
							{
								path: '/menu/menu1/menu13',
								name: 'menu13',
								component: () => import('/@/views/menu/menu1/menu13/index.vue'),
								meta: {
									title: 'message.router.menu13',
									link: '',
									isHide: false,
									noCache: true,
									isAffix: false,
									isIframe: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
							},
						],
					},
					{
						path: '/menu/menu2',
						name: 'menu2',
						component: () => import('/@/views/menu/menu2/index.vue'),
						meta: {
							title: 'message.router.menu2',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
					},
				],
			},
			{
				path: '/fun',
				name: 'funIndex',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/fun/tagsView',
				meta: {
					title: 'message.router.funIndex',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-crew_feature',
				},
				children: [
					{
						path: '/fun/tagsView',
						name: 'funTagsView',
						component: () => import('/@/views/fun/tagsView/index.vue'),
						meta: {
							title: 'message.router.funTagsView',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-Pointer',
						},
					},
					{
						path: '/fun/countup',
						name: 'funCountup',
						component: () => import('/@/views/fun/countup/index.vue'),
						meta: {
							title: 'message.router.funCountup',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-Odometer',
						},
					},
					{
						path: '/fun/wangEditor',
						name: 'funWangEditor',
						component: () => import('/@/views/fun/wangEditor/index.vue'),
						meta: {
							title: 'message.router.funWangEditor',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-fuwenbenkuang',
						},
					},
					{
						path: '/fun/cropper',
						name: 'funCropper',
						component: () => import('/@/views/fun/cropper/index.vue'),
						meta: {
							title: 'message.router.funCropper',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caijian',
						},
					},
					{
						path: '/fun/qrcode',
						name: 'funQrcode',
						component: () => import('/@/views/fun/qrcode/index.vue'),
						meta: {
							title: 'message.router.funQrcode',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-ico',
						},
					},
					{
						path: '/fun/echartsMap',
						name: 'funEchartsMap',
						component: () => import('/@/views/fun/echartsMap/index.vue'),
						meta: {
							title: 'message.router.funEchartsMap',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-ditu',
						},
					},
					{
						path: '/fun/printJs',
						name: 'funPrintJs',
						component: () => import('/@/views/fun/printJs/index.vue'),
						meta: {
							title: 'message.router.funPrintJs',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-Printer',
						},
					},
					{
						path: '/fun/clipboard',
						name: 'funClipboard',
						component: () => import('/@/views/fun/clipboard/index.vue'),
						meta: {
							title: 'message.router.funClipboard',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-DocumentCopy',
						},
					},
					{
						path: '/fun/gridLayout',
						name: 'funGridLayout',
						component: () => import('/@/views/fun/gridLayout/index.vue'),
						meta: {
							title: 'message.router.funGridLayout',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-tuodong',
						},
					},
					{
						path: '/fun/splitpanes',
						name: 'funSplitpanes',
						component: () => import('/@/views/fun/splitpanes/index.vue'),
						meta: {
							title: 'message.router.funSplitpanes',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon--chaifenlie',
						},
					},
				],
			},
			{
				path: '/pages',
				name: 'pagesIndex',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/pages/filtering',
				meta: {
					title: 'message.router.pagesIndex',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-fuzhiyemian',
				},
				children: [
					{
						path: '/pages/filtering',
						name: 'pagesFiltering',
						component: () => import('/@/views/pages/filtering/index.vue'),
						meta: {
							title: 'message.router.pagesFiltering',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-Sell',
						},
						/**
						 * 注意此处详情写法：
						 * 1、嵌套进父级里时，面包屑显示为：首页/页面/过滤筛选组件/过滤筛选组件详情
						 * 2、不嵌套进父级时，面包屑显示为：首页/页面/过滤筛选组件/过滤筛选组件详情
						 * 3、想要父级不高亮，面包屑显示为：首页/页面/过滤筛选组件详情，设置路径为：/pages/filteringDetails
						 */
						children: [
							{
								path: '/pages/filtering/details',
								name: 'pagesFilteringDetails',
								component: () => import('/@/views/pages/filtering/details.vue'),
								meta: {
									title: 'message.router.pagesFilteringDetails',
									link: '',
									isHide: true,
									noCache: false,
									isAffix: false,
									isIframe: false,
									roles: ['admin', 'common'],
									icon: 'ele-Sunny',
								},
							},
						],
					},
					{
						path: '/pages/filtering/details1',
						name: 'pagesFilteringDetails1',
						component: () => import('/@/views/pages/filtering/details1.vue'),
						meta: {
							title: 'message.router.pagesFilteringDetails1',
							link: '',
							isHide: true,
							noCache: false,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-Sunny',
						},
					},
					{
						path: '/pages/iocnfont',
						name: 'pagesIocnfont',
						component: () => import('/@/views/pages/iocnfont/index.vue'),
						meta: {
							title: 'message.router.pagesIocnfont',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-Present',
						},
					},
					{
						path: '/pages/element',
						name: 'pagesElement',
						component: () => import('/@/views/pages/element/index.vue'),
						meta: {
							title: 'message.router.pagesElement',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-Eleme',
						},
					},
					{
						path: '/pages/awesome',
						name: 'pagesAwesome',
						component: () => import('/@/views/pages/awesome/index.vue'),
						meta: {
							title: 'message.router.pagesAwesome',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-SetUp',
						},
					},
					{
						path: '/pages/formAdapt',
						name: 'pagesFormAdapt',
						component: () => import('/@/views/pages/formAdapt/index.vue'),
						meta: {
							title: 'message.router.pagesFormAdapt',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-biaodan',
						},
					},
					{
						path: '/pages/tableRules',
						name: 'pagesTableRules',
						component: () => import('/@/views/pages/tableRules/index.vue'),
						meta: {
							title: 'message.router.pagesTableRules',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-jiliandongxuanzeqi',
						},
					},
					{
						path: '/pages/formI18n',
						name: 'pagesFormI18n',
						component: () => import('/@/views/pages/formI18n/index.vue'),
						meta: {
							title: 'message.router.pagesFormI18n',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-diqiu',
						},
					},
					{
						path: '/pages/formRules',
						name: 'pagesFormRules',
						component: () => import('/@/views/pages/formRules/index.vue'),
						meta: {
							title: 'message.router.pagesFormRules',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-shuxing',
						},
					},
					{
						path: '/pages/listAdapt',
						name: 'pagesListAdapt',
						component: () => import('/@/views/pages/listAdapt/index.vue'),
						meta: {
							title: 'message.router.pagesListAdapt',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-chazhaobiaodanliebiao',
						},
					},
					{
						path: '/pages/waterfall',
						name: 'pagesWaterfall',
						component: () => import('/@/views/pages/waterfall/index.vue'),
						meta: {
							title: 'message.router.pagesWaterfall',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-zidingyibuju',
						},
					},
					{
						path: '/pages/steps',
						name: 'pagesSteps',
						component: () => import('/@/views/pages/steps/index.vue'),
						meta: {
							title: 'message.router.pagesSteps',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-step',
						},
					},
					{
						path: '/pages/preview',
						name: 'pagesPreview',
						component: () => import('/@/views/pages/preview/index.vue'),
						meta: {
							title: 'message.router.pagesPreview',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-15tupianyulan',
						},
					},
					{
						path: '/pages/waves',
						name: 'pagesWaves',
						component: () => import('/@/views/pages/waves/index.vue'),
						meta: {
							title: 'message.router.pagesWaves',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-bolangneng',
						},
					},
					{
						path: '/pages/tree',
						name: 'pagesTree',
						component: () => import('/@/views/pages/tree/index.vue'),
						meta: {
							title: 'message.router.pagesTree',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-shuxingtu',
						},
					},
					{
						path: '/pages/drag',
						name: 'pagesDrag',
						component: () => import('/@/views/pages/drag/index.vue'),
						meta: {
							title: 'message.router.pagesDrag',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-Pointer',
						},
					},
					{
						path: '/pages/lazyImg',
						name: 'pagesLazyImg',
						component: () => import('/@/views/pages/lazyImg/index.vue'),
						meta: {
							title: 'message.router.pagesLazyImg',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'ele-PictureFilled',
						},
					},
					{
						path: '/pages/dynamicForm',
						name: 'pagesDynamicForm',
						component: () => import('/@/views/pages/dynamicForm/index.vue'),
						meta: {
							title: 'message.router.pagesDynamicForm',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'iconfont icon-wenducanshu-05',
						},
					},
					{
						path: '/pages/workflow',
						name: 'pagesWorkflow',
						component: () => import('/@/views/pages/workflow/index.vue'),
						meta: {
							title: 'message.router.pagesWorkflow',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'ele-Connection',
						},
					},
				],
			},
			{
				path: '/make',
				name: 'makeIndex',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/make/selector',
				meta: {
					title: 'message.router.makeIndex',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin'],
					icon: 'iconfont icon-siweidaotu',
				},
				children: [
					{
						path: '/make/selector',
						name: 'makeSelector',
						component: () => import('/@/views/make/selector/index.vue'),
						meta: {
							title: 'message.router.makeSelector',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-xuanzeqi',
						},
					},
					{
						path: '/make/noticeBar',
						name: 'makeNoticeBar',
						component: () => import('/@/views/make/noticeBar/index.vue'),
						meta: {
							title: 'message.router.makeNoticeBar',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-Bell',
						},
					},
					{
						path: '/make/svgDemo',
						name: 'makeSvgDemo',
						component: () => import('/@/views/make/svgDemo/index.vue'),
						meta: {
							title: 'message.router.makeSvgDemo',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'fa fa-thumbs-o-up',
						},
					},
					{
						path: '/make/tableDemo',
						name: 'makeTableDemo',
						component: () => import('/@/views/make/tableDemo/index.vue'),
						meta: {
							title: 'message.router.makeTableDemo',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-shuju',
						},
					},
				],
			},
			{
				path: '/params',
				name: 'paramsIndex',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/params/common',
				meta: {
					title: 'message.router.paramsIndex',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin'],
					icon: 'iconfont icon-zhongduancanshu',
				},
				children: [
					{
						path: '/params/common',
						name: 'paramsCommon',
						component: () => import('/@/views/params/common/index.vue'),
						meta: {
							title: 'message.router.paramsCommon',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'iconfont icon-putong',
						},
					},
					{
						path: '/params/common/details',
						name: 'paramsCommonDetails',
						component: () => import('/@/views/params/common/details.vue'),
						meta: {
							title: 'message.router.paramsCommonDetails',
							link: '',
							isHide: true,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'ele-Comment',
						},
					},
					{
						path: '/params/dynamic',
						name: 'paramsDynamic',
						component: () => import('/@/views/params/dynamic/index.vue'),
						meta: {
							title: 'message.router.paramsDynamic',
							link: '',
							isHide: false,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'iconfont icon-dongtai',
						},
					},
					/**
					 * tagsViewName 为要设置不同的 "tagsView 名称" 字段
					 * 如若需设置不同 "tagsView 名称"，tagsViewName 字段必须要有
					 */
					{
						path: '/params/dynamic/details/:t/:id/:tagsViewName',
						name: 'paramsDynamicDetails',
						component: () => import('/@/views/params/dynamic/details.vue'),
						meta: {
							title: 'message.router.paramsDynamicDetails',
							link: '',
							isHide: true,
							noCache: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'ele-Lightning',
						},
					},
				],
			},
			{
				path: '/visualizing',
				name: 'visualizingIndex',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/visualizing/visualizingLinkDemo1',
				meta: {
					title: 'message.router.visualizingIndex',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin'],
					icon: 'ele-ChatLineRound',
				},
				/**
				 * 打开内置全屏
				 * component 都为 `() => import('/@/layout/routerView/link.vue')`
				 * link 链接为内置的路由地址，地址为 staticRoutes 中定义
				 */
				children: [
					{
						path: '/visualizing/visualizingLinkDemo1',
						name: 'visualizingLinkDemo1',
						component: () => import('/@/layout/routerView/link.vue'),
						meta: {
							title: 'message.router.visualizingLinkDemo1',
							link: '/visualizingDemo1',
							isHide: false,
							noCache: false,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'iconfont icon-caozuo-wailian',
						},
					},
					{
						path: '/visualizing/visualizingLinkDemo2',
						name: 'visualizingLinkDemo2',
						component: () => import('/@/layout/routerView/link.vue'),
						meta: {
							title: 'message.router.visualizingLinkDemo2',
							link: '/visualizingDemo2',
							isHide: false,
							noCache: false,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: 'iconfont icon-caozuo-wailian',
						},
					},
				],
			},
			{
				path: '/chart',
				name: 'chartIndex',
				component: () => import('/@/views/chart/index.vue'),
				meta: {
					title: 'message.router.chartIndex',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-ico_shuju',
				},
			},
			{
				path: '/personal',
				name: 'personal',
				component: () => import('/@/views/personal/index.vue'),
				meta: {
					title: 'message.router.personal',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-gerenzhongxin',
				},
			},
			{
				path: '/tools',
				name: 'tools',
				component: () => import('/@/views/tools/index.vue'),
				meta: {
					title: 'message.router.tools',
					link: '',
					isHide: false,
					noCache: true,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-gongju',
				},
			},
			// {
			// 	path: '/link',
			// 	name: 'layoutLinkView',
			// 	component: () => import('/@/layout/routerView/link.vue'),
			// 	meta: {
			// 		title: 'message.router.layoutLinkView',
			// 		link: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
			// 		isHide: false,
			// 		noCache: false,
			// 		isAffix: false,
			// 		isIframe: false,
			// 		roles: ['admin'],
			// 		icon: 'iconfont icon-caozuo-wailian',
			// 	},
			// },
			// {
			// 	path: '/iframesOne',
			// 	name: 'layoutIframeViewOne',
			// 	component: () => import('/@/layout/routerView/iframes.vue'),
			// 	meta: {
			// 		title: 'message.router.layoutIframeViewOne',
			// 		link: 'https://nodejs.org/zh-cn/',
			// 		isHide: false,
			// 		noCache: true,
			// 		isAffix: true,
			// 		isIframe: true,
			// 		roles: ['admin'],
			// 		icon: 'iconfont icon-neiqianshujuchucun',
			// 	},
			// },
			// {
			// 	path: '/iframesTwo',
			// 	name: 'layoutIframeViewTwo',
			// 	component: () => import('/@/layout/routerView/iframes.vue'),
			// 	meta: {
			// 		title: 'message.router.layoutIframeViewTwo',
			// 		link: 'https://undraw.co/illustrations',
			// 		isHide: false,
			// 		noCache: true,
			// 		isAffix: true,
			// 		isIframe: true,
			// 		roles: ['admin'],
			// 		icon: 'iconfont icon-neiqianshujuchucun',
			// 	},
			// },
		],
	},
];

/**
 * 定义404、401界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const notFoundAndNoPower = [
	{
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
			isHide: true,
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
			isHide: true,
		},
	}
];

/**
 * 定义组件路由
 * @description 用于开发时，不同功能的组件的路由，方便开发
 */
export const compontentRoutes = [
	{
		path: '/authRole',
		name: 'authRole',
		component: () => import('/@/views/system/role/authRole.vue'),
		meta: {
			title: '分配用户',
		},

	}, {
		path: '/personal',
		name: 'personal',
		component: () => import('/@/views/personal/index.vue'),
		meta: {
			title: 'message.router.personal',
			link: '',
			isHide: false,
			noCache: true,
			isAffix: false,
			isIframe: false,
			roles: ['admin', 'common'],
			icon: 'iconfont icon-gerenzhongxin',
		},
	},
];


/**
 * 定义静态路由（默认路由）
 * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	}
];
