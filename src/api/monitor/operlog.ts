import request from '/@/utils/request';


/**
 * 操作日志集合
 * @method list 查询操作日志列表
 * @method delOperlog 删除操作日志
 * @method cleanOperlog 清空操作日志
 * @param operId 传递的参数
 * @param userName 传递的参数
 * @param infoId 传递的参数
 * @param query 
 * @returns 
 */
export function useOperlogApi() {
  return {
    list: (query: any) => {
      return request({
        url: '/monitor/operlog/list',
        method: 'get',
        params: query
      })
    },
    delOperlog: (operId: string) => {
      return request({
        url: '/monitor/operlog/' + operId,
        method: 'delete'
      })
    },
    cleanOperlog: () => {
      return request({
        url: '/monitor/operlog/clean',
        method: 'delete'
      })
    }
  }
}
