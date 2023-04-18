import request from '/@/utils/request';

/**
 * 在线用户集合
 * @method list 查询在线用户列表
 * @method forceLogout 强退用户
 * @param tokenId 传递的参数
 * @param query 
 * @returns 
 */
export function useOnlineApi() {
  return {
    list: (query: any) => {
      return request({
        url: '/monitor/online/list',
        method: 'get',
        params: query
      })
    },
    forceLogout: (tokenId: string) => {
      return request({
        url: '/monitor/online/' + tokenId,
        method: 'delete'
      })
    }
  }
}
