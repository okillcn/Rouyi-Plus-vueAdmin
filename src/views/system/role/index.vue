<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<div class="system-user-search">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-input size="default" placeholder="请输入角色名称" v-model="state.tableData.param.roleName"
							class="mt10"></el-input>
						<el-input size="default" placeholder="请输入权限字符" v-model="state.tableData.param.roleKey"
							class="mt10"></el-input>
						<el-select size="default" placeholder="请选择状态" v-model="state.tableData.param.status" class="mt10">
							<el-option label="启用" value="0"></el-option>
							<el-option label="禁用" value="1"></el-option>
						</el-select>
						<el-form-item size="default" class="mt10" style="max-width: 250px;">
							<el-date-picker v-model="state.tableData.dateRange" type="daterange" range-separator="至"
								start-placeholder="开始时间" end-placeholder="结束时间" />
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
						<el-button size="default" class="mt10" type="success" @click="onOpenAddRole('add')">
							<el-icon>
								<ele-FolderAdd />
							</el-icon>
							添加角色
						</el-button>
						<el-button size="default" class="mt10" type="primary" plain v-auth="'system:user:export'"
							@click="handleExport">
							<el-icon>
								<ele-Upload />
							</el-icon>
							导出
						</el-button>
					</el-col>
				</el-row>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">
				<el-table-column prop="roleId" label="ID" width="60" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleName" label="角色名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleKey" label="角色标识" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleSort" label="排序" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="角色状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag :type="scope.row.status === '0' ? 'success' : 'info'" active-value="0" inactive-value="1">
							{{ scope.row.status === '0' ? '启用' : '禁用' }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="角色描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100" fixed="right">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenEditRole('edit', scope.row)"
							:disabled="scope.row.admin">修改</el-button>
						<el-button :disabled="scope.row.admin" size="small" text type="primary"
							@click="onRowDel(scope.row)">删除</el-button>
						<el-button :disabled="scope.row.admin" size="small" text type="primary"
							@click="onOpenRoleUser(scope.row.roleId)">分配的用户</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
				:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="state.tableData.param.pageNum" background
				v-model:page-size="state.tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total">
			</el-pagination>
		</div>
		<RoleDialog ref="roleDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemRole">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage, dayjs } from 'element-plus';
import { useRole } from '/@/api/system/role';
import router from '/@/router';
import { download } from '/@/utils/tool';
// 引入组件
const RoleDialog = defineAsyncComponent(() => import('/@/views/system/role/dialog.vue'));
// 定义变量内容
const roleDialogRef = ref();
const state = reactive({
	tableData: {
		data: [],
		total: 0,
		loading: false,
		dateRange: [], // 时间范围
		param: {
			pageNum: 1,
			pageSize: 10,
			roleName: undefined,
			roleKey: undefined,
			status: undefined
		},
		dicts: ['sys_normal_disable'],
	}
});

// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
	let param = {};
	if (state.tableData.dateRange && state.tableData.dateRange.length > 0) {
		param = {
			...state.tableData.param,
			'params[beginTime]': dayjs(state.tableData.dateRange[0]).format('YYYY-MM-DD'),
			'params[endTime]': dayjs(state.tableData.dateRange[1]).format('YYYY-MM-DD')
		};
	} else {
		param = { ...state.tableData.param };
	}
	useRole()
		.listRole(param)
		.then((res) => {
			state.tableData.data = res.rows;
			state.tableData.total = res.data.total;
		})
		.catch(() => { })
		.finally(() => {
			state.tableData.loading = false;
		});
};

/**
 *  重置搜索条件
 */
const resetParamData = () => {
	state.tableData.param = {
		pageNum: 1,
		pageSize: 10,
		roleName: undefined,
		roleKey: undefined,
		status: undefined
	};
	state.tableData.dateRange = [];
	getTableData();
};

// 打开新增角色弹窗
const onOpenAddRole = (type: string) => {
	roleDialogRef.value.openDialog(type);
};
// 打开修改角色弹窗
const onOpenEditRole = (type: string, row: Object) => {
	roleDialogRef.value.openDialog(type, row);
};
// 打开角色分配用户弹窗
const onOpenRoleUser = (roleId: number) => {
	// authUserDialogRef.value.openDialog(roleId,roleName);
	router.push({ path: '/authRole', query: { roleId: roleId } })
};
/** 导出按钮操作 */
const handleExport = () => {
	download('/10086/system/role/export', { ...state.tableData.param }, `role_${new Date().getTime()}.xlsx`)
}

/**
 * 删除角色
 * @Api delRole
 * @param {Number} row.roleId 角色ID
 */
const onRowDel = async (row: RowRoleType) => {
	try {
		await ElMessageBox.confirm(`此操作将永久删除角色：“${row.roleName}”，是否继续?`, '提示', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning'
		});
		const res = await useRole().delRole(row.roleId);
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
});
</script>

<style scoped lang="scss">
.system-role-container {
	.system-role-padding {
		padding: 15px;

		.el-table {
			flex: 1;
		}
	}
}

.mt10 {
	max-width: 140px;
	margin: 10px 0 10px 10px;
}
</style>
