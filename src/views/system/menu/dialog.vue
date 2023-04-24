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
								}" placeholder="请选择上级菜单" clearable class="w100" v-model="state.ruleForm.menuId">
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
					<template v-if="state.ruleForm.menuType === 'M'">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="目录路径">
								<el-input v-model="state.ruleForm.path" placeholder="目录路径/" clearable></el-input>
							</el-form-item>
						</el-col>
						<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否固定">
								<el-radio-group v-model="state.ruleForm.meta.isAffix">
									<el-radio :label="true">固定</el-radio>
									<el-radio :label="false">不固定</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col> -->
						<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否内嵌">
								<el-radio-group v-model="state.ruleForm.isIframe" @change="onSelectIframeChange">
									<el-radio :label="true">是</el-radio>
									<el-radio :label="false">否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col> -->
					</template>
					<template v-if="state.ruleForm.menuType === 'C'">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="路由名称">
								<el-input v-model="state.ruleForm.name" placeholder="路由中的 name 值" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="路由路径">
								<el-input v-model="state.ruleForm.path" placeholder="路由中的 path 值" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="重定向">
								<el-input v-model="state.ruleForm.redirect" placeholder="请输入路由重定向" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="组件路径">
								<el-input v-model="state.ruleForm.component" placeholder="组件路径" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="链接地址">
								<el-input v-model="state.ruleForm.isLink" placeholder="外链/内嵌时链接地址（http:xxx.com）" clearable
									:disabled="!state.ruleForm.isLink">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="权限标识">
								<el-input v-model="state.ruleForm.perms" placeholder="权限标识" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="页面缓存">
								<el-radio-group v-model="state.ruleForm.isCache">
									<el-radio label="0">缓存</el-radio>
									<el-radio label="1">不缓存</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否外链">
								<el-radio-group v-model="state.ruleForm.isFrame">
									<el-radio label="0">是</el-radio>
									<el-radio label="1">否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</template>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单状态">
							<el-switch v-model="state.ruleForm.status" active-value="0" inactive-value="1" inline-prompt
								active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否隐藏">
							<el-radio-group v-model="state.ruleForm.visible">
								<el-radio label="0">显示</el-radio>
								<el-radio label="1">隐藏</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单排序">
							<el-input-number v-model="state.ruleForm.orderNum" controls-position="right" placeholder="请输入排序"
								class="w100" />
						</el-form-item>
					</el-col>
					<template v-if="state.ruleForm.menuType === 'F'">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="权限标识">
								<el-input v-model="state.ruleForm.perms" placeholder="请输入权限标识" clearable></el-input>
							</el-form-item>
						</el-col>
					</template>
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
// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);
// 引入组件
const IconSelector = defineAsyncComponent(() => import('/@/components/iconSelector/index.vue'));
// 定义变量内容
const menuDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		createBy: "",
		createTime: "",
		updateBy: "",
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
		isFrame: "",// 是否为外链（0是 1否）
		isCache: "",// 是否缓存（0缓存 1不缓存）
		menuType: "",// 菜单类型（M目录 C菜单 F按钮）
		visible: "0",// 菜单状态（0显示 1隐藏）
		status: "0",// 菜单状态（0正常 1停用）
		perms: "",// 权限标识
		icon: "",// 菜单图标
		remark: "",// 备注
	} as RowMenuType,
	menuData: [
		{
			createBy: "",
			createTime: "",
			updateBy: "",
			updateTime: '',
			parentName: '',
			parentId: 0,
			orderNum: 0,// 显示排序
			path: "",// 路由地址
			component: '',// 组件路径
			queryParam: "",// 请求参数
			isFrame: "",// 是否为外链（0是 1否）
			isCache: "",// 是否缓存（0缓存 1不缓存）
			menuType: "",// 菜单类型（M目录 C菜单 F按钮）
			visible: "0",// 菜单状态（0显示 1隐藏）
			status: "0",// 菜单状态（0正常 1停用）
			perms: "",// 权限标识
			icon: "",// 菜单图标
			remark: "",// 备注
			menuId: 0,
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
		state.ruleForm = JSON.parse(JSON.stringify(row));
		initMenuInfo(row.menuId);
	} else {
		state.dialog.title = '新增菜单';
		state.dialog.submitTxt = '新 增';
		state.ruleForm = row ? JSON.parse(JSON.stringify(row)) : {
			createBy: '',
			createTime: '',
			updateBy: '',
			updateTime: '',
			parentName: '',
			parentId: 0,
			children: [],
			menuId: 0,
			menuName: '',
			orderNum: 0,
			path: '',
			component: '',
			queryParam: '',
			isFrame: '',
			isCache: '',
			menuType: '',
			visible: '0',
			status: '0',
			perms: '',
			icon: '',
			remark: '',
		};
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
		}
	} catch (err) {
		return Promise.reject(err);
	}
};

// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
	state.ruleForm = {
		createBy: "",
		createTime: "",
		updateBy: "",
		updateTime: '',
		parentName: '',
		parentId: 0,
		children: [],
		menuId: 0,
		menuName: "",
		orderNum: 0,
		path: "",
		component: '',
		queryParam: "",
		isFrame: "",
		isCache: "",
		menuType: "",
		visible: "0",
		status: "0",
		perms: "",
		icon: "",
		remark: "",
	};
	menuDialogFormRef.value?.resetFields();
	emit('refresh');
};
// 是否内嵌下拉改变
// const onSelectIframeChange = () => {
// 	if (state.ruleForm.meta.isIframe) state.ruleForm.isLink = true;
// 	else state.ruleForm.isLink = false;
// };
// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = () => {
	// eslint-disable-next-line no-console
	console.log(state.ruleForm);
	closeDialog(); // 关闭弹窗

};
// 页面加载时
onMounted(() => {

});

// 暴露变量
defineExpose({
	openDialog,
});
</script>
