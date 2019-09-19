import request from '../../../util/request'
const prefix = '/api';

//查询所有文章
export function listPassage(params) {
    return request(`${prefix}/passage/listPassage?author=${params.author}&columnName=${params.columnName}&startTime=${params.startTime}&endTime=${params.endTime}&isChecked=${params.isChecked}`,{method:'GET'})

}
//查询所有栏目
export function listColumn() {
    return request(`${prefix}/column/selectColumn`,{method:'GET'})
}
//提交审核
export function pass(params) {
    return request(`${prefix}/passage/updateIsChecked`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(params)
    });
}
//查询所有用户
export function listUser() {
    return request(`${prefix}/user/selectUser?id=`,{method:'GET'})
}