import request from '../../../util/request';
const prefix = '/api';

export function login(){
    return request(`${prefix}/user/selectUser?id=`,{method:'GET'})
}