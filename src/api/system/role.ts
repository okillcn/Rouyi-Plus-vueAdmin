import request from '/@/utils/request';

/**
 * 角色管理集合
 * @method listRole 查询角色列表
 * @method getRole 查询角色详细
 * @method addRole 新增角色
 * @method updateRole 修改角色
 * @method dataScope 角色数据权限
 * @method changeRoleStatus 修改角色状态
 * @method delRole 删除角色
 * @method allocatedUserList 查询角色下已授权用户列表
 * @method unallocatedUserList 查询角色下未授权用户列表
 * @method authUserCancel 取消用户授权角色
 * @method authUserCancelAll 批量取消用户授权角色
 * @method authUserSelectAll 授权用户选择
 * @method deptTreeSelect 根据角色查询应用下拉树结构
 * @param roleId 角色ID
 * @param query
 * @returns
 * */
 
export function useRole() {
  return {
    listRole: (query:any) => {
      return request({
        url: '/10086/system/role/list',
        method: 'get',
        params: query
      })
    },
    getRole: (roleId:any) => {
      return request({
        url: '/10086/system/role/' + roleId,
        method: 'get'
      })
    },
    addRole: (data:any) => {
      return request({
        url: '/10086/system/role',
        method: 'post',
        data: data
      })
    },
    updateRole: (data:any) => {
      return request({
        url: '/10086/system/role',
        method: 'put',
        data: data
      })
    },
    dataScope: (data:any) => {
      return request({
        url: '/10086/system/role/dataScope',
        method: 'put',
        data: data
      })
    },
    changeRoleStatus: (roleId:any, status:any) => {
      const data = {
        roleId,
        status
      }
      return request({
        url: '/10086/system/role/changeStatus',
        method: 'put',
        data: data
      })
    },
    delRole: (roleId:any) => {
      return request({
        url: '/10086/system/role/' + roleId,
        method: 'delete'
      })
    },
    allocatedUserList: (roleId:any, query:any) => {
      return request({
        url: '/10086/system/role/allocatedUserList/' + roleId,
        method: 'get',
        params: query
      })
    },
    unallocatedUserList: (roleId:any, query:any) => {
      return request({
        url: '/10086/system/role/unallocatedUserList/' + roleId,
        method: 'get',
        params: query
      })
    },
    authUserCancel: (roleId:any, userIds:any) => {
      return request({
        url: '/10086/system/role/authUserCancel/' + roleId,
        method: 'delete',
        params: { userIds }
      })
    },
    authUserCancelAll: (roleId:any, userIds:any) => {
      return request({
        url: '/10086/system/role/authUserCancelAll/' + roleId,
        method: 'delete',
        params: { userIds }
      })
    },
    authUserSelectAll: (roleId:any, userIds:any) => {
      return request({
        url: '/10086/system/role/authUserSelectAll/' + roleId,
        method: 'post',
        params: { userIds }
      })
    },
    deptTreeSelect: (roleId:any) => {
      return request({
        url: '/10086/system/role/deptTree/' + roleId,
        method: 'get'
      })
    }
  }
}

// Path: src\api\system\role.ts