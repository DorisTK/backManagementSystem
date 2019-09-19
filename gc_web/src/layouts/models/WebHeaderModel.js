import * as headerService from '../service/WebHeaderService';
import {message} from 'antd';
export default {
    namespace: 'webHeader',
    state:{
        userInfo:{},
    },
    effects:{
        *getUserInfo({params},{call,put}){
            try {
                const rsp = yield call(headerService.getUserInfo, params);
                yield put({type:'saveUserInfo', payload: rsp})
            }catch (e) {
                message.error('查询所有用户失败')
            }
        }
    },
    reducers:{
        saveUserInfo(state, {payload}){
            return{
                ...state,
                userInfo: payload[0]
            }
        }
    }
}