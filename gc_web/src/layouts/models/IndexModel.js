import * as indexService from '../service/IndexService';
import {message} from 'antd';
export default {
    namespace: 'index',
    state:{
       permission:[],
        listModule: [],
    },
    effects:{
        //查询相关权限
        *queryPermission({params}, {call, put}){
            try {
                const rsp = yield call(indexService.queryPermission, params);
                yield put({type:'savePermission', payload: rsp})
            }catch (e) {
                message.error('查询权限失败')
            }
        },
        //查询模块
        *queryModule(params, {call, put}){
            try {
                const rsp = yield call(indexService.queryModule);
                yield put({type:'saveModule', payload: rsp})
            }catch (e) {
                message.error('查询模块失败')
            }
        }
    },
    reducers:{
       savePermission(state,{payload}){
           return{
               ...state,
               permission: payload
           }
       },
        saveModule(state, {payload}){
           return{
               ...state,
               listModule: payload
           }
        }
    }
}