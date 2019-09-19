import React from 'react';
import {connect} from 'dva';
import {Table, Popconfirm, Button, Modal, Form, Radio, Input, Select, Icon} from 'antd';
import * as styles from './ColumnManage.less';

const namespace = 'columnManage';
const {Option} = Select;

function mapStateToProps(state) {
    return{
        firstColumn: state.columnManage.firstColumn,
        secondColumn: state.columnManage.secondColumn,
    }
}

class ColumnManage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            addVisible: false, // 用于控制是否显示新增模态框
            chooseLevel: 1, // 用于判断新增的栏目是一级栏目还是二级栏目
            changeVisible: false, // 用于控制是否显示修改模态框
            currentColumn: {name:null}, // 当前选中的栏目
            flag: -1, // 用于判断当前点开的修改模态框是一级栏目还是二级栏目
        }
    }

    componentDidMount(){
        this.queryFirstColumn();
        this.querySecondColumn();
    }
    /**
     * 查询所有一级栏目
     * */
    queryFirstColumn=()=>{
        this.props.dispatch({type:`${namespace}/listFirstColumn`})
    };
    /**
     * 查询所有二级栏目
     * */
    querySecondColumn=()=>{
        this.props.dispatch({type:`${namespace}/listSecondColumn`})
    };
    /**
     * 显示模态框
     * */
    displayModal=(record,level,flag)=>{
        if(flag===1){
            this.setState({addVisible: true})
        }else{
            let column= null;
            level===1?this.props.firstColumn.map(it=>{
                it.id===record?column=it:null
                }):this.props.secondColumn.map(it=>{
                    it.id===record?column=it:null
            }); //获取当前栏目
            level===1?this.setState({flag:1}):this.setState({flag:2});// 修改当前点开的修改模态框是一级目录还是二级目录
            this.setState({changeVisible: true, currentColumn: column})
        }

    };
    /**
     * 取消显示模态框
     * */

    cancelModal=(flag)=>{flag===1?this.setState({addVisible: false}):this.setState({changeVisible: false})};
    /**
     * 显示二级栏目
     * */
    expandedRowRender=(record)=>{
        const {secondColumn} = this.props;
        let data =[];
        secondColumn.map(it=>{
            it.total===record.id?data.push(it):null
        });
        const columnsSecond =[
            {
                title:'二级栏目名称',
                dataIndex:'name',
            },{
                title:'操作',
                render: (record) =>
                    <div>
                        <span onClick={()=>{this.displayModal(record.id, 2, 2)}} className={styles.operator}>修改</span>
                        <Popconfirm title='确定要删除此栏目吗？' cancelText='点错了' okText='确认' onConfirm={()=>this.deleteColumn(record.id,2)}>
                            <span className={styles.operator}>删除</span>
                        </Popconfirm>
                    </div>
            }
        ];
        return (
            <div>
                <Table
                    rowKey={record=>record.id}
                    columns={columnsSecond}
                    dataSource={data}
                    pagination={false}
                />
            </div>

        )
    };
    /**
     * 获取用户当前想要新增的栏目等级
     * */
    changeLevel=(level)=>{this.setState({chooseLevel:level.target.value})};
    /**
     * 提交表单数据(新增栏目)
     * */
    addColumn=(flag)=> {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.name = values.addName;
                delete values.addName;
                flag === 1 ? this.props.dispatch({type: `${namespace}/addFirstColumn`, newColumn: values}).then(this.queryFirstColumn) :
                    this.props.dispatch({type: `${namespace}/addSecondColumn`, newColumn: values}).then(this.querySecondColumn)
            }
        });
        this.setState({addVisible: false})
    };
    /**
     * 提交表单数据（修改栏目）
     * */
    changeColumn=(flag)=>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const value={
                    id: this.state.currentColumn.id,
                    name: values.name
                };
                flag === 1 ? this.props.dispatch({type: `${namespace}/changeFirstColumn`, newColumn: value}).then(this.queryFirstColumn) :
                    this.props.dispatch({type: `${namespace}/changeSecondColumn`, newColumn: value}).then(this.querySecondColumn)
                this.props.form.resetFields();
            }
        });
        this.setState({changeVisible: false});
    };
    /**
     * 删除栏目
     * */
    deleteColumn=(key,level)=>{
        level===1?this.props.dispatch({type:`${namespace}/deleteFirstColumn`, key}).then(this.queryFirstColumn):
            this.props.dispatch({type:`${namespace}/deleteSecondColumn`, key}).then(this.querySecondColumn)
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        //一级栏目和二级栏目的值
        const {firstColumn} = this.props;
        //表格列
        const columnsFirst =[
            {
                title:'一级栏目名称',
                dataIndex:'name',
            },{
                title:'操作',
                render: (record) =>
                    <div>
                        <span onClick={()=>{this.displayModal(record.id,1,2)}} className={styles.operator}>修改</span>
                        <Popconfirm title='确定要删除此栏目吗？' cancelText='点错了' okText='确认' onConfirm={()=>this.deleteColumn(record.id,1)}>
                            <span className={styles.operator}>删除</span>
                        </Popconfirm>
                    </div>
            }
        ];
        return(
            <div>
                <div className={styles.add}>
                    <Button type="primary" shape="circle" icon="plus"  onClick={()=>{this.displayModal(0,0,1)}}/>
                    <span onClick={()=>{this.displayModal(0,0,1)}}>新增栏目</span>
                </div>
                <Table
                    rowKey={record=>record.id}
                    columns={columnsFirst}
                    dataSource={firstColumn}
                    expandedRowRender={this.expandedRowRender}
                />
                <Modal
                    title="新增栏目"
                    visible={this.state.addVisible}
                    onCancel={()=>{this.cancelModal(1)}}
                    onOk={()=>this.addColumn(this.state.chooseLevel)}
                >
                    <Radio.Group onChange={e=>this.changeLevel(e)}>
                        <Radio value={1}>一级栏目</Radio>
                        <Radio value={2}>二级栏目</Radio>
                    </Radio.Group>
                    {
                        this.state.chooseLevel===1?<div>
                            <Form>
                                <Form.Item label="新增的栏目名称">
                                    {
                                        getFieldDecorator('addName',{
                                            rules: [{ required: this.state.addVisible?true:false, message: '请输入栏目名称'}],
                                        })(<Input/>)
                                    }
                                </Form.Item>
                            </Form>
                        </div>:<div>
                            <Form>
                                <Form.Item label="选择一级栏目">
                                    {
                                        getFieldDecorator('total',{
                                            rules:[{required: this.state.addVisible?true:false, message: '请选择一级栏目'}],
                                        })(<Select>
                                            {
                                                firstColumn.map(it=>{
                                                    return(
                                                        <Option key={it.id} value={it.id}>
                                                            {it.name}
                                                        </Option>
                                                    )
                                                })
                                            }
                                        </Select>)
                                    }
                                </Form.Item>
                                <Form.Item label="新增的栏目名称">
                                    {
                                        getFieldDecorator('addName',{
                                            initialValue:null,
                                            rules: [{ required: this.state.addVisible?true:false, message: '请输入栏目名称'}],
                                        })(<Input/>)
                                    }
                                </Form.Item>
                            </Form>
                        </div>
                    }
                </Modal>
                <Modal
                    title="修改栏目"
                    visible={this.state.changeVisible}
                    onCancel={()=>{this.cancelModal(2)}}
                    onOk={()=>{this.changeColumn(this.state.flag)}}
                >
                    <Form >
                        <Form.Item label="栏目名称">
                            {
                                getFieldDecorator('name',{
                                    initialValue: this.state.currentColumn.name,
                                    rules: [{ required: this.state.changeVisible?true:false, message: '请输入栏目名称'}],
                                })(<Input/>)
                            }
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}

export default connect(mapStateToProps)(Form.create()(ColumnManage));