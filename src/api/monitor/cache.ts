import request from '/@/utils/request';


/**
 * 缓存监控集合
 * @method getCache 查询缓存详细
 * @method listCacheName 查询缓存名称列表
 * @method listCacheKey 查询缓存键名列表
 * @method getCacheValue 查询缓存内容
 * @method clearCacheName 清理指定名称缓存
 * @method clearCacheKey 清理指定键名缓存
 * @method clearCacheAll 清理全部缓存
 * @param {String} cacheName 传递的参数
 * @param {String} cacheKey 传递的参数
 * @returns 
 */
export function useCacheApi() {
  return {
    getCache: () => {
      return request({
        url: '/10086/monitor/cache',
        method: 'get'
      })
    },
    listCacheName: () => {
      return request({
        url: '/10086/monitor/cache/getNames',
        method: 'get'
      })
    },
    listCacheKey: (cacheName: string) => {
      return request({
        url: '/10086/monitor/cache/getKeys/' + cacheName,
        method: 'get'
      })
    },
    getCacheValue: (cacheName: string, cacheKey: string) => {
      return request({
        url: '/10086/monitor/cache/getValue/' + cacheName + '/' + cacheKey,
        method: 'get'
      })
    },
    clearCacheName: (cacheName: string) => {
      return request({
        url: '/10086/monitor/cache/clearCacheName/' + cacheName,
        method: 'delete'
      })
    },
    clearCacheKey: (cacheName: string, cacheKey: string) => {
      return request({
        url: '/10086/monitor/cache/clearCacheKey/'+ cacheName + "/" + cacheKey,
        method: 'delete'
      })
    },
    clearCacheAll: () => {
      return request({
        url: '/10086/monitor/cache/clearCacheAll',
        method: 'delete'
      })
    }
  }
}

// Path: src\api\monitor\config.ts