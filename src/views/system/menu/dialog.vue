<template>
	<div class="system-menu-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="menuDialogFormRef" :model="state.ruleForm" size="default" label-width="80px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="上级菜单">
							<el-cascader :options="state.menuData" :props="{
								checkStrictly: true,
								value: 'menuId',
								label: 'menuName',
								children: 'children',
								parentId: 'parentId',
							}" placeholder="请选择上级菜单" @change="handleCascadeChange" clearable class="w100" v-model="state.ruleForm.parentId">
								<template #default="{ node, data }">
									<span>{{ data.menuName }}</span>
									<span v-if="!node.isLeaf"> ({{ data.menuId }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单类型">
							<el-radio-group v-model="state.ruleForm.menuType">
								<el-radio label="M">目录</el-radio>
								<el-radio label="C">菜单</el-radio>
								<el-radio label="F">按钮</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单名称">
							<el-input v-model="state.ruleForm.menuName" placeholder="菜单名字" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单图标">
							<IconSelector placeholder="请选择图标" v-model="state.ruleForm.icon" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-tooltip content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头" placement="top">
							<el-form-item label="路由地址">
								<el-input v-model="state.ruleForm.path" placeholder="例如：/user" clearable></el-input>
							</el-form-item>
						</el-tooltip>
					</el-col>
					<!-- <template v-if="state.ruleForm.menuType === 'M'">

					</template> -->
					<template v-if="state.ruleForm.menuType === 'C'">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="组件路径">
								<template #label>
									<el-tooltip effect="dark" content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top-start">
										<span>组件路径</span>
									</el-tooltip>
								</template>
								<el-input v-model="state.ruleForm.component" placeholder="例如：system/user/index"
									clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="传递参数">
								<template #label>
									<el-tooltip effect="dark" content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`' placement="top-start">
										<span>传递参数</span>
									</el-tooltip>
								</template>
								<el-input v-model="state.ruleForm.queryParam" placeholder='例如：{"id": 1, "name": "ry"}' clearable></el-input>
							</el-form-item>
						</el-col>
					</template>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						v-if="state.ruleForm.menuType === 'C' || state.ruleForm.menuType === 'F'">
						<el-form-item label="权限标识">
							<template #label>
								<el-tooltip effect="dark" content="控制器中定义的权限字符，如：@SaCheckPermission('system:user:list')"
									placement="top-start">
									<span>权限标识</span>
								</el-tooltip>
							</template>
							<el-input v-model="state.ruleForm.perms" placeholder="例如：system:user:list" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						v-if="state.ruleForm.menuType === 'C'">
						<el-form-item label="页面缓存">
							<el-radio-group v-model="state.ruleForm.isCache">
								<el-radio label="0">缓存</el-radio>
								<el-radio label="1">不缓存</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单状态">
							<el-switch v-model="state.ruleForm.status" active-value="0" inactive-value="1" inline-prompt
								active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否外链">
							<template #label>
								<el-tooltip effect="dark" content="选择是外链则路由地址需要以`http(s)://`开头" placement="top-start">
									<span>是否外链</span>
								</el-tooltip>
							</template>
							<el-radio-group v-model="state.ruleForm.isFrame">
								<el-radio label="0">是</el-radio>
								<el-radio label="1">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20" v-if="state.ruleForm.isFrame === '0'">
						<el-form-item label="内嵌窗口">
							<template #label>
								<el-tooltip effect="dark" content="外链地址是否内嵌窗口" placement="top-start">
									<span>内嵌窗口</span>
								</el-tooltip>
							</template>
							<el-radio-group v-model="state.ruleForm.isIframe">
								<el-radio label="0">是</el-radio>
								<el-radio label="1">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="显示状态">
							<el-radio-group v-model="state.ruleForm.visible">
								<el-radio label="0">显示</el-radio>
								<el-radio label="1">隐藏</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						v-if="state.ruleForm.menuType === 'C'">
						<el-form-item label="固定导航">
							<template #label>
								<el-tooltip effect="dark" content="将固定在tags-view导航栏中，不被删除" placement="top-start">
									<span>固定导航</span>
								</el-tooltip>
							</template>
							<el-radio-group v-model="state.ruleForm.isAffix">
								<el-radio label="0">是</el-radio>
								<el-radio label="1">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20"
						v-if="state.ruleForm.menuType === 'C' || state.ruleForm.menuType === 'M'">
						<el-form-item label="菜单排序">
							<el-input-number v-model="state.ruleForm.orderNum" controls-position="right" placeholder="请输入排序"
								class="w100" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemMenuDialog">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { useMenu } from '/@/api/system/menu';
import { ElMessage } from 'element-plus';
import { setBackEndControlRefreshRoutes } from '/@/router/backEnd';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);
// 引入组件
const IconSelector = defineAsyncComponent(() => import('/@/components/iconSelector/index.vue'));
// 定义变量内容
const menuDialogFormRef = ref();
const state = reactive({
	menuId: 0,
	ruleForm: {
		createBy: '',
		createTime: '',
		updateBy: '',
		updateTime: '',
		parentName: '',
		parentId: 0,
		children: [],// 子菜单
		menuId: 0,// 菜单ID
		menuName: "",// 菜单名称
		orderNum: 0,// 显示排序
		path: "",// 路由地址
		component: '',// 组件路径
		queryParam: "",// 请求参数
		isFrame: "1",// 是否为外链（0是 1否）
		isAffix: '1',// 是否固定标签(0是 1否)
		isIframe: '1',// 是否内嵌iframe(0是 1否)
		isCache: "1",// 是否缓存（0缓存 1不缓存）
		menuType: "M",// 菜单类型（M目录 C菜单 F按钮）
		visible: "0",// 菜单状态（0显示 1隐藏）
		status: "0",// 菜单状态（0正常 1停用）
		perms: "",// 权限标识
		icon: "",// 菜单图标
		remark: "",// 备注
	},
	menuData: [
		{
			createBy: '',
			createTime: '',
			updateBy: '',
			updateTime: '',
			parentName: '',
			parentId: 0,
			menuId: 0,// 菜单ID
			orderNum: 0,// 显示排序
			path: "",// 路由地址
			component: '',// 组件路径
			queryParam: "",// 请求参数
			isFrame: "1",// 是否为外链（0是 1否）
			isAffix: '1',// 是否固定标签(0是 1否)
			isIframe: '1',// 是否内嵌iframe(0是 1否)
			isCache: "1",// 是否缓存（0缓存 1不缓存）
			menuType: "M",// 菜单类型（M目录 C菜单 F按钮）
			visible: "0",// 菜单状态（0显示 1隐藏）
			status: "0",// 菜单状态（0正常 1停用）
			perms: "",// 权限标识
			icon: "",// 菜单图标
			menuName: '主类目',
			children: [] as any[]
		}
	] as RowMenuType[],
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});



// 打开弹窗
const openDialog = (type: string, menData: RowMenuType[], row?: any) => {
	state.dialog.type = type;
	state.menuData[0].children = menData;
	if (type === 'edit') {
		state.dialog.title = '修改菜单';
		state.dialog.submitTxt = '修 改';
		state.ruleForm = row
		initMenuInfo(row.menuId);
	} else {
		state.dialog.title = '新增菜单';
		state.dialog.submitTxt = '新 增';
		state.ruleForm = row ? row : state.ruleForm;
	}
	state.dialog.isShowDialog = true;
};

/**
 * 初始化获取菜单信息
 * @param {string} menuid 菜单id
 */
const initMenuInfo = async (menuid: string) => {
	try {
		const res = await useMenu().getMenu(menuid);
		if (res.code === 200) {
			state.ruleForm = res.data;
			state.menuId = res.data.menuId;
		}
	} catch (err) {
		return Promise.reject(err);
	}
};



// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = () => {
	// eslint-disable-next-line no-console
	console.log(state.ruleForm);
	if (state.dialog.type === 'edit') {
		editMenu();
	} else {
		addMenu();
	}
};

