import request from '/@/utils/request';

/**
 * 测试demo集合
 * @method listDemo 查询测试单表列表
 * @method pageDemo 自定义分页接口
 * @method getDemo 查询测试单表详细
 * @method addDemo 新增测试单表
 * @method updateDemo 修改测试单表
 * @method delDemo 删除测试单表
 * @param {Object} data 传递的参数
 * @param {String} id 传递的参数
 * @returns 
 */
export function useDemoApi() {
  return {
    listDemo: (query: object) => {
      return request({
        url: '/demo/demo/list',
        method: 'get',
        params: query
      })
    },
    pageDemo: (query: object) => {
      return request({
        url: '/demo/demo/page',
        method: 'get',
        params: query
      })
    },
    getDemo: (id: string) => {
      return request({
        url: '/demo/demo/' + id,
        method: 'get'
      })
    },
    addDemo: (data: object) => {
      return request({
        url: '/demo/demo',
        method: 'post',
        data: data
      })
    },
    updateDemo: (data: object) => {
      return request({
        url: '/demo/demo',
        method: 'put',
        data: data
      })
    },
    delDemo: (id: string) => {
      return request({
        url: '/demo/demo/' + id,
        method: 'delete'
      })
    }
  }
}