import request from '../../../util/request';
const prefix = '/api';

//查询所有一级栏目
export function listFirstColumn() {
    return request(`${prefix}/listFirstColumn`,{method:'GET'})
}
//查询所有二级栏目
export function listSecondColumn() {
    return request(`${prefix}/column/selectColumn`,{method:'GET'})
}
//新增一级栏目
export function addFirstColumn(params) {
    return request(`${prefix}/addFirstColumn?name=${params.name}`,{method:'POST'})
}
//新增二级栏目
export function addSecondColumn(params) {
    return request(`${prefix}/column/insertColumn`, {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(params)
    })
}
//修改一级目录
export function changeFirstColumn(params) {
    return request(`${prefix}/changeFirstColumn?id=${params.id}&name=${params.name}`, {method:'POST'})
}
//修改二级目录
export function changeSecondColumn(params) {
    return request(`${prefix}/column/updateColumn`, {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(params)
    })
}
//删除一级目录
export function deleteFirstColumn(params) {
    return request(`${prefix}/deleteFirstColumn?id=${params}`,{method:'DELETE'})
}
//删除二级目录
export function deleteSecondColumn(params) {
    return request(`${prefix}/column/deleteColumn?id=${params}`,{method:'DELETE'})
}