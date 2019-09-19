import request from '../../util/request';
const prefix = '/api';
//查询权限
export function queryPermission(params) {
    return request(`${prefix}/listPermission?operator=${params}`, {method:'GET'})
}
//查询模块
export function queryModule() {
    return request(`${prefix}/listModule?id=&name=&level=&belong=`, {method:'GET'})
}