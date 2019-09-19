import React from 'react';
import ReactCanvasNest from 'react-canvas-nest';
import {connect} from 'dva';
import { Tree, Button, message } from 'antd';

import * as styles from './Limit.less';

const { TreeNode,DirectoryTree } = Tree;
const namespace = 'limit';
function mapStateToProps(state) {
    return{
        operators: state.limit.operators,
        listModule: state.limit.listModule,
        permission: state.limit.permission,
    }
}

class Limit extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            currentOperator: -1,//当前选中的身份
            currentModules: [],//当前选中的模块
            currentPermission:[],//当前选中的身份已有的权限
        }
    }

    componentWillMount(){
        this.queryOperatorType();
        this.queryModule();
        this
            .props
            .dispatch({type:`${namespace}/queryPermission`,params: 1})
    }

    /**
     * 查询所有身份
     * */
    queryOperatorType=()=>{
        this.props.dispatch({type:`${namespace}/queryOperatorType`})
    };
    /**
     * 查询所有模块
     * */
    queryModule=()=>{
        this.props.dispatch({type:`${namespace}/queryModule`})
    };
    /**
     * 获取当前选中的身份
     * */
    selectPermission=(selectedKeys, info)=>{
        this.setState({currentOperator:info.node.props.value})
    };
    /**
     * 获取当前选中的模块
     * */
    checkModules=(checkedKeys, info)=>{
        const module = [];
        info.checkedNodes.map(it=>{
            module.push(it.props.value)
        });
        this.setState({currentModules:module});
    };
    /**
     * 提交修改的权限
     * */
    submitModule=()=>{
        const params = {
            operatorId: this.state.currentOperator,
            modules: this.state.currentModules.join()
        };
        this.state.currentOperator===-1? message.error('请选择角色'):
            this
                .props
                .dispatch({type:`${namespace}/changePermission`, params: params})
    };

    render(){
        return(
            <div style={{display:'flex', height:'593px'}} className={styles.limit}>
                <ReactCanvasNest className = 'canvasNest' config = {{ pointColor: '255, 17, 85 ',lineColor: '255, 17, 85', lineWidth: '1'}}
                                 style = {{zIndex: 0, width:'100%', height:'100%'}}/>
                <DirectoryTree multiple onSelect={this.selectPermission}>
                    <TreeNode title="全部角色" key="0">
                        {
                            this.props.operators.map(it=>{
                                return(
                                    it.name!=='超级管理员'?<TreeNode title={it.name} value={it.operatorId} key={it.operatorId} isLeaf />:null
                                )
                            })
                        }

                    </TreeNode>
                </DirectoryTree>
                <Tree checkable showLine onCheck={this.checkModules}
                      defaultExpandedKeys={['0','0-0','1','2']}
                      defaultCheckedKeys={ this.props.permission.length!==0?this.props.permission[0].modules.split(','):null}
                >
                    <TreeNode title="全部模块" key="0">
                        <TreeNode title="通用网站" key="0-0">
                            <TreeNode title="网站内容管理" value={1} key="1">
                                <TreeNode title="留言管理" value={3} key="3"/>
                                <TreeNode title="文章管理" value={4} key="4"/>
                                <TreeNode title="审核文章" value={5} key="5"/>
                                <TreeNode title="栏目管理" value={6} key="6"/>
                            </TreeNode>
                            <TreeNode title="系统设置" value={2} key="2">
                                <TreeNode title="权限管理" value={7} key="7"/>
                                <TreeNode title="模块管理" value={8} key="8"/>
                                <TreeNode title="角色分配" value={9} key="9"/>
                                <TreeNode title="人员管理" value={10} key="10"/>
                                <TreeNode title="角色管理" value={11} key="11"/>
                                <TreeNode title="默认功能设置" value={12} key="12"/>
                                <TreeNode title="首页信息设置" value={13} key="13"/>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                </Tree>
                <Button onClick={this.submitModule} style={{marginTop: '37%', marginLeft: '3%', backgroundColor: 'pink', color: '#1DA57A'}}>确定</Button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Limit);