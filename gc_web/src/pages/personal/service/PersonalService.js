import request from '../../../util/request';
const prefix = '/api';

//查询当前用户
export function queryCurrentUser(params) {
    return request(`${prefix}/user/selectUser?id=${params}`, {method:'GET'})
}

//改变用户信息
export function changeUser(params) {
    params.headPhoto = params.head_photo;
    delete params.head_photo;
    console.log('params ',params);
    return request(`${prefix}/user/updateUser`, {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(params)
    })
}

//上传图片
export function FileUp(params) {
    console.log("文章||||",params);
    return request(`${prefix}/upload`, {
        headers:{
            authorization: 'authorization-text',
        },
        method:'POST',
        body:params
    })
}