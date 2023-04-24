<!-- eslint-disable no-console -->
<template>
	<div class="system-role-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="roleDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色名称">
							<el-input v-model="state.ruleForm.roleName" placeholder="请输入角色名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色标识">
							<template #label>
								<el-tooltip effect="dark" content="用于 `router/route.ts` meta.roles" placement="top-start">
									<span>角色标识</span>
								</el-tooltip>
							</template>
							<el-input v-model="state.ruleForm.roleKey" placeholder="请输入角色标识" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序">
							<el-input-number v-model="state.ruleForm.roleSort" :min="0" :max="999" controls-position="right"
								placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色状态">
							<el-switch v-model="state.ruleForm.status" active-value="0" inactive-value="1" inline-prompt
								active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单权限">
							<el-checkbox v-model="state.menu.menuNodeAll"
								@change="handleCheckedTreeNodeAll($event, 'menuTreeRef')">全选/全不选</el-checkbox>
							<el-checkbox v-model="state.ruleForm.menuCheckStrictly">父子联动</el-checkbox>
							<el-tree :data="state.menu.menuData" :props="state.menu.menuProps" node-key="id"
								highlight-current empty-text="加载中，请稍候" show-checkbox ref="menuTreeRef"
								:default-expanded-keys="state.ruleForm.menuIds"
								:check-strictly="!state.ruleForm.menuCheckStrictly"
								:default-checked-keys="state.ruleForm.menuIds" :expand-on-click-node="true"
								:render-after-expand='true' class="menu-data-tree" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20" v-if="state.dialog.type === 'edit'">
						<el-form-item label="权限范围">
							<el-select v-model="state.ruleForm.dataScope" @change="dataScopeSelectChange">
								<el-option v-for="item in state.dataScopeOptions" :key="item.value" :label="item.label"
									:value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20"
						v-if="state.dialog.type === 'edit' && state.ruleForm.dataScope === '2'">
						<el-form-item label="权限范围">
							<el-checkbox v-model="state.dept.deptNodeAll"
								@change="handleCheckedTreeNodeAll($event, 'deptTfeeRef')">全选/全不选</el-checkbox>
							<el-checkbox v-model="state.ruleForm.deptCheckStrictly">父子联动</el-checkbox>
							<el-tree :data="state.dept.deptData" :props="state.dept.deptProps" node-key="id"
								highlight-current empty-text="加载中，请稍候" show-checkbox ref="deptTfeeRef"
								:default-expanded-keys="state.ruleForm.deptIds"
								:check-strictly="!state.ruleForm.deptCheckStrictly"
								:default-checked-keys="state.ruleForm.deptIds" :expand-on-click-node="true"
								:render-after-expand='true' class="menu-data-tree" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="角色描述">
							<el-input v-model="state.ruleForm.remark" type="textarea" placeholder="请输入角色描述"
								maxlength="150"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemRoleDialog">
import { reactive, ref } from 'vue';
import { useMenu } from '/@/api/system/menu';
import { useRole } from '/@/api/system/role';
import { ElTree } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node'
// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);
const menuTreeRef = ref<InstanceType<typeof ElTree>>()
const deptTfeeRef = ref<InstanceType<typeof ElTree>>()
// 定义变量内容
const roleDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		createBy: '',
		createTime: '',
		updateBy: '',
		updateTime: '',
		roleId: 0,
		roleName: '',
		roleKey: '',
		roleSort: 0,
		dataScope: '0',
		menuCheckStrictly: true,
		deptCheckStrictly: true,
		status: '0',
		delFlag: '0',
		remark: '',
		flag: false,
		menuIds: [] as any[],
		deptIds: [] as any[],
		admin: false
	},
	menu: {
		menuExpand: true,
		menuNodeAll: false,
		menuData: [] as Node[],
		menuProps: {
			id: 'id',
			children: 'children',
			label: 'label',
			parentId: 'parentId',
			weight: 'weight',
		},
	},
	dept: {
		deptExpand: true,
		deptNodeAll: false,
		deptData: [] as Node[],
		deptProps: {
			id: 'id',
			children: 'children',
			label: 'label',
			parentId: 'parentId',
			weight: 'weight',
		},
	},
	dataScopeOptions: [
		{
			value: "1",
			label: "全部数据权限"
		},
		{
			value: "2",
			label: "自定数据权限"
		},
		{
			value: "3",
			label: "本部门数据权限"
		},
		{
			value: "4",
			label: "本部门及以下数据权限"
		},
		{
			value: "5",
			label: "仅本人数据权限"
		}
	],
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
	dicts: ['sys_normal_disable'],
});

