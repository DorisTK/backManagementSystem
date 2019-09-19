import * as passageManageService from '../service/PassageManageService'
import router from "umi/router";

export default {
    namespace:'selectPassage',

    state:{
        passage:null,
        parts:null,
        firstColumn:null,
        accounts:null,
    },
    effects:{
        /**
         * 查找文章
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *selectP(params,{call, put}){
            try {
                const rsp = yield call(passageManageService.selectPassage);
                console.log("rsp",rsp);
                yield put({type:'selectpassage',payload:rsp})
            }catch (e) {
                message.error("error")
            }
        },
        /**
         * 根据栏目查找文章
         * @param param
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *selectPC({param},{call, put}){
            try {
                const rsp = yield call(passageManageService.selectPassageByColumn,param);
                yield put({type:'selectpassage',payload:rsp})
            }
            catch (e) {
            }
        },

        /**
         * 模糊查询
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *selectU({params},{call, put}){
            try {
                const rsp = yield call(passageManageService.selectPassageByUnclear,params);
                yield put({type:'selectpassage',payload:rsp})
            }
            catch (e) {
            }
        },

        /**
         * 删除文章
         * @param param
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *deleteP({param},{call,put}){
            try {
                yield call(passageManageService.deletePassage,param);
            }
            catch (e) {
            }
        },
        /**
         * 更新文章
         * @param parm
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *updateP({param},{call,put}){
            try {
                yield call(passageManageService.updatePassage,param);
            }
            catch (e) {
            }
        },

        /**
         * 新增文章
         * @param param
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *insertP({param},{call,put}){
            try {
                yield call(passageManageService.insertPassage,param);
            }
            catch (e) {
            }

        },

        /**
         * 查询栏目
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *selectC(params,{call,put}){
           try {
               const rsp = yield call(passageManageService.selectColumn);
               yield put({type:'selectpart',payload:rsp})
           }
           catch (e) {
           }
        },

        /**
         * 查询一级标题
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *selectF(params,{call,put}) {
            try {
                const rsp = yield call(passageManageService.listFirstColumn);

                yield put({type:'selectfirst',payload:rsp})
            }
            catch (e) {
            }
        },

        /**
         * 查询所有用户
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         */
        *selectUser(params,{call,put}){
            console.log("111");
            try {
                const rsp = yield call(passageManageService.listUser);
                console.log("rsp",rsp);
                yield put({type:'selectuser',payload:rsp})
            }
            catch (e) {
            }
        },

        /**
         * 上传文件
         * @param params
         * @param call
         * @param put
         * @returns {IterableIterator<*>}
         * @constructor
         */
        *UploadFile({params}, {call, put}){
            console.log("传过来了");
            try {
                let formData = new FormData();
                formData.append("file",params);
                yield call(passageManageService.FileUp, formData)
            }
            catch (e) {
            }
        },

    },
    reducers:{
        selectpassage(state,{payload}){
            return{
                ...state,
                passage: payload
            }
        },
        selectpart(state,{payload}){
            return{
                ...state,
                parts : payload
            }
        },
        selectfirst(state,{payload}){
            return{
                ...state,
                firstColumn :payload
            }
        },
        selectuser(state,{payload}){
            console.log("payload",payload)
            return{
                ...state,
                accounts:payload
            }
        }

    }
}
