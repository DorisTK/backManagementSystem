import React from 'react';
import {connect} from 'dva';
import {Table, Divider, Row, Radio, Modal, Popconfirm,
    Icon, message, Form, Input, Button,Select} from 'antd';
import * as styles from './PersonalManage.less';
import PersonalForm from './components/PersonalForm'
const {Option} = Select;

const namespace = 'personalManage';

function mapStateToProps(state) {
    return{
        currentUser: state.personalManage.currentUser,
        operators: state.personalManage.operators,
    }
}

const title = () => '人员管理';
const showHeader = true;

const pagination = {position: 'bottom'};


class PersonalManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //属性
            name:"",
            identity:""
            ,
            user:"",
            //table
            bordered: false,
            loading: false,
            pagination,
            size: "small",
            title,

            rowSelection: {},
            scroll: undefined,
            hasData: true,
            record: null,
            detailVisible: null,
            selectedRowKeys:[],
            selectedRows:[],

            //modele
            visible: false ,
            Operation: null,
            content: null,
        };
    }

    componentWillMount(){
        this.queryOperatorType()
        this.queryCurrentUser();
    }

    //获取用户
    queryCurrentUser=()=>{
        this.props.dispatch({type:`${namespace}/queryCurrentUser`})
    };

    //查询角色
    queryOperatorType=()=>{
        this.props.dispatch({type:`${namespace}/queryOperatorType`})
    };

    //模糊查询
    selectUerByUnclear = (params) =>{
        this.props.dispatch({type:`${namespace}/selectUerByUnclear`,params})
    };

    //删除用户
    deleteUser = (params) =>{
        this.props.dispatch({type:`${namespace}/deleteUser`,params}).then(this.queryCurrentUser)
    };

    //新增用户
    addUser = (params) =>{
        this.props.dispatch({type:`${namespace}/addUser`,params}).then(this.queryCurrentUser)
    };

    //重置密码
    resetPassword =(params) => {
        this.props.dispatch({type: `${namespace}/resetPassword`, params}).then(this.queryCurrentUser);
    };


    searchByName=(other,e)=>{
        this.setState({name:e.target.value});
    };


    inquirePassage = () =>{

        if (this.state.name.length === 0 && this.state.identity.length === 0 ){
            message.success("显示所有信息");
            this.queryCurrentUser();
        }
        else {
            const filter = {name:this.state.name,identity:this.state.identity};
            this.selectUerByUnclear(filter)
        }
    };

    change(record) {
        record.operatorType = record.operator_type;
        record.password = record.account;
        delete record.operator_type;
        delete record.operatorName;
        this.resetPassword(record);
    }
    deletes =()=>{
        const {selectedRows} = this.state;
        if (selectedRows.length === 0){
            message.error("请选择删除栏目")
        } else {
            selectedRows.map(it=>{
                this.deleteUser(it.id);
            });
        }
    };

    add = () =>{
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('values ',values);
                values.password = "123456";//超级管理员新增用户时的统一默认密码
                values.operatorType = values.operator_type;
                delete values.operator_type;
                this.props.dispatch({type:`${namespace}/addUser`, params: values}).then(this.queryCurrentUser)
            }
        });
        this.setState({
            visible: false
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    onSelectChange = (selectedRowKeys,selectedRows) => {
        this.setState({ selectedRowKeys });
        this.setState({selectedRows});
    };

    tests = (value,keys)=>{
        this.setState({identity:keys});
    };

    render(){
        let {selectedRowKeys} = this.state;
        let {selectedRows} = this.state;
        const rowSelection = {
            selectedRowKeys,
            selectedRows,
            onChange: this.onSelectChange
        };

        const users = [];
        if(this.props.currentUser!==undefined){
            this.props.currentUser.map(it=>{
                it.operator_type!==1?users.push(it):null
            });
        }

        const identities = [];
        if(this.props.operators!==undefined){
            this.props.operators.map(it=>{
                it.operatorId!==1?identities.push(it):null
            });
        }


        const columns = [
            {
                title: 'name',
                dataIndex: 'name',
                width:120,
            },

            {
                title: 'account',
                dataIndex: 'account',
                width:120,
            },
            {
                title: 'identity',
                dataIndex: 'operatorName',
                width:120,
            },
            {
                title: 'email',
                dataIndex: 'email',
                width:120,
            },
            {
                title: 'sex',
                dataIndex: 'sex',
                width:50,
            },
            {
                title: 'Action',
                key: 'action',
                width:300,
                align:"center",
                render: (text, record, index) => (
                    <span>
                        <Divider type="vertical"/>

                         <Popconfirm
                             title="Are you sure？"
                             icon={<Icon type="question-circle-o" style={{color: 'red'}}/>}
                             onConfirm={() => {
                                 this.change(record);
                                 message.success("已初始化")
                             }}
                             onCancel={() => {
                                 message.error('Click on No')
                             }}
                         >
                        <a href="#"><span className={styles.resetPassword}>Reset Password</span></a>
                        </Popconfirm>

                         <Divider type="vertical"/>

                         <Popconfirm
                             title="Are you sure？"
                             icon={<Icon type="question-circle-o" style={{color: 'red'}}/>}
                             onConfirm={() => {
                                 this.deleteUser(record.id);
                                 message.success("删除成功")
                             }}
                             onCancel={() => {
                                 message.error('Click on No')
                             }}
                         >
                        <a href="#"><span>Delete   </span></a>
                        </Popconfirm>
                        <Divider type="vertical"/>
                    </span>
                ),
            }
        ];
        const {getFieldDecorator} = this.props.form;
        return(
            <div>
                <Row type="flex" justify="space-between">
                    <div  id="serch">
                        <span className={styles.serch}>用户姓名: </span>
                        <Input  size={"small"} className={styles.searchInput} onChange={e=>this.searchByName(null,e)} allowClear/>
                        <Divider type="vertical"/>
                        <span className={styles.serch}>用户权限: </span>

                        <Select onChange={(value,keys)=>{this.tests(value,keys)}} style={{width:'130px', marginRight: '30px'}}>
                            {identities.map((Part,index) => {
                                return (
                                    <Option key={Part.operatorId} value={Part.operatorId}>{Part.name}</Option>
                                )
                            })
                            }
                        </Select>
                        <Button type="primary" shape="circle" icon="search" onClick={()=>{this.inquirePassage()}}  />
                    </div>
                    <div style={{display:'flex'}}>
                        <Popconfirm title='确定要删除所选中的文章吗？' cancelText='点错了' okText='确认' onConfirm={()=>this.deletes()}>
                            <span className={styles.operator} style={{color: "#ee504c"}} >Delete</span>
                        </Popconfirm>
                        <Divider type="vertical"/>
                        <span
                            className={styles.operator}
                            type="primary"
                            onClick={this.add}
                        >Add</span>
                    </div>
                </Row>
                <Divider />
                <Table {...this.state} rowSelection={rowSelection} columns={columns} dataSource={users} rowKey={record => record.id}/>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="姓名">
                            {
                                getFieldDecorator('name',{
                                    rules: [{ required: true, message: '请输入姓名'}],
                                })(<Input/>)
                            }
                        </Form.Item>
                        <Form.Item label="账号">
                            {
                                getFieldDecorator('account',{
                                    rules: [{ required: true, message: '请输入账号'}],
                                })(<Input/>)
                            }
                        </Form.Item>
                        <Form.Item label="角色">
                            {
                                getFieldDecorator('operator_type',{
                                    rules: [{ required: true, message: '请选择角色'}],
                                })(<Select>
                                    {
                                        this.props.operators.map(it=>{
                                            return(
                                                <Option key={it.operatorId} value={it.operatorId}>{it.name}</Option>
                                            )
                                        })
                                    }
                                </Select>)
                            }
                        </Form.Item>
                        <Form.Item label="性别">
                            {
                                getFieldDecorator('sex',{
                                    rules: [{ required: true, message: '请选择性别'}],
                                })( <Radio.Group>
                                    <Radio value="男">男</Radio>
                                    <Radio value="女">女</Radio>
                                </Radio.Group>)
                            }
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}

export default connect(mapStateToProps)(Form.create()(PersonalManage));