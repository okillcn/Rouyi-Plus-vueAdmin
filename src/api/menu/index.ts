import request from '/@/utils/request';

/**
 * 菜单管理集合
 * @method getRouterMenu 获取路由菜单数据
 * @method listMenu 查询菜单列表
 * @method getMenu 查询菜单详细
 * @method treeselect 查询菜单下拉树结构
 * @method roleMenuTreeselect 根据角色ID查询菜单下拉树结构
 * @method addMenu 新增菜单
 * @method updateMenu 修改菜单
 * @method delMenu 删除菜单
 * @param menuId 菜单ID
 * @param roleId 角色ID
 * @param query 
 * @returns 
 */

export function useMenu() {
  return {
    getRouterMenu: () => {
      return request({
        url: '/10086/getRouters',
        method: 'get',
      })
    },
    listMenu: () => {
      return request({
        url: '/10086/system/menu/list',
        method: 'get',
      })
    },
    getMenu: (menuId:any) => {
      return request({
        url: '/10086/system/menu/' + menuId,
        method: 'get'
      })
    },
    treeselect: () => {
      return request({
        url: '/10086/system/menu/treeselect',
        method: 'get'
      })
    },
    roleMenuTreeselect: (roleId:any) => {
      return request({
        url: '/10086/system/menu/roleMenuTreeselect/' + roleId,
        method: 'get'
      })
    },
    addMenu: (data:any) => {
      return request({
        url: '/10086/system/menu',
        method: 'post',
        data: data
      })
    },
    updateMenu: (data:any) => {
      return request({
        url: '/10086/system/menu',
        method: 'put',
        data: data
      })
    },
    delMenu: (menuId:any) => {
      return request({
        url: '/10086/system/menu/' + menuId,
        method: 'delete'
      })
    }
  }
}

// Path: src\api\system\menu.ts