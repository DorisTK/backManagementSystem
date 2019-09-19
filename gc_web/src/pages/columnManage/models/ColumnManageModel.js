import * as columnManageService from '../service/ColumnManageService';
import {message} from 'antd';

export default {
    namespace:'columnManage',
    state:{
        firstColumn:[],//一级栏目
        secondColumn:[],//二级栏目
    },
    effects:{
        //查询一级栏目
        *listFirstColumn(params, {call, put}){
            try {
                const rsp = yield call(columnManageService.listFirstColumn);
                yield put({type:'saveFirstColumn', payload: rsp})
            }catch (e) {
                message.error('查询所有一级栏目失败')
            }
        },
        //查询二级栏目
        *listSecondColumn(params, {call, put}){
            try {
                const rsp = yield call(columnManageService.listSecondColumn);
                yield put({type:'saveSecondColumn', payload: rsp})
            }catch (e) {
                message.error('查询所有二级栏目失败')
            }
        },
        //新增一级栏目
        *addFirstColumn({newColumn}, {call, put}){
            try {
                const rsp = yield call(columnManageService.addFirstColumn, newColumn);
            }catch (e) {
                message.error('新增一级栏目失败')
            }
        },
        //新增二级栏目
        *addSecondColumn({newColumn}, {call, put}){
            try{
                const  rsp = yield call(columnManageService.addSecondColumn, newColumn);
            }catch (e) {}
        },
        //修改一级目录
        *changeFirstColumn({newColumn}, {call, put}){
            try {
                const rsp = yield call(columnManageService.changeFirstColumn, newColumn);
            }catch (e) {
                message.error('修改一级目录失败')
            }
        },
        //修改二级目录
        *changeSecondColumn({newColumn}, {call, put}){
            try{
                const rsp = yield call(columnManageService.changeSecondColumn, newColumn);
            }catch (e) {}
        },
        //删除一级目录
        *deleteFirstColumn({key}, {call, put}){
            try{
                const rsp = yield call(columnManageService.deleteFirstColumn, key);
            }catch (e) {
                message.error('删除一级目录失败')
            }
        },
        //删除二级目录
        *deleteSecondColumn({key}, {call, put}){
            try {
                const rsp  = yield call(columnManageService.deleteSecondColumn, key);
            }catch (e) {}
        }

    },
    reducers:{
        saveFirstColumn(state, {payload}){
            return{
                ...state,
                firstColumn: payload
            }
        },
        saveSecondColumn(state, {payload}){
            return{
                ...state,
                secondColumn: payload
            }
        }
    }


}