/**
 * 获取菜单数据
 */
const handleCheckedTreeNodeAll = (checked: boolean, refName: string) => {
	if (refName === 'menuTreeRef') {
		menuTreeRef.value?.setCheckedKeys(checked ? state.menu.menuData.map((item) => item.id) : []);
	} else {
		deptTfeeRef.value?.setCheckedKeys(checked ? state.dept.deptData.map((item) => item.id) : []);
	}
};

/**
 * 打开弹窗
 * @param type
 * @param row
 */
const openDialog = (type: string, row: RowRoleType) => {
	state.dialog.type = type;
	if (type === 'edit') {
		state.ruleForm = row;
		state.dialog.title = '修改角色';
		state.dialog.submitTxt = '修 改';
		getRoleData(row.roleId);

	} else {
		state.dialog.title = '新增角色';
		state.dialog.submitTxt = '新 增';
		state.ruleForm = row;
		getMenuData();

	}
	state.dialog.isShowDialog = true;
};


/**
 * 提交表单
 */
const onSubmit = async () => {
	const menuIds = menuTreeRef.value?.getCheckedKeys() || [];
	const deptIds = deptTfeeRef.value?.getCheckedKeys() || [];
	const ruleForm = { ...state.ruleForm, menuIds, deptIds };
	try {
		if (state.dialog.type === 'edit') {
			await Promise.all([
				useRole().updateRole(ruleForm),
				useRole().dataScope(ruleForm)
			]);
		} else {
			await useRole().addRole(ruleForm);
		}
		onCancel();
	} catch (error) {
		return Promise.reject(error);
	}
};

/**
 * 获取用户信息和用户菜单权限
 * @param roleId
 */
const getRoleData = async (roleId: any) => {
	try {
		const [menuRes, deptRes] = await Promise.all([
			useMenu().roleMenuTreeselect(roleId),
			useRole().deptTreeSelect(roleId)
		]);
		state.menu.menuData = menuRes.data.menus;
		state.ruleForm.menuIds = menuRes.data.checkedKeys;
		state.dept.deptData = deptRes.data.depts;
		state.ruleForm.deptIds = deptRes.data.checkedKeys;
	} catch (error) {
		return Promise.reject(error);
	}
};

const dataScopeSelectChange = (value: string) => {
	if (value !== '2') {
		deptTfeeRef.value!.setCheckedKeys([]);
	}
};

/**
 * 获取菜单数据
 */
const getMenuData = async () => {
	try {
		state.ruleForm = {
			createBy: '',
			createTime: '',
			updateBy: '',
			updateTime: '',
			roleId: 0,
			roleName: '',
			roleKey: '',
			roleSort: 0,
			dataScope: '0',
			menuCheckStrictly: true,
			deptCheckStrictly: true,
			status: '0',
			delFlag: '0',
			remark: '',
			flag: false,
			menuIds: [] as any[],
			deptIds: [] as any[],
			admin: false
		}
		const res = await useMenu().treeselect();
		state.menu.menuData = res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
	emit('refresh');
};
// 暴露变量
defineExpose({
	openDialog,
});

</script>

<style scoped lang="scss">
.system-role-dialog-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
