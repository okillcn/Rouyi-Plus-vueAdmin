import request from '/@/utils/request'

export function useDept() {
  return {
    listDept: (query: any) => {
      return request({
        url: '/system/dept/list',
        method: 'get',
        params: query
      })
    },
    listDeptExcludeChild: (deptId: any) => {
      return request({
        url: '/system/dept/list/exclude/' + deptId,
        method: 'get'
      })
    },
    getDept: (deptId: any) => {
      return request({
        url: '/system/dept/' + deptId,
        method: 'get'
      })
    },
    addDept: (data: any) => {
      return request({
        url: '/system/dept',
        method: 'post',
        data: data
      })
    },
    updateDept: (data: any) => {
      return request({
        url: '/system/dept',
        method: 'put',
        data: data
      })
    },
    delDept: (deptId: any) => {
      return request({
        url: '/system/dept/' + deptId,
        method: 'delete'
      })
    }
  }
}