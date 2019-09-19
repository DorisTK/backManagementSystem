import request from "../../../util/request";
const prefix = '/api';

//查询所有留言信息
export function listInteract(param) {
    return request(`${prefix}/listInteract?question=${param.question}&spokesmanName=${param.spokesman}&className=${param.className}`,{method:'GET'})
}
//删除留言
export function deleteInteract(param) {
    return request(`${prefix}/deleteInteract?id=${param}`,{method:'DELETE'})
}
//回答问题
export function updateInteract(param) {
    return request(`${prefix}/updateInteract?answer=${param.answer}&id=${param.id}&isReply=${param.isReply}`,{method:'POST'})
}