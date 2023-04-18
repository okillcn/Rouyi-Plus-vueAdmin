import request from '/@/utils/request';

/**
 * 字典数据管理集合
 * @method listData 查询字典数据列表
 * @method getData 查询字典数据详细
 * @method getDicts 根据字典类型查询字典数据信息
 * @method addData 新增字典数据
 * @method updateData 修改字典数据
 * @method delData 删除字典数据
 * @method refreshCache 刷新字典缓存
 * @method optionselect 获取字典选择框列表
 * @param dictCode 字典编码
 * @param dictType 字典类型
 * @param query 
 * @returns 
 */
export function refreshCache() {
  return {
    listData: (query:any) => {
      return request({
        url: '/system/dict/data/list',
        method: 'get',
        params: query
      })
    },
    getData: (dictCode:any) => {
      return request({
        url: '/system/dict/data/' + dictCode,
        method: 'get'
      })
    },
    getDicts: (dictType:any) => {
      return request({
        url: '/system/dict/data/type/' + dictType,
        method: 'get'
      })
    },
    addData: (data:any) => {
      return request({
        url: '/system/dict/data',
        method: 'post',
        data: data
      })
    }
  }
}
