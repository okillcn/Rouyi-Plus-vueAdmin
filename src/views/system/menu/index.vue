<template>
	<div class="system-menu-container layout-pd">
		<el-card shadow="hover">
			<div class="system-menu-search mb15">
				<el-input size="default" placeholder="请输入菜单名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="mt10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="mt10" @click="onOpenAddMenu">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增菜单
				</el-button>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" row-key="path"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
				<el-table-column label="菜单名称" show-overflow-tooltip width="200">
					<template #default="scope">
						<SvgIcon :name="scope.row.icon" />
						<span class="ml10">{{ scope.row.menuName }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="path" label="路由路径" show-overflow-tooltip></el-table-column>
				<el-table-column label="组件路径" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.component }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="perms" label="权限标识" show-overflow-tooltip></el-table-column>
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.$index }}
					</template>
				</el-table-column>
				<el-table-column label="类型" show-overflow-tooltip width="80">
					<template #default="scope">
						<el-tag type="success" size="small">{{ scope.row.xx }}菜单</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140" fixed="right">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenAddMenu('add',scope.row)">新增</el-button>
						<el-button size="small" text type="primary"
							@click="onOpenEditMenu('edit', scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<MenuDialog ref="menuDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemMenu">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useMenu } from '/@/api/system/menu';
import { handleTree } from '/@/utils/tool';
import { setBackEndControlRefreshRoutes } from '/@/router/backEnd';
const MenuDialog = defineAsyncComponent(() => import('/@/views/system/menu/dialog.vue'));
// 定义变量内容
const menuDialogRef = ref();
const state = reactive({
	tableData: {
		data: [] as RowMenuType[],
		loading: true,
	},
	param: {
		menuName: '',
	},
	dicts: ['sys_show_hide', 'sys_normal_disable'],
});

/**
 *  获取路由数据, 并处理成树形结构
 * @Api /system/menu/listMenu
 * @handleTree 处理成树形结构 /@/utils/tool
 */
 const getTableData = async () => {
  try {
    state.tableData.loading = true;
    const res = await useMenu().listMenu(state.param);
    state.tableData.data = handleTree(res.data, 'menuId', 'parentId', 'children');
  } catch (error) {
    ElMessage.error('获取数据失败');
    return Promise.reject(error);
  } finally {
    state.tableData.loading = false;
  }
};
// 打开新增菜单弹窗
const onOpenAddMenu = (type: string,row?: RowMenuType) => {
	menuDialogRef.value.openDialog(type, state.tableData.data, row);
};
// 打开编辑菜单弹窗
const onOpenEditMenu = (type: string, row: RowMenuType) => {
	menuDialogRef.value.openDialog(type, state.tableData.data, row);
};

/**
 * 删除菜单
 * @param row
 * @Api /system/menu/delMenu
 */
const onTabelRowDel = async (row: RowMenuType) => {
  try {
    await ElMessageBox.confirm(`此操作将永久删除路由：${row.path}, 是否继续?`, '提示', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    });
    const res = await useMenu().delMenu(row.menuId);
    if (res.code === 200) {
      getTableData();
      setBackEndControlRefreshRoutes();
    } else {
      ElMessage.error(res.msg);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
<style lang="scss" scoped>
.mt10 {
	max-width: 140px;
	margin: 10px 0 10px 10px;
}
</style>
