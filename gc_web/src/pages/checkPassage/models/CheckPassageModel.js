import * as checkPassageService from '../service/CheckPassageService';
import {message} from 'antd';

export default {
    namespace:'checkPassage',
    state:{
        listPassage:[],
        listColumn:[],
        listUser:[],
    },
    effects:{
        //查询所有文章
        *listPassage({params}, {call, put}){
            try {
                const rsp = yield call(checkPassageService.listPassage, params);
                yield put({type:'saveListPassage', payload: rsp})
            }catch (e) {
                message.error('查询未审核的文章失败')
            }
        },
        //查询所有栏目
        *listColumn(params, {call, put}){
            try{
                const rsp = yield call(checkPassageService.listColumn);
                yield put({type: 'saveListColumn', payload: rsp})
            }catch (e) {
               message.error('查询所有栏目失败')
            }
        },
        //提交审核
        *check({passage}, {call, put}){
            try{
                 yield call(checkPassageService.pass, passage);
            }catch (e) {
            }
        },
        //查询所有用户
        *listUser(params,{call, put}){
            try{
                const rsp = yield call(checkPassageService.listUser);
                yield put({type:'saveUser', payload: rsp})
            }catch (e) {
            }
        }
    },
    reducers:{
        saveListPassage(state, {payload}){
            return{
                ...state,
                listPassage: payload
            }
        },
        saveListColumn(state, {payload}){
            return{
                ...state,
                listColumn: payload
            }
        },
        saveUser(state, {payload}){
            return{
                ...state,
                listUser: payload
            }
        }
    }
}