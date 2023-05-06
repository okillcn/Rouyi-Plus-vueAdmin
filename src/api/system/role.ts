import request from '/@/utils/request';

/**
 * import request from '@/utils/request'

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/system/role/' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/system/role',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/system/role',
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: '/system/role/' + roleId,
    method: 'delete'
  })
}

// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: '/system/role/authUser/allocatedList',
    method: 'get',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: '/system/role/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: '/system/role/authUser/cancel',
    method: 'put',
    data: data
  })
}

// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return request({
    url: '/system/role/authUser/cancelAll',
    method: 'put',
    params: data
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: '/system/role/authUser/selectAll',
    method: 'put',
    params: data
  })
}

// 根据角色ID查询部门树结构
export function deptTreeSelect(roleId) {
  return request({
    url: '/system/role/deptTree/' + roleId,
    method: 'get'
  })
}

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
    /**
     * 查询角色列表
     * @url /system/role/list
     * @param query
     * @returns
     * */
    listRole: (query:any) => {
      return request({
        url: '/system/role/list',
        method: 'get',
        params: query
      })
    },
    getRole: (roleId:any) => {
      return request({
        url: '/system/role/' + roleId,
        method: 'get'
      })
    },
    addRole: (data:any) => {
      return request({
        url: '/system/role',
        method: 'post',
        data: data
      })
    },
    updateRole: (data:any) => {
      return request({
        url: '/system/role',
        method: 'put',
        data: data
      })
    },
    dataScope: (data:any) => {
      return request({
        url: '/system/role/dataScope',
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
        url: '/system/role/changeStatus',
        method: 'put',
        data: data
      })
    },
    delRole: (roleId:any) => {
      return request({
        url: '/system/role/' + roleId,
        method: 'delete'
      })
    },
    allocatedUserList: (query:any) => {
      return request({
        url: '/system/role/authUser/allocatedList',
        method: 'get',
        params: query
      })
    },
    /**
     * 查询角色未授权用户列表
     * @url /system/role/authUser/unallocatedList
     * @param query 
     * @returns 
     */
    unallocatedUserList: (query:any) => {
      return request({
        url: '/system/role/authUser/unallocatedList',
        method: 'get',
        params: query
      })
    },
    authUserCancel: (data:any) => {
      return request({
        url: '/system/role/authUser/cancel',
        method: 'put',
        data: data
      })
    },
    authUserCancelAll: (data:any) => {
      return request({
        url: '/system/role/authUser/cancelAll',
        method: 'put',
        params: data
      })
    },
    authUserSelectAll: (data:any) => {
      return request({
        url: '/system/role/authUser/selectAll',
        method: 'put',
        params: data
      })
    },
    deptTreeSelect: (roleId:any) => {
      return request({
        url: '/system/role/deptTree/' + roleId,
        method: 'get'
      })
    }
  }
}

// Path: src\api\system\role.ts