/**级联选择器
 * @method handleCascadeChange()
 */
const handleCascadeChange = (val: any) => {
	if (Array.isArray(val) && val.length === 0) {
		return false;
	}
	state.ruleForm.parentId = val[val.length - 1];
};

/**
 * 新增菜单
 */
const addMenu = async () => {
	try {
		menuDialogFormRef.value?.validate(async (valid: boolean) => {
			//菜单类型为菜单时，上级菜单不能为主类目
			if (state.ruleForm.menuType === 'C' && state.ruleForm.parentId === 0) {
				ElMessage({
					message: '菜单类型为菜单时，上级菜单不能为主类目',
					type: 'warning',
				});
				return false;
			}
			if (valid) {
				const params = {
					parentId: state.ruleForm.parentId,
					menuName: state.ruleForm.menuName,
					icon: state.ruleForm.icon,
					menuType: state.ruleForm.menuType,
					orderNum: state.ruleForm.orderNum,
					isFrame: state.ruleForm.isFrame,
					isCache: state.ruleForm.isCache,
					visible: state.ruleForm.visible,
					status: state.ruleForm.status,
					path: state.ruleForm.path,
					component: state.ruleForm.component,
					perms: state.ruleForm.perms,
					remark: state.ruleForm.remark,
					isAffix: state.ruleForm.isAffix,
					isIframe: state.ruleForm.isIframe,
				};
				const res = await useMenu().addMenu(params);
				if (res.code === 200) {
					ElMessage.success(res.msg);
					closeDialog();
				} else {
					ElMessage.error(res.msg);
				}
			} else {
				return false;
			}
		});
	} catch (err) {
		return Promise.reject(err);
	}
};

/**
 * 修改菜单
 */
const editMenu = async () => {
	try {
		//菜单类型为菜单时，上级菜单不能为主类目
		if (state.ruleForm.menuType === 'C' && state.ruleForm.parentId === 0) {
			ElMessage({
				message: '菜单类型为菜单时，上级菜单不能为主类目',
				type: 'warning',
			});
			return false;
		}
		const res = await useMenu().updateMenu(state.ruleForm);
		if (res.code === 200) {
			ElMessage.success(res.msg);
			closeDialog();
		} else {
			ElMessage.error(res.msg);
		}
	} catch (err) {
		return Promise.reject(err);
	}
};




// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
	state.ruleForm = {
		createBy: '',
		createTime: '',
		updateBy: '',
		updateTime: '',
		parentName: '',
		parentId: 0,
		children: [],// 子菜单
		menuId: 0,// 菜单ID
		menuName: "",// 菜单名称
		orderNum: 0,// 显示排序
		path: "",// 路由地址
		component: '',// 组件路径
		queryParam: "",// 请求参数
		isFrame: "1",// 是否为外链（0是 1否）
		isAffix: '1',
		isIframe: '1',
		isCache: "1",// 是否缓存（0缓存 1不缓存）
		menuType: "M",// 菜单类型（M目录 C菜单 F按钮）
		visible: "0",// 菜单状态（0显示 1隐藏）
		status: "0",// 菜单状态（0正常 1停用）
		perms: "",// 权限标识
		icon: "",// 菜单图标
		remark: "",// 备注
	};
	setBackEndControlRefreshRoutes();
	emit('refresh');
};
// 页面加载时
onMounted(() => {

});

// 暴露变量
defineExpose({
	openDialog,
});
</script>
<style lang="scss" scoped></style>
