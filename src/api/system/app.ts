import request from '/@/utils/request';

/**
 * 应用管理集合
 * @method listApp 查询应用列表
 * @method listAppExcludeChild 查询应用列表（排除节点）
 * @method getApp 查询应用详细
 * @method addApp 新增应用
 * @method updateApp 修改应用
 * @method delApp 删除应用
 * @param appId 应用ID
 * @param query 
 * @returns 
 */

export function useApp() {
  return {
    listApp: (query:any) => {
      return request({
        url: '/10086/system/app/list',
        method: 'get',
        params: query
      })
    },
    listAppExcludeChild: (appId:any) => {
      return request({
        url: '/10086/system/app/list/exclude/' + appId,
        method: 'get'
      })
    },
    getApp: (appId:any) => {
      return request({
        url: '/10086/system/app/' + appId,
        method: 'get'
      })
    },
    addApp: (data:any) => {
      return request({
        url: '/10086/system/app',
        method: 'post',
        data: data
      })
    },
    updateApp: (data:any) => {
      return request({
        url: '/10086/system/app',
        method: 'put',
        data: data
      })
    },
    delApp: (appId:any) => {
      return request({
        url: '/10086/system/app/' + appId,
        method: 'delete'
      })
    }
  }
}

// Path: src\api\system\app.ts