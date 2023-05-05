<template>
	<div class="system-role-dialog-container system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-user-search">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-input size="default" placeholder="名称查询" v-model="state.tableData.param.userName"
							v-auth="'system:user:query'" class="mt10"></el-input>
						<el-input size="default" placeholder="手机号查询" v-model="state.tableData.param.phonenumber"
							v-auth="'system:user:query'" class="mt10"></el-input>
						<el-button size="default" class="mt10" type="info" plain @click="resetParamData()"
							v-auth="'system:user:query'">
							<el-icon>
								<ele-Refresh />
							</el-icon>
							重置
						</el-button>
						<el-button size="default" class="mt10" type="primary" plain v-auth="'system:user:query'"
							@click="getTableData()">
							<el-icon>
								<ele-Search />
							</el-icon>
							搜索
						</el-button>
						<el-button size="default" class="mt10" type="success" plain v-auth="'system:user:query'"
							@click="addAuthUser()">
							<el-icon>
								<ele-FolderAdd />
							</el-icon>
							添加授权用户
						</el-button>
						<el-button size="default" class="mt10" type="danger" plain v-auth="'system:user:query'"
							@click="cancelAuthUsers()">
							<el-icon>
								<ele-Delete />
							</el-icon>
							删除授权用户
						</el-button>
					</el-col>
				</el-row>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%"
				ref="multipleTableRef" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column prop="userId" label="用户id" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userName" label="账号" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="nickName" label="昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sex" label="性别" show-overflow-tooltip>
					<template #default="scope">
						<span v-if="scope.row.sex === '0'">男</span>
						<span v-else-if="scope.row.sex === '1'">女</span>
						<span v-else>未知</span>
					</template>
				</el-table-column>
				<el-table-column prop="phonenumber" label="手机号" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="用户状态" width="65" show-overflow-tooltip>
					<template #default="scope">
						<el-tag :type="scope.row.status === '0' ? 'success' : 'info'" active-value="0" inactive-value="1">
							{{ scope.row.status === '0' ? '启用' : '禁用' }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="loginIp" label="登录IP" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="120" show-overflow-tooltip
					sortable></el-table-column>
				<el-table-column label="操作" width="100" fixed="right">
					<template #default="scope">
						<el-button :disabled="scope.row.admin" size="small" text type="primary"
							@click="cancelAuthUser(scope.row)">取消授权</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
				:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="state.tableData.param.pageNum" background
				v-model:page-size="state.tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total">
			</el-pagination>
		</el-card>
		<authUserDialog ref="authUserDialogRef" @refresh="getTableData" />
	</div>
</template>

<script setup lang="ts" name="authRoleUser">
import { reactive, ref, defineAsyncComponent } from 'vue';
import { useRole } from '/@/api/system/role'
import { ElMessage, ElMessageBox, ElTable } from 'element-plus';
import { useRoute } from 'vue-router';


const authUserDialog = defineAsyncComponent(() => import('/@/views/system/role/addAuthUser.vue'));


const authUserDialogRef = ref();
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<RowUserType[]>([])

const state = reactive<SysUserState>({
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
			roleId: 0,
			userName: '',
			phonenumber: '',
		},
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '已经分配的用户',
		submitTxt: '',
	},
	dicts: ['sys_normal_disable', 'sys_user_sex'], // 字典数据 0-正常 1-禁用 0-男 1-女
});

/**
 * 初始化表格数据
 * @Api listUser（获取用户列表）
 * @param {Object} state.tableData.param
 */
const getTableData = () => {
	useRole().allocatedUserList(state.tableData.param).then((res: any) => {
		state.tableData.data = res.rows;
		state.tableData.total = res.total;
	});
};

/**
 * 接收Route传递的参数
 * @param {Object} route.query.roleId
 * @method getTableData
 * @description 根据roleId获取已经分配的用户列表
 */
const route = useRoute();
state.tableData.param.roleId = route.query.roleId as string;
if (state.tableData.param.roleId) {
	getTableData();
}


/**
 * 多选
 */
const handleSelectionChange = (val: RowUserType[]) => {
	multipleSelection.value = val
}

/**
 * 重置表格数据
 */
const resetParamData = () => {
	state.tableData.param = {
		pageNum: 1,
		pageSize: 10,
		roleId: state.tableData.param.roleId,
		userName: '',
		phonenumber: '',
	};
	getTableData();
};


/**
 * 添加授权用户
 */
const addAuthUser = () => {
	authUserDialogRef.value.openDialog(state.tableData.param.roleId);
};
/**
 * 取消授权
 */
const cancelAuthUser = (row: RowUserType) => {
	useRole().authUserCancel({ roleId: state.tableData.param.roleId, userId: row.userId }).then((res: any) => {
		if (res.code === 200) {
			ElMessage.success(res.msg);
			getTableData();
		} else {
			ElMessage.error(res.msg);
		}
	});
};
/**
 * 批量取消授权
 * @param rows
 */
const cancelAuthUsers = async () => {
	const confirmResult = await ElMessageBox.confirm('此操作将永久删除选中的用户，是否继续？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
	if (confirmResult !== 'confirm') {
		return
	}
	const userIds = multipleSelection.value.map((item: RowUserType) => item.userId).join(',');
	useRole().authUserCancelAll({ roleId: state.tableData.param.roleId, userIds: userIds }).then((res: any) => {
		if (res.code === 200) {
			ElMessage.success(res.msg);
			getTableData();
		} else {
			ElMessage.error(res.msg);
		}
	});
}

// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.pageNum = val;
	getTableData();
};
</script>

<style scoped lang="scss">
.system-user-container {
	:deep(.el-card__body) {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;

		.el-table {
			flex: 1;
		}

		.layout-padding-auto {
			padding: 0 0;

			.system-user-search {
				margin: 0 0;
			}
		}
	}
}

.mt10 {
	max-width: 140px;
	margin: 10px 0 10px 10px;
}
</style>
