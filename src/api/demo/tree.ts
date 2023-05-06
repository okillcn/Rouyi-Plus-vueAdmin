import request from '/@/utils/request';

/**
 * 测试树表集合
 * @method listTree 查询测试树表列表
 * @method getTree 查询测试树表详细
 * @method addTree 新增测试树表
 * @method updateTree 修改测试树表
 * @method delTree 删除测试树表
 * @param {Object} data 传递的参数
 * @param {String} id 传递的参数
 * @returns 
 */
export function useTreeApi() {
  return {
    listTree: (query: object) => {
      return request({
        url: '/demo/tree/list',
        method: 'get',
        params: query
      })
    },
    getTree: (id: string) => {
      return request({
        url: '/demo/tree/' + id,
        method: 'get'
      })
    },
    addTree: (data: object) => {
      return request({
        url: '/demo/tree',
        method: 'post',
        data: data
      })
    },
    updateTree: (data: object) => {
      return request({
        url: '/demo/tree',
        method: 'put',
        data: data
      })
    },
    delTree: (id: string) => {
      return request({
        url: '/demo/tree/' + id,
        method: 'delete'
      })
    }
  }
}