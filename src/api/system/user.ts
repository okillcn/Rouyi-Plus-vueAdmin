import request from '/@/utils/request';
import { parseStrEmpty } from "/@/utils/tool";

/**
 * 用户管理集合
 * @method listUser 查询用户列表
 * @method getUser 查询用户详细
 * @method getUsers 查询用户下拉树结构
 * @method addUser 新增用户
 * @method updateUser 修改用户
 * @method delUser 删除用户
 * @method resetUserPwd 用户密码重置
 * @method changeUserStatus 用户状态修改
 * @method getUserProfile 查询用户个人信息
 * @method updateUserProfile 修改用户个人信息
 * @method updateUserPwd 用户密码重置
 * @method uploadAvatar 用户头像上传
 * @method getAuthRole 获取用户授权角色
 * @method updateAuthRole 更新用户授权角色
 * @method appTree 获取用户授权应用下拉树结构
 * @param userId 用户ID
 * @param status 状态
 * @param query
 * @returns
 * */

export function useUser() {
  return {
      listUser: (query:any) => {
        return request({
          url: '/system/user/list',
          method: 'get',
          params: query
        })
      },
      getUser: (userId: any) => {
        return request({
          url: '/system/user/' + parseStrEmpty(userId),
          method: 'get'
        })
      },
      getUsers: () => {
        return request({
          url: '/system/user/',
          method: 'get'
        })
      },
      addUser: (data:any) => {
        return request({
          url: '/system/user',
          method: 'post',
          data: data
        })
      },
      updateUser: (data:any) => {
        return request({
          url: '/system/user',
          method: 'put',
          data: data
        })
      },
      delUser: (userId:any) => {
        return request({
          url: '/system/user/' + userId,
          method: 'delete'
        })
      },
      resetUserPwd: (userId:any, password:any) => {
        const data = {
          userId,
          password
        }
        return request({
          url: '/system/user/resetPwd',
          method: 'put',
          data: data
        })
      },
      changeUserStatus: (userId:any, status:any) => {
        const data = {
          userId,
          status
        }
        return request({
          url: '/system/user/changeStatus',
          method: 'put',
          data: data
        })
      },
      getUserProfile: () => {
        return request({
          url: '/system/user/profile',
          method: 'get'
        })
      },
      updateUserProfile: (data:any) => {
        return request({
          url: '/system/user/profile',
          method: 'put',
          data: data
        })
      },
      updateUserPwd: (oldPassword:any, newPassword:any) => {
        const data = {
          oldPassword,
          newPassword
        }
        return request({
          url: '/system/user/profile/updatePwd',
          method: 'put',
          data: data
        })
      },
      uploadAvatar: (data:any) => {
        return request({
          url: '/system/user/profile/avatar',
          method: 'post',
          data: data
        })
      },
      getAuthRole: (userId:any) => {
        return request({
          url: '/system/user/authRole/' + userId,
          method: 'get'
        })
      },
      updateAuthRole: (userId:any, roleIds:any) => {
        const data = {
          userId,
          roleIds
        }
        return request({
          url: '/system/user/authRole',
          method: 'put',
          data: data
        })
      },
      appTree: () => {
        return request({
          url: '/system/user/deptTree',
          method: 'get'
        })
      }
  }
}