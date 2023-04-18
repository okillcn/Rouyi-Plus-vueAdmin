import request from '/@/utils/request';
/**
 * 公告管理集合
 * @method listNotice 查询公告列表
 * @method getNotice 查询公告详细
 * @method addNotice 新增公告
 * @method updateNotice 修改公告
 * @method delNotice 删除公告
 * @param noticeId 公告ID
 * @param query
 * @returns
 * */
export function useNotice() {
  return {
    listNotice: (query:any) => {
      return request({
        url: '/10086/system/notice/list',
        method: 'get',
        params: query
      })
    },
    getNotice: (noticeId:any) => {
      return request({
        url: '/10086/system/notice/' + noticeId,
        method: 'get'
      })
    },
    addNotice: (data:any) => {
      return request({
        url: '/10086/system/notice',
        method: 'post',
        data: data
      })
    },
    updateNotice: (data:any) => {
      return request({
        url: '/10086/system/notice',
        method: 'put',
        data: data
      })
    },
    delNotice: (noticeId:any) => {
      return request({
        url: '/10086/system/notice/' + noticeId,
        method: 'delete'
      })
    }
  }
}

// Path: src\api\system\notice.ts
