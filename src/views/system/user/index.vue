<template>
	<div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-user-search">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-input size="default" placeholder="名称查询" v-model="state.tableData.param.userName"
							v-auth="'system:user:query'" class="mt10"></el-input>
						<el-input size="default" placeholder="手机号查询" v-model="state.tableData.param.phonenumber"
							v-auth="'system:user:query'" class="mt10"></el-input>
						<el-select size="default" placeholder="状态查询" v-model="state.tableData.param.status" class="mt10"
							v-auth="'system:user:query'">
							<el-option label="启用" value="0"></el-option>
							<el-option label="禁用" value="1"></el-option>
						</el-select>
						<el-form-item size="default" class="mt10" style="display: inline-block;"
							v-auth="'system:user:query'">
							<el-cascader size="default" :options="state.DeptData" :props="{
								checkStrictly: true,
								value: 'id',
								label: 'label',
								children: 'children',
								leaf: 'leaf'
							}" filterable placeholder="部门查询" clearable v-model="state.tableData.param.deptId" @change="handleCascadeChange">
								<template #default="{ node, data }">
									<span>{{ data.label }}</span>
									<span v-if="!node.isLeaf"></span>
								</template>
							</el-cascader>
						</el-form-item>
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
					</el-col>
					<el-col :span="24">
						<el-button size="default" class="mt10" type="success" plain v-auth="'system:user:add'"
							@click="onOpenAddUser('add')">
							<el-icon>
								<ele-FolderAdd />
							</el-icon>
							新增用户
						</el-button>
						<el-button size="default" class="mt10" type="danger" plain v-auth="'system:user:remove'"
							@click="onBatchDel(state.tableData.data)">
							<el-icon>
								<ele-Delete />
							</el-icon>
							批量删除
						</el-button>
						<el-button size="default" class="mt10" type="warning" plain v-auth="'system:user:import'"
							@click="state.upload.open = true">
							<el-icon>
								<ele-DocumentAdd />
							</el-icon>
							导入
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
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%"
				ref="multipleTableRef" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
				<el-table-column type="selection" width="55" />
				<el-table-column prop="userId" label="用户id" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="avatar" label="头像">
					<template #default="scope">
						<el-avatar :size="60" :src="scope.row.avatar">
							<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
						</el-avatar>
					</template>
				</el-table-column>
				<el-table-column prop="userName" label="账号" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="nickName" label="昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sex" label="性别" show-overflow-tooltip>
					<template #default="scope">
						<span v-if="scope.row.sex === '0'">男</span>
						<span v-else-if="scope.row.sex === '1'">女</span>
						<span v-else>未知</span>
					</template>
				</el-table-column>
				<el-table-column prop="dept.deptName" label="部门" width="120" show-overflow-tooltip></el-table-column>
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
							@click="onOpenEditUser('edit', scope.row)">修改</el-button>
						<el-button :disabled="scope.row.admin" size="small" text type="primary" @click="onRowDel(scope.row)"
							v-auth="'system:user:remove'">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
				:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="state.tableData.param.pageNum" background
				v-model:page-size="state.tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total">
			</el-pagination>
		</el-card>
		<!-- 用户导入对话框 -->
		<el-dialog :title="state.upload.title" v-model="state.upload.open" width="80%" append-to-body>
			<el-upload ref="uploadRef" :limit="1" accept=".xlsx, .xls" :headers="state.upload.headers"
				:action="state.upload.url + '?updateSupport=' + state.upload.updateSupport"
				:disabled="state.upload.isUploading" :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess"
				:auto-upload="false" drag>
				<i class="el-icon-upload"></i>
				<el-icon size="128"><ele-UploadFilled /></el-icon>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<template v-slot:tip>
					<div class="el-upload__tip text-center">
						<div class="el-upload__tip">
							<p>
								<el-checkbox v-model="state.upload.updateSupport" />
								<span>是否更新已经存在的用户数据</span>
								<el-link type="primary" :underline="false" @click="importTemplate">下载模板</el-link>
							</p>
						</div>
						<p><el-icon><ele-WarningFilled /></el-icon><span>仅允许导入xls、xlsx格式文件</span></p>
					</div>
				</template>
			</el-upload>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeUploadDialog" size="default">取 消</el-button>
					<el-button type="primary" @click="submitFileForm" size="default">确认</el-button>
				</span>
			</template>
		</el-dialog>
		<UserDialog ref="userDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage, ElTable } from 'element-plus';
import { useUser } from '/@/api/system/user';
import { Session } from '/@/utils/storage'
import { download } from '/@/utils/tool'
import type { UploadInstance } from 'element-plus'

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/system/user/dialog.vue'));

// 定义变量内容
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<RowUserType[]>([])

const uploadRef = ref<UploadInstance>()
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
	// 用户导入参数
	upload: {
		// 是否显示弹出层（用户导入）
		open: false,
		// 弹出层标题（用户导入）
		title: "用户导入",
		// 是否禁用上传
		isUploading: false,
		// 是否更新已经存在的用户数据
		updateSupport: 0,
		// 设置上传的请求头部
		headers: { Authorization: "Bearer " + Session.getToken() },
		// 上传的地址
		url: "/system/user/importData"
	},
	DeptData: [] as TreeType[], // 部门数据
	postDate: [] as TreeType[], // 岗位数据
	dicts: ['sys_normal_disable', 'sys_user_sex'], // 字典数据 0-正常 1-禁用 0-男 1-女
});


/**
 * 页面加载
 */
const handleSortChange = (val: any) => {
	// eslint-disable-next-line no-console
	console.log(val)
}

/**
 * 多选
 */
const handleSelectionChange = (val: RowUserType[]) => {
	multipleSelection.value = val
}
/** 导出按钮操作 */
const handleExport = () => {
	download('/system/user/export', { ...state.tableData.param }, `user_${new Date().getTime()}.xlsx`)

};
/** 下载模板操作 */
const importTemplate = () => {
	download('/system/user/importTemplate', {}, `user_template_${new Date().getTime()}.xlsx`)
};
// 文件上传中处理
const handleFileUploadProgress = () => {
	state.upload.isUploading = true;// 上传中，将上传状态设置为true

};
// 文件上传成功处理
const handleFileSuccess = (response: any) => {
	state.upload.isUploading = false;// 上传成功后，将上传状态设置为false
	if (response.code === 200) {
		ElMessage.success(response.msg);
		closeUploadDialog();
		getTableData();
	} else if (response.code === 500) {
		ElMessageBox.alert(
			response.msg,
			{
				dangerouslyUseHTMLString: true,
			}
		)
	} else {
		Promise.reject(response.msg);
		ElMessage.error(response.msg);
	}
};
/**
 * 文件上传处理
 */
const submitFileForm = () => {
	uploadRef.value!.submit();
};
/**
 * 关闭文件上传弹出层
 */
const closeUploadDialog = () => {
	state.upload.open = false;
	uploadRef.value!.clearFiles();
};

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
		}).then(async () => {
			const res = await useUser().delUser(row.userId);
			if (res.code === 200) {
				ElMessage.success(res.msg);
				getTableData();
			} else {
				ElMessage.error(res.msg);
			}
		}).catch(() => {
			ElMessage.info('已取消删除');
		});
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
}

.el-upload__tip {

	p {
		display: flex;
		align-items: center;

		.el-link {
			font-size: 12px;
			vertical-align: baseline;
		}
	}

	span {
		display: flex;
		align-items: center;
		margin: 0 8px;
	}


}
</style>
