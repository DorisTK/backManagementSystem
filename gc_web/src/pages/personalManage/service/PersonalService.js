import request from '../../../util/request';
const prefix = '/api';

//查询当前用户
export function queryCurrentUser(params) {
    return request(`${prefix}/user/selectUser?id= `, {method:'GET'})
}

//模糊查询
export function selectUerByUnclear(params) {
    console.log("asdfadsfasd",params);
    return request(`${prefix}/user/selectUerByUnclear?name=${params.name}&&identity=${params.identity} `, {method:'GET'})
}

//删除角色
export function deleteUser(params) {
    return request(`${prefix}/user/deleteUser?id=${params} `, {method:'GET'})
}

//新增角色
export function addUser(params) {
    console.log('parmas ',params);
    return request(`${prefix}/user/insertUser`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(params)
    })
}

//修改角色（重置密码）
export function resetPassword(params) {
    return request(`${prefix}/user//updateUser`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(params)
    })
}