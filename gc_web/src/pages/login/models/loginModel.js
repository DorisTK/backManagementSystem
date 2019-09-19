import router from 'umi/router';
import * as loginService from '../service/loginService'
import {message} from 'antd';

export default {
    namespace:'login',
    state:{
        users:[]
    },

    effects:{
        *login({loginInfo}, {call, put}) {
            try{
                let id = -1;//用于传给其他页面来获取用户信息
                const rsp = yield call(loginService.login, loginInfo);
                yield put({type:'save', payload: rsp});
                let temp = 0;
                rsp.map(it=>{
                    temp = 0;
                    if(it.account === loginInfo.account){
                        temp = 1;
                        if(it.password === loginInfo.password){
                            temp = 2;
                            let storage=window.localStorage;
                            storage['id']=it.id;
                            storage['operator']=it.operator_type;
                            storage['headPhoto']=it.head_photo;
                            router.push('/web')
                        }else{
                            message.error('账号或密码输入错误');
                        }
                    }
                });

            }catch (e) {
                message.error("账号或密码输入错误")
            }
        }
    },
    reducers:{
        save(state, {payload}){
            return{
                ...state,
                users: payload
            }
        }
    }
}
