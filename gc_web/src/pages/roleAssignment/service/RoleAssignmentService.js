import request from '../../../util/request';
const prefix = '/api';

//查询所有用户
export function queryUsers() {
    return request(`${prefix}/user/selectUser?id=`,{method:'GET'})
}
//修改身份
export function changeOperator(params) {
    return request(`${prefix}/user/updateUser`,{
        headers:{
            'content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(params)
    })
}
//查询身份
export function queryOperator() {
    return request(`${prefix}/listOperator?operatorId=`,{method:'GET'})
}