import * as roleAssignmentService from '../service/RoleAssignmentService';
import {message} from 'antd';

export default {
    namespace:'roleAssignment',
    state:{
        user: [],
        listOperator: [],
    },
    effects:{
        //查询所有用户
        *queryUsers(params, {call, put}){
            try {
                const rsp = yield call(roleAssignmentService.queryUsers);
                yield put({type: 'saveUsers', payload: rsp})
            }catch (e) {
                message.error('查询所有用户失败')
            }
        },
        //修改身份
        *changeOperator({params}, {call, put}){
            try{
                const rsp = yield call(roleAssignmentService.changeOperator, params);
            }catch (e) {
            }
        },
        //查询身份
        *queryOperator(params, {call, put}){
            try{
                const rsp = yield call(roleAssignmentService.queryOperator);
                yield put({type:'saveOperator', payload: rsp})
            }catch (e) {
                message.error('查询身份失败')
            }
        }
    },
    reducers:{
        saveUsers(state,{payload}){
            return{
                ...state,
                users: payload
            }
        },
        saveOperator(state,{payload}){
            return{
                ...state,
                listOperator:payload
            }
        }
    }
}