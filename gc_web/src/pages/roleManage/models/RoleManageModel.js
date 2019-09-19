import * as roleManageService from '../service/RoleManageService';
import {message} from 'antd';

export default {
    namespace:'roleManage',
    state:{
        operators: [],
    },
    effects:{
        //查询所有身份
        *queryOperator(params, {call, put}){
            try {
                const rsp = yield call(roleManageService.queryOperator);
                yield put({type:'saveOperator', payload:rsp})
            }catch (e) {
                message.error('查询所有身份失败')
            }
        },
        //新增角色
        *insertOperator({params}, {call, put}){
            try {
                const rsp = yield call(roleManageService.insertOperator, params)
            }catch (e) {
                message.error('新增角色失败')
            }
        },
        //删除角色
        *deleteOperator({params}, {call, put}){
            try{
                const rsp = yield call(roleManageService.deleteOperator, params);
            }catch (e) {
                message.error('删除角色失败')
            }
        }
    },
    reducers:{
        saveOperator(state,{payload}){
            return{
                ...state,
                operators: payload
            }
        }
    }
}