import request from '../../../util/request';
const prefix = '/api';

/**
 * 查询所有文章
 * @returns {Promise<*>}
 */
export function selectPassage(){
    return request(`${prefix}/passage/selectPassage`,{
        headers:{
            'content-type':'application/json',
        },
        method:'GET',
    })
}

/**
 * 根据栏目查询文章
 * @param key
 * @returns {Promise<*>}
 */
export function selectPassageByColumn(key){
    return request(`${prefix}/passage/selectPassageByColumn?column=${key}`,{
        headers:{
            'content-type':'application/json',
        },
        method:'GET',
    })
}

/**
 * 模糊查询文章
 * @param params
 * @returns {Promise<*>}
 */
export function selectPassageByUnclear(params){
    return request(`${prefix}/passage/selectPassageByUnclear?startingTime=${params.startingTime}&endingTime=${params.endingTime}&title=${params.passageTitle}`,{
        headers:{
            'content-type':'application/json',
        },
        method:'GET',
    })
}

/**
 * 删除文章
 * @param id
 * @returns {Promise<*>}
 */
export function deletePassage(id) {
    return request(`${prefix}/passage/deletePassage?id=${id}`,{
        headers:{
            'content-type':'application/json',
        },
        method:'GET',
        // body:JSON.stringify(id)
    })
}

/**
 * 更新文章
 * @param passage
 * @returns {Promise<*>}
 */
export function updatePassage(passage) {
    console.log('passage ',passage);
    return request(`${prefix}/passage/updatePassage`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(passage)
    })
}

/**
 * 新增文章
 * @param passage
 * @returns {Promise<*>}
 */
export function insertPassage(passage) {
    return request(`${prefix}/passage/insertPassage`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify(passage)
    })
}

/**
 * 查询二级栏目
 * @returns {Promise<*>}
 */
export function selectColumn(){
    return request(`${prefix}/column/selectColumn`,{
        headers:{
            'content-type':'application/json',
        },
        method:'GET',
    })
}

/**
 * 查询一级栏目
 * @returns {Promise<*>}
 */
export function listFirstColumn(){
    return request(`${prefix}/listFirstColumn`,{
        headers:{
            'content-type':'application/json',
        },
        method:'GET',
    })
}

export function listUser() {
    return request(`${prefix}/user/selectUser?id=`,{
        headers:{
            'content-type':'application/json',
        },
        method:'GET',
    })
}
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


