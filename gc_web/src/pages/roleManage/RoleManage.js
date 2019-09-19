import React from 'react';
import {connect} from 'dva';
import {Table,Popconfirm,Button,Modal,Form,Input} from 'antd';

import * as styles from './RoleManage.less';

const namespace = 'roleManage';
function mapStateToProps(state) {
    return{
        operators: state.roleManage.operators,
        addVisible: false,//新增角色模态框
    }
}

class RoleManage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            addVisible:false,//判断新增模态框是否显示
        }
    }

    componentDidMount(){
        this.queryOperator();
    }

    /**
     * 查询所有身份
     * */
    queryOperator=()=>{
        this.props.dispatch({type:`${namespace}/queryOperator`})
    };
    /**
     * 取消新增身份
     * */
    cancelAdd=()=>{
        this.setState({addVisible: false})
    };
    /**
     * 显示新增身份模态框
     * */
    displayAdd=()=>{
        this.setState({addVisible: true})
    };
    /**
     * 新增身份
     * */
    addOperator=()=>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({type:`${namespace}/insertOperator`, params: values}).then(this.queryOperator)
            }
            this.setState({addVisible: false})
        });
    };
    /**
     * 删除角色
     * */
    deleteOperator=(id)=>{
        this.props.dispatch({type:`${namespace}/deleteOperator`,params: id}).then(this.queryOperator)
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        const columns=[
            {
                title:'序号',
                key:'orderNumber',
                render:(text,record,index)=>`${index+1}`
            },
            {
                title:'姓名',
                dataIndex:'name'
            },{
                title: '操作',
                render: (record) =>
                    <div>
                        <Popconfirm title='确定要删除此角色吗？' cancelText='点错了' okText='确认' onConfirm={()=>this.deleteOperator(record.operatorId)}>
                            <span className={styles.operator}>删除</span>
                        </Popconfirm>
                    </div>
            }
        ];
        return(
            <div>
                <div className={styles.addRow}>
                    <Button shape="circle" icon="plus" type="dashed" onClick={this.displayAdd}/>
                    <span onClick={this.displayAdd} style={{cursor:'pointer'}}>新增角色</span>
                </div>
                <Table rowKey={record=>record.operatorId}
                       columns={columns}
                       dataSource={this.props.operators}/>
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

export default connect(mapStateToProps)(Form.create()(RoleManage));