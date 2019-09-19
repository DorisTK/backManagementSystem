import request from '../../util/request';
const prefix = '/api';
export function getUserInfo(params) {
    return request(`${prefix}/user/selectUser?id=${params}`,{method:'GET'})
}