import request from '/@/utils/request';
/**
 * 岗位管理集合
 * @method listPost 查询岗位列表
 * @method getPost 查询岗位详细
 * @method addPost 新增岗位
 * @method updatePost 修改岗位
 * @method delPost 删除岗位
 * @param query
 * @returns
 * @param postId
 * @param data
 * */

export function usePost() {
  return {
    listPost: (query:any) => {
      return request({
        url: '/10086/system/post/list',
        method: 'get',
        params: query
      })
    },
    getPost: (postId:any) => {
      return request({
        url: '/10086/system/post/' + postId,
        method: 'get'
      })
    },
    addPost: (data:any) => {
      return request({
        url: '/10086/system/post',
        method: 'post',
        data: data
      })
    },
    updatePost: (data:any) => {
      return request({
        url: '/10086/system/post',
        method: 'put',
        data: data
      })
    },
    delPost: (postId:any) => {
      return request({
        url: '/10086/system/post/' + postId,
        method: 'delete'
      })
    }
  }
}

// Path: src\api\system\post.ts
