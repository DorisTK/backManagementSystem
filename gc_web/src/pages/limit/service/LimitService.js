import request from '../../../util/request';
const prefix = '/api';

//查询身份
export function queryOperatorType(){
    return request(`${prefix}/listOperator?operatorId=`,{method:'GET'})
}
//查询模块
export function queryModule() {
    return request(`${prefix}//listModule?id=&name=&level=&belong=`,{method:'GET'})
}
//修改权限
export function changePermission(params) {
    return request(`${prefix}/updatePermission`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(params)
    })
}
//查询权限
export function queryPermission(params) {
    return request(`${prefix}/listPermission?operator=${params}`, {method:'GET'})
}