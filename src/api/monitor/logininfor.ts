import request from '/@/utils/request';
/**
 * 登录日志集合
 * @method list 查询登录日志列表
 * @method delLogininfor 删除登录日志
 * @method unlockLogininfor 解锁用户登录状态
 * @method cleanLogininfor 清空登录日志
 * @param infoId 传递的参数
 * @param userName 传递的参数
 * @param query 
 * @returns 
 */
export function useLogininforApi() {
  return {
    list: (query: any) => {
      return request({
        url: '/monitor/logininfor/list',
        method: 'get',
        params: query
      })
    },
    delLogininfor: (infoId: string) => {
      return request({
        url: '/monitor/logininfor/' + infoId,
        method: 'delete'
      })
    },
    unlockLogininfor: (userName: string) => {
      return request({
        url: '/monitor/logininfor/unlock/' + userName,
        method: 'get'
      })
    },
    cleanLogininfor: () => {
      return request({
        url: '/monitor/logininfor/clean',
        method: 'delete'
      })
    }
  }
}

// Path: src\api\monitor\logininfor.ts