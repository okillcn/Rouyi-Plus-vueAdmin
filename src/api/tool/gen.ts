import request from '/@/utils/request';

/**
 * 代码生成集合
 * @method listTable 查询生成表数据
 * @method listDbTable 查询db数据库列表
 * @method getGenTable 查询表详细信息
 * @method updateGenTable 修改代码生成信息
 * @method importTable 导入表
 * @method previewTable 预览生成代码
 * @method delTable 删除表数据
 * @param tableId 传递的参数
 * @param data 传递的参数
 * @param query 
 * @returns 
 */
export function useGenApi() {
  return {
    listTable: (query: any) => {
      return request({
        headers: { 'datasource': localStorage.getItem("dataName") },
        url: '/tool/gen/list',
        method: 'get',
        params: query
      })
    },
    listDbTable: (query: any) => {
      return request({
        headers: { 'datasource': localStorage.getItem("dataName") },
        url: '/tool/gen/db/list',
        method: 'get',
        params: query
      })
    },
    getGenTable: (tableId: string) => {
      return request({
        headers: { 'datasource': localStorage.getItem("dataName") },
        url: '/tool/gen/' + tableId,
        method: 'get'
      })
    },
    updateGenTable: (data: any) => {
      return request({
        headers: { 'datasource': localStorage.getItem("dataName") },
        url: '/tool/gen',
        method: 'put',
        data: data
      })
    },
    importTable: (data: any) => {
      return request({
        headers: { 'datasource': localStorage.getItem("dataName") },
        url: '/tool/gen/importTable',
        method: 'post',
        params: data
      })
    },
    previewTable: (tableId: string) => {
      return request({
        headers: { 'datasource': localStorage.getItem("dataName") },
        url: '/tool/gen/preview/' + tableId,
        method: 'get'
      })
    },
    delTable: (tableId: string) => {
      return request({
        headers: { 'datasource': localStorage.getItem("dataName") },
        url: '/tool/gen/' + tableId,
        method: 'delete'
      })
    }
  }
}
