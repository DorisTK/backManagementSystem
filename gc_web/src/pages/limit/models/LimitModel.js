import * as limitService from '../service/LimitService';
import {message} from 'antd';

export default {
    namespace:'limit',
    state:{
        operators:[],
        listModule:[],
        permission:[],
    },
    effects:{
        //查询身份
        *queryOperatorType({params}, {call,put}){
            try {
                const rsp = yield call(limitService.queryOperatorType, params);
                yield put({type:'saveOperator', payload: rsp})
            }catch (e) {
                message.error('查询身份失败')
            }
        },
        //查询所有模块
        *queryModule(params,{call, put}){
            try {
                const rsp = yield call(limitService.queryModule);
                yield put({type:'saveModule', payload: rsp})
            }catch (e) {
                message.error('查询模块失败')
            }
        },
        //修改权限
        *changePermission({params},{call, put}){
            try {
                const rsp = yield call(limitService.changePermission, params);
                message.info('修改权限成功')
            }catch (e) {
                message.error('修改权限失败')
            }
        },
        //查询权限
        *queryPermission({params}, {call, put}){
            try {
                const rsp = yield call(limitService.queryPermission, params);
                yield put({type: 'savePermission', payload: rsp})
            }catch (e) {
                message.error('查询当前权限失败')
            }
        }
    },
    reducers:{
        saveOperator(state,{payload}){
            return{
                ...state,
                operators:payload
            }
        },
        saveModule(state,{payload}){
            return{
                ...state,
                listModule: payload
            }
        },
        savePermission(state, {payload}){
            return{
                ...state,
                permission: payload
            }
        }
    }


}