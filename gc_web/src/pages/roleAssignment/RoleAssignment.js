import React from 'react';
import {connect} from 'dva';
import {Table, Popconfirm, Modal, Radio, message, Button, Icon, Row,Col,Form, Input} from 'antd';

import * as styles from './RoleAssignment.less';

const namespace = 'roleAssignment';
function mapStateToProps(state) {
    console.log('现在 ',state.roleAssignment.listOperator);
    return{
        users: state.roleAssignment.users,
        listOperator: state.roleAssignment.listOperator,
    }
}

class RoleAssignment extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            changeVisible: false,//是否控制修改模态框是否显示
            currentOperator: -1,
            currentUser:{},//当前选中的人员
        }
    }

    componentDidMount(){
        this.queryUsers();
        this.props.dispatch({type:`${namespace}/queryOperator`});
    }

    /**
     * 显示修改身份模态框
     * */
    displayChange=(id)=>{
        this.props.users.map(it=>{
            it.id === id?this.setState({currentUser: it},()=>{
                if(it.operator_type===0){
                    message.error('不能修改自己的权限')
                }else{
                    this.setState({changeVisible: true})
                }
            }):null;
        });
    };
    /**
     * 选择新的身份
     * */
    onChange=(e)=>{
        this.setState({currentOperator: e.target.value})
    };
    /**
     * 隐藏修改模态框
     * */
    unDisplay=()=>{
        this.setState({changeVisible: false})
    };
    /**
     * 修改身份
     * */
    changeOperator=()=>{
        const user = this.state.currentUser;
        user.operatorType = this.state.currentOperator;
        user.headPhoto = user.head_photo;
        delete user.head_photo;
        delete user.operatorName;
        delete user.operator_type;
        this
            .props
            .dispatch({type:`${namespace}/changeOperator`, params: user})
            .then(this.queryUsers);
        this.setState({changeVisible: false})
    };

    queryUsers=()=>{
        this.props.dispatch({type:`${namespace}/queryUsers`})
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        const columns=[
            {
                title:'姓名',
                dataIndex:'name'
            },{
                title:'性别',
                dataIndex:'sex'
            },{
                title:'邮箱',
                dataIndex:'email'
            },{
                title:'身份',
                dataIndex:'operatorName'
            },{
                title: '操作',
                render: (record) =>
                    <div>
                        <span onClick={()=>this.displayChange(record.id)} className={styles.operator}>修改</span>
                    </div>
            }
        ];
        let data = [];
        this.props.users!==undefined?this.props.users.map(it=>{
            it.id !==1 ?data.push(it):null
        }):null;
        return(
            <div>
                <Table rowKey={record=>record.id} columns={columns} dataSource={data}/>
                <Modal visible={this.state.changeVisible} title="修改身份"
                       onCancel={this.unDisplay} onOk={this.changeOperator}>
                    <Radio.Group onChange={this.onChange}>
                        {
                            this.props.listOperator.map(it=>{
                                return(it.operatorId!==1? <Radio key={it.operatorId} value={it.operatorId}>{it.name}</Radio>:null)
                            })
                        }
                    </Radio.Group>
                </Modal>
                <Modal visible={this.state.addVisible} title="新增角色" onCancel={this.cancelAdd} onOk={this.addOperator}>
                    <Form>
                        <Form.Item label="角色名">
                            {
                                getFieldDecorator('name',{
                                    rules: [{ required: true, message: '请输入角色名'}],
                                })(<Input/>)
                            }
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Form.create()(RoleAssignment));