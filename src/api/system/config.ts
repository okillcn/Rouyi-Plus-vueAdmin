import request from '/@/utils/request';

/**
 * 参数管理集合
 * @method listConfig 查询参数列表
 * @method getConfig 查询参数详细
 * @method getConfigKey 根据参数键名查询参数值
 * @method addConfig 新增参数配置
 * @method updateConfig 修改参数配置
 * @method updateConfigByKey 修改参数配置
 * @method delConfig 删除参数配置
 * @param configId 参数主键
 * @param configKey 参数键名
 * @param query 
 * @returns 
 */

export function useConfig() {
  return {
    listConfig: (query:any) => {
      return request({
        url: '/10086/system/config/list',
        method: 'get',
        params: query
      })
    },
    getConfig: (configId:any) => {
      return request({
        url: '/10086/system/config/' + configId,
        method: 'get'
      })
    },
    getConfigKey: (configKey:any) => {
      return request({
        url: '/10086/system/config/configKey/' + configKey,
        method: 'get'
      })
    },
    addConfig: (data:any) => {
      return request({
        url: '/10086/system/config',
        method: 'post',
        data: data
      })
    },
    updateConfig: (data:any) => {
      return request({
        url: '/10086/system/config',
        method: 'put',
        data: data
      })
    },
    updateConfigByKey: (key:any, value:any) => {
      return request({
        url: '/10086/system/config/updateByKey',
        method: 'put',
        data: {
          configKey: key,
          configValue: value
        }
      })
    },
    delConfig: (configId:any) => {
      return request({
        url: '/10086/system/config/' + configId,
        method: 'delete'
      })
    },
    refreshCache: () => {
      return request({
        url: '/10086/system/config/refreshCache',
        method: 'delete'
      })
    }
  }
}

// Path: src\api\system\config.ts