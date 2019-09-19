import * as messageService from '../service/MessageService';
import {message} from 'antd';

export default {
    namespace: 'messageManage',
    state:{
        listInteract:[]
    },
    effects:{
        //查询所有留言
        *listInteract({params},{call, put}){
            try{
                const rsp = yield call(messageService.listInteract, params);
                yield put({ type:'saveInteract', payload: rsp});
            }catch (e) {
                message.error("查询所有留言信息")
            }
        },
        //删除留言
        *deleteInteract({params},{call, put}){
            try{
                const rsp = yield call(messageService.deleteInteract, params);
            }catch (e) {
                message.error("删除留言信息")
            }
        },
        //回答问题（修改留言）
        *updateInteract({params}, {call, put}){
            try{
                const rsp = yield call(messageService.updateInteract, params);
            }catch (e) {
                message.error("回答问题失败")
            }
        }
    },
    reducers: {
        saveInteract(state, {payload}) {
            return {
                ...state,
                listInteract: payload
            }
        },
    }
}