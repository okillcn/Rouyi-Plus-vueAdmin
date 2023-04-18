<template>
	<div class="system-user-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="userDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账号">
							<el-input v-model="state.ruleForm.userName" placeholder="请输入账号"
								:disabled="state.dialog.type === 'edit'" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="密码">
							<el-input v-model="state.ruleForm.password" placeholder="请输入" type="password"
								:disabled="state.dialog.type === 'edit'" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="昵称">
							<el-input v-model="state.ruleForm.nickName" placeholder="请输入用户昵称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="性别">
							<el-select v-model="state.ruleForm.sex" placeholder="请选择" clearable class="w100">
								<el-option label="男" value="1"></el-option>
								<el-option label="女" value="0"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色">
							<el-select v-model="state.ruleForm.roleIds" multiple placeholder="请选择角色">
								<el-option v-for="item in state.roleData" :key="item.roleId" :label="item.roleName"
									:value="item.roleId" :disabled="item.status == '1'"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="所属部门">
							<el-cascader :options="state.DeptData" :props="{
								checkStrictly: true,
								value: 'id',
								label: 'label',
								children: 'children',
								leaf: 'leaf'
							}" filterable placeholder="请选择部门" clearable class="w100" v-model="state.ruleForm.deptId"
								@change="handleCascadeChange">
								<template #default="{ node, data }">
									<span>{{ data.label }}</span>
									<span v-if="!node.isLeaf"></span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="岗位">
							<el-select v-model="state.ruleForm.postIds" multiple placeholder="请选择岗位">
								<el-option v-for="item in state.postDate" :key="item.postId" :label="item.postName"
									:value="item.postId" :disabled="item.status == '1'"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号">
							<el-input v-model="state.ruleForm.phonenumber" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="邮箱">
							<el-input v-model="state.ruleForm.email" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户状态">
							<el-switch v-model="state.ruleForm.status" active-value="0" inactive-value="1" inline-prompt
								active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="用户描述">
							<el-input v-model="state.ruleForm.remark" type="textarea" placeholder="请输入用户描述"
								maxlength="150"></el-input>
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

<script setup lang="ts" name="systemUserDialog">
import { reactive, ref } from 'vue';
import { useUser } from '/@/api/system/user';
import { ElMessage } from 'element-plus';
// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const userDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		deptId: 0,
		userName: '',
		nickName: '',
		password: '',
		email: '',
		phonenumber: '',
		sex: '0',
		avatar: '',
		status: '0',
		delFlag: '0',
		loginIp: '',
		loginDate: '',
		remark: '',
		roles: 0,
		roleIds: [],
		postIds: [],
		roleId: 0
	},
	DeptData: [] as TreeType[],
	postDate: [] as RowPostType[],
	roleData: [] as RowRoleType[],
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});


/**
 * 打开对话框
 * @method openDialog()
 * @param {string} type - 对话框类型（edit-编辑，add-新增）
 * @param {RowUserType} row - 行数据
 * @param {TreeType[]} deptData - 部门数据
 * @Api getUser() 获取用户信息
 */
const openDialog = async (type: string, row: RowUserType, deptData: TreeType[]) => {
	state.DeptData = deptData;
	state.dialog.type = type;
	if (type === 'edit') {
		const res = await useUser().getUser(row.userId);
		if (res.code === 200) {
			const { user, postIds, roleIds, posts, roles } = res.data;
			state.ruleForm = user;
			state.ruleForm.password = '';
			state.ruleForm.postIds = postIds;
			state.ruleForm.roleIds = roleIds;
			state.postDate = posts;
			state.roleData = roles;
			state.dialog.title = '修改用户';
			state.dialog.submitTxt = '修 改';
		} else {
			ElMessage.error(res.msg);
			return;
		}
	} else {
		state.dialog.title = '新增用户';
		state.dialog.submitTxt = '新 增';
		state.ruleForm = row;
	}
	state.dialog.isShowDialog = true;
};

/**
 * 提交表单
 * @method onSubmit()
 * @Api addUser() 新增用户，updateUser() 更新用户信息
 */
const onSubmit = async () => {
	if (state.dialog.type === 'edit') {
		await handleEditUser();
	} else {
		await handleAddUser();
	}
};

/**
 * 编辑、更新用户信息
 * @method handleEditUser()
 * @Api updateUser() 更新用户信息
 */
const handleEditUser = async () => {
	const res = await useUser().updateUser(state.ruleForm);
	if (res.code === 200) {
		ElMessage.success(res.msg);
		onCancel();
	} else {
		ElMessage.error(res.msg);
	}
};

/**
 * 新增用户
 * @method handleAddUser()
 * @Api addUser() 新增用户
 */
const handleAddUser = async () => {
	const res = await useUser().addUser(state.ruleForm);
	if (res.code === 200) {
		ElMessage.success(res.msg);
		onCancel();
	} else {
		ElMessage.error(res.msg);
	}
};

/**级联选择器
 * @method handleCascadeChange()
 */
const handleCascadeChange = (val: any) => {
	if (Array.isArray(val) && val.length === 0) {
		return false;
	}
	state.ruleForm.deptId = val[val.length - 1];
};


// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
	emit('refresh');/* 刷新表格 */
};
// 暴露变量
defineExpose({
	openDialog,
});
</script>
