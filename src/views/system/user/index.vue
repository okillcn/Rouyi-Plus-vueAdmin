<template>
	<div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-user-search">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-input size="default" placeholder="请输入用户名称" v-model="state.tableData.param.userName"
							class="mt10"></el-input>
						<el-input size="default" placeholder="请输入手机号" v-model="state.tableData.param.phonenumber"
							class="mt10"></el-input>
						<el-select size="default" placeholder="请选择状态" v-model="state.tableData.param.status" class="mt10">
							<el-option label="启用" value="0"></el-option>
							<el-option label="禁用" value="1"></el-option>
						</el-select>
						<el-form-item size="default" class="mt10" style="display: inline-block;">
							<el-cascader size="default" :options="state.DeptData" :props="{
								checkStrictly: true,
								value: 'id',
								label: 'label',
								children: 'children',
								leaf: 'leaf'
							}" filterable placeholder="请选择部门" clearable v-model="state.tableData.param.deptId"
								@change="handleCascadeChange">
								<template #default="{ node, data }">
									<span>{{ data.label }}</span>
									<span v-if="!node.isLeaf"></span>
								</template>
							</el-cascader>
						</el-form-item>
						<el-button size="default" class="mt10" type="primary" @click="getTableData()">
							<el-icon>
								<ele-Search />
							</el-icon>
							搜索
						</el-button>
						<el-button size="default" class="mt10" type="info" @click="resetParamData()">
							<el-icon>
								<ele-Refresh />
							</el-icon>
							重置
						</el-button>
						<el-button size="default" class="mt10" type="success" @click="onOpenAddUser('add')">
							<el-icon>
								<ele-FolderAdd />
							</el-icon>
							新增用户
						</el-button>
						<el-button size="default" class="mt10" type="danger" @click="onBatchDel(state.tableData.data)">
							<el-icon>
								<ele-Delete />
							</el-icon>
							批量删除
						</el-button>
					</el-col>
				</el-row>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%"
				ref="multipleTableRef" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
				<el-table-column type="selection" width="55" />
				<el-table-column prop="userId" label="序号" width="60" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userName" label="账户名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="nickName" label="用户昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sex" label="性别" show-overflow-tooltip>
					<template #default="scope">
						<span v-if="scope.row.sex" active-value="0" inactive-value="1">男</span>
						<span v-else>女</span>
					</template>
				</el-table-column>
				<el-table-column prop="dept.deptName" label="部门" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phonenumber" label="手机号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="用户状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status" active-value="0" inactive-value="1">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="loginIp" label="登录IP" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip sortable></el-table-column>
				<el-table-column label="操作" width="100" fixed="right">
					<template #default="scope">
						<el-button :disabled="scope.row.admin" size="small" text type="primary"
							@click="onOpenEditUser('edit', scope.row)">修改</el-button>
						<el-button :disabled="scope.row.admin" size="small" text type="primary"
							@click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
				:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="state.tableData.param.pageNum" background
				v-model:page-size="state.tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total">
			</el-pagination>
		</el-card>
		<UserDialog ref="userDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage, ElTable } from 'element-plus';
import { useUser } from '/@/api/system/user';

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/system/user/dialog.vue'));
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<RowUserType[]>([])
// 定义变量内容
const userDialogRef = ref();
const state = reactive<SysUserState>({
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
			userName: '',
			phonenumber: '',
			status: '',
			deptId: ''
		},
	},
	DeptData: [] as TreeType[], // 部门数据
	postDate: [] as TreeType[], // 岗位数据
});



const handleSortChange = (val: any) => {
	// eslint-disable-next-line no-console
	console.log(val)
}


const handleSelectionChange = (val: RowUserType[]) => {
	multipleSelection.value = val
}


/**
 * 初始化表格数据
 * @Api listUser（获取用户列表）
 * @param {Object} state.tableData.param
 */
const getTableData = () => {
	state.tableData.loading = true;
	useUser().listUser(state.tableData.param).then((res: any) => {
		state.tableData.data = res.rows;
		state.tableData.total = res.total;
		state.tableData.loading = false;
	});
};
/**
 * 重置表格数据
 */
const resetParamData = () => {
	state.tableData.param = {
		pageNum: 1,
		pageSize: 10,
		userName: '',
		phonenumber: '',
		status: '',
		deptId: ''
	};
	getTableData();
};


/**
 * 初始化部门数据
 * @Api appTree（获取部门树）
 */
const getAppTree = () => {
	useUser().appTree().then((res: any) => {
		state.DeptData = res.data;
	});
};


/**级联选择器
 * @method handleCascadeChange()
 */
const handleCascadeChange = (val: any) => {
	if (Array.isArray(val) && val.length === 0) {
		return false;
	}
	state.tableData.param.deptId = val[val.length - 1];
};


// 打开新增用户弹窗
const onOpenAddUser = (type: string) => {
	userDialogRef.value.openDialog(type, {}, state.DeptData);
};
// 打开修改用户弹窗
const onOpenEditUser = (type: string, row: RowUserType) => {
	userDialogRef.value.openDialog(type, row, state.DeptData);
};
/**
 * 删除用户
 * @Api delUser（删除用户）
 * @param {Number} row.userId
 */
const onRowDel = async (row: RowUserType) => {
	try {
		await ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.userName}”，是否继续?`, '提示', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning'
		});
		const res = await useUser().delUser(row.userId);
		if (res.code === 200) {
			ElMessage.success(res.msg);
			getTableData();
		} else {
			ElMessage.error(res.msg);
		}
	} catch (error) {
		return Promise.reject(error);
	}
};
/**
 * 多选删除用户
 * @Api delUser（删除用户）
 * @param {Number} row.userId
 */
const onBatchDel = async (rows?: RowUserType[]) => {
	if (!rows || rows.length === 0) {
		multipleTableRef.value?.clearSelection()
		return
	}
	const confirmResult = await ElMessageBox.confirm('此操作将永久删除选中的用户，是否继续？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
	if (confirmResult !== 'confirm') {
		return
	}
	const deletePromises = rows.map((row) => useUser().delUser(row.userId))
	try {
		const results = await Promise.all(deletePromises)
		results.forEach((res) => {
			if (res.code === 200) {
				ElMessage.success(res.msg)
			} else {
				ElMessage.error(res.msg)
			}
		})
		getTableData()
	} catch (err) {
		return Promise.reject(err)
	}
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
// 页面加载时
onMounted(() => {
	getTableData();
	getAppTree();
});
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
}</style>
