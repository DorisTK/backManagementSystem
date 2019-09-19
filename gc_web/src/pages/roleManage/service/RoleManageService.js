import request from '../../../util/request';
const prefix = '/api';

//查询所有身份
export function queryOperator() {
    return request(`${prefix}/listOperator?operatorId=`,{method:'GET'})
}
//删除角色
export function deleteOperator(params) {
    return request(`${prefix}/deleteOperator?operatorId=${params}`,{method:'DELETE'})
}
//新增角色
export function insertOperator(params) {
    return request(`${prefix}/insertOperator`,{
        headers: {
            'content-type':'application/json'
        },
        method:'POST',
        body: JSON.stringify(params)
    })
}