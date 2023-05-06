import request from '/@/utils/request';
/**
 * OSS对象存储管理集合
 * @method listOss 查询OSS对象存储列表
 * @method listByIds 查询OSS对象基于id串
 * @method delOss 删除OSS对象存储
 * @param ossId OSS对象存储ID
 * @param query 
 * @returns 
 */
export function useOss() {
  return {
    listOss: (query:any) => {
      return request({
        url: '/system/oss/list',
        method: 'get',
        params: query
      })
    },
    listByIds: (ossId:any) => {
      return request({
        url: '/system/oss/listByIds/' + ossId,
        method: 'get'
      })
    },
    delOss: (ossId:any) => {
      return request({
        url: '/system/oss/' + ossId,
        method: 'delete'
      })
    }
  }
}

// Path: src\api\system\oss.ts