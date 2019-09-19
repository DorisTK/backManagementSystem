import * as personalService from '../service/PersonalService'
import {message} from 'antd';

export default {
    namespace: 'personal',
    state:{
        currentUser:{},
    },
    effects:{
        //查询当前用户
        *queryCurrentUser({params}, {call,put}){
            try {
                const rsp = yield call(personalService.queryCurrentUser, params);
                yield put({type:'saveCurrentUser', payload: rsp})
            }catch (e) {
                message.error("查询当前用户失败")
            }
        },
        //修改用户信息
        *changeUsers({params}, {call, put}) {
            console.log("过来啦");
            console.log(params);
            try{
                const rsp = yield call(personalService.changeUser, params);
                message.info('修改用户信息成功')
            }catch (e) {
            }
        },
        *uploadFile({params}, {call, put}){
            try {
                let formData = new FormData();
                formData.append("file",params);
                yield call(personalService.FileUp, formData)
            }
            catch (e) {
            }
        }
    },
    reducers:{
        saveCurrentUser(state,{payload}){
            return{
                ...state,
                currentUser:payload
            }
        }
    }
}
