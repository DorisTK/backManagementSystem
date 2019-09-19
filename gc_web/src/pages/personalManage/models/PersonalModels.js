import {message} from 'antd';

import * as personalService from '../service/PersonalService'
import * as limitService from "../../limit/service/LimitService";

export default {
    namespace: 'personalManage',
    state:{
        operators:[],
        currentUser:[],
    },
    effects:{
        /**
         * 查询用户
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *queryCurrentUser(params, {call,put}){
            try {
                const rsp = yield call(personalService.queryCurrentUser);
                yield put({type:'saveCurrentUser', payload: rsp})
            }catch (e) {
            }
        },

        /**
         * 查询角色
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *queryOperatorType(params, {call,put}){
            try {
                const rsp = yield call(limitService.queryOperatorType);
                yield put({type:'saveOperator', payload: rsp})
            }catch (e) {
            }
        },

        /**
         * 模糊查询
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *selectUerByUnclear({params}, {call,put}){
            try {
                const rsp = yield call(personalService.selectUerByUnclear,params);
                yield put({type:'saveCurrentUser', payload: rsp})
            }catch (e) {
            }
        },
        /**
         * 删除用户
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *deleteUser({params}, {call,put}){
            try {
                yield call(personalService.deleteUser,params);
            }catch (e) {
            }
        },

        /**
         * 新增用户
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *addUser({params}, {call,put}){
            try {
                yield call(personalService.addUser,params);
            }catch (e) {
            }
        },

        /**
         * 重置密码
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *resetPassword({params}, {call,put}){
            try {
                yield call(personalService.resetPassword,params);
            }catch (e) {
            }
        },

    },
    reducers:{
        saveCurrentUser(state,{payload}){
            return{
                ...state,
                currentUser:payload
            }
        },
        saveOperator(state,{payload}){
            return{
                ...state,
                operators:payload
            }
        },


    }

}