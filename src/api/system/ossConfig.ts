import request from '/@/utils/request';

/**
 * OssConfig对象存储配置管理集合
 * @method listOssConfig 查询对象存储配置列表
 * @method getOssConfig 查询对象存储配置详细
 * @method addOssConfig 新增对象存储配置
 * @method updateOssConfig 修改对象存储配置
 * @method delOssConfig 删除对象存储配置
 * @method changeOssConfigStatus 对象存储状态修改
 * @param ossConfigId 对象存储配置ID
 * @param status 状态
 * @param query 
 * @returns 
 */
export function useOssConfig() {
  return {
    listOssConfig: (query:any) => {
      return request({
        url: '/10086/system/oss/config/list',
        method: 'get',
        params: query
      })
    },
    getOssConfig: (ossConfigId:any) => {
      return request({
        url: '/10086/system/oss/config/' + ossConfigId,
        method: 'get'
      })
    },
    addOssConfig: (data:any) => {
      return request({
        url: '/10086/system/oss/config',
        method: 'post',
        data: data
      })
    },
    updateOssConfig: (data:any) => {
      return request({
        url: '/10086/system/oss/config',
        method: 'put',
        data: data
      })
    },
    delOssConfig: (ossConfigId:any) => {
      return request({
        url: '/10086/system/oss/config/' + ossConfigId,
        method: 'delete'
      })
    },
    changeOssConfigStatus: (ossConfigId:any, status:any, configKey:any) => {
      const data = {
        ossConfigId,
        status,
        configKey
      }
      return request({
        url: '/10086/system/oss/config/changeStatus',
        method: 'put',
        data: data
      })
    }
  }
}

// Path: src\api\system\ossConfig.ts