import request from '/@/utils/request';

/**
 * 字典类型管理集合
 * @method listType 查询字典类型列表
 * @method getType 查询字典类型详细
 * @method addType 新增字典类型
 * @method updateType 修改字典类型
 * @method delType 删除字典类型
 * @method refreshCache 刷新字典缓存
 * @method optionselect 获取字典选择框列表
 * @param dictId 字典主键
 * @param dictName 字典名称
 * @param query 
 * @returns 
 */
export function useDictType() {
  return {
    listType: (query:any) => {
      return request({
        url: '/system/dict/type/list',
        method: 'get',
        params: query
      })
    },
    getType: (dictId:any) => {
      return request({
        url: '/system/dict/type/' + dictId,
        method: 'get'
      })
    },
    addType: (data:any) => {
      return request({
        url: '/system/dict/type',
        method: 'post',
        data: data
      })
    },
    updateType: (data:any) => {
      return request({
        url: '/system/dict/type',
        method: 'put',
        data: data
      })
    },
    delType: (dictId:any) => {
      return request({
        url: '/system/dict/type/' + dictId,
        method: 'delete'
      })
    },
    refreshCache: () => {
      return request({
        url: '/system/dict/type/refreshCache',
        method: 'delete'
      })
    },
    optionselect: () => {
      return request({
        url: '/system/dict/type/optionselect',
        method: 'get'
      })
    }
  }
}
