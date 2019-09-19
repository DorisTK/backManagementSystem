import React from 'react';
import {connect} from 'dva';
import {Table, Popconfirm, Input, Modal, Descriptions, Badge, Button, Row, Col, Icon,Tree,Divider} from 'antd';
import * as styles from './MessageManage.less';

const namespace = 'messageManage';
const { TextArea } = Input;
const {TreeNode} = Tree;
function mapStateToProps(state){
    return {
        listInteract: state.messageManage.listInteract,
    }
}

class MessageManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            replyVisible: false,//控制是否回复留言Modal的显示
            detailVisible: false,//控制是否显示留言及回复详情的Modal的显示
            currentInteractId: -1,
            currentInteract: {},
            answer:null,
            filter:{
                question:'',//搜索的问题
                spokesman:'',//提问人
                className:'',//课程名
            },
        }
    };

    componentDidMount(){
        this.queryListInteract();
    }

    /**
     * 获取所有互动交流的信息
     * */
    queryListInteract=()=>{
        const filter = this.state.filter;
        this.props.dispatch({type: `${namespace}/listInteract`, params: filter});
    };
    /**
     * 删除留言
     * */
    deleteInteract=(key)=>{
        this.props.dispatch({ type: `${namespace}/deleteInteract`, params: key}).then(this.queryListInteract);
    };
    /**
     * 回答问题
     * */
    reply=(key)=>{
        this.setState({
            replyVisible: true,
            currentInteractId: key
        })
    };
    /**
     * 取消回答问题
     * */
    cancelReply=()=>{
        this.setState({
            replyVisible: false
        })
    };
    /**
     * 提交答案
     * */
    submitAnswer=(id, answer)=>{
        let params={
            id:id,
            answer: answer,
            isReply: 1
        };
        this
            .props
            .dispatch({type:`${namespace}/updateInteract`, params: params})
            .then(this.queryListInteract);
        this.setState({replyVisible:false})

    };
    /**
     * 获取文本输入框中的值
     * */
    changeAnswer=(e)=>{
        this.setState({
            answer: e.currentTarget.value
        })
    };
    /**
     * 显示每一条互动详情
     * */
    displayDetail=(key)=>{
        let interact = null;
        this.props.listInteract.map(it=>{
            it.id === key?interact=it:null;
        });
        this.setState({
            detailVisible: true,
            currentInteract: interact
        });
    };
    /**
     * 取消显示留言详情
     * */
    cancelDetail=()=>{this.setState({detailVisible: false})};
    /**
     * 获取当前过滤条件
     * */
    handleFilter=(e,type)=>{
        const filter = this.state.filter;
        //type:1: 问题，2：提问人，3: 课程
        switch (type) {
            case 1: filter.question = e.target.value;break;
            case 2: filter.spokesman = e.target.value;break;
            case 3: filter.class = e.target.value;break;
        }
        this.setState({filter: filter})
    };

    render(){
        const source = this.props.listInteract;
        source.map(it=>{
            it.answer.length===0?it.isReply=false:it.isReply=true
        });
        const column = [
            {
                title:'问题',
                dataIndex: 'question',
                align:'center'
            },{
                title: '提问人',
                dataIndex: 'spokesmanName',
                align:'center'
            },{
                title: '课程',
                dataIndex: 'className',
                align:'center'
            },{
                title: '状态',
                dataIndex: 'isReply',
                render: (isReply) => {
                    let color = isReply === true ?  "#99D060":"#CECECE";
                    let word = isReply === true ?  "已回复":"未回复" ;
                    return <div style={{display:'flex', alignItems:'center'}}>
                        <div style={{width:"10px",
                            height:"10px",
                            background:color,
                            borderRadius:"50%",
                            opacity:'1',}}>
                        </div>
                        <span style={{color:color}}>{word}</span>
                    </div>
                },
            },{
                title: '操作',
                align:'center',
                render: (record) =>
                    <div>
                        <span onClick={()=>this.reply(record.id)} className={styles.operator}>回答</span>
                        <Divider type="vertical"/>
                        <Popconfirm title='确定要删除留言吗？' cancelText='点错了' okText='确认' onConfirm={()=>this.deleteInteract(record.id)}>
                            <span className={styles.operator}>删除</span>
                        </Popconfirm>
                        <Divider type="vertical"/>
                        <span className={styles.operator} onClick={()=>this.displayDetail(record.id)}>详情</span>
                    </div>
            }
        ];
        return(
            <div>
                <Row>
                    <Col span={5} style={{display: 'flex'}}>
                        <span className={styles.searchWord}>问题</span>
                        <Input className={styles.searchInput}
                               placeholder="搜索问题" allowClear onChange={e=>this.handleFilter(e,1)}
                        />
                    </Col>
                    <Col span={5} style={{display: 'flex'}}>
                        <span className={styles.searchWord}>提问人</span>
                        <Input className={styles.searchInput}
                               placeholder="搜索提问人" allowClear onChange={e=>this.handleFilter(e,2)}
                        />
                    </Col>
                    <Col span={5} style={{display: 'flex'}}>
                        <span className={styles.searchWord}>课程</span>
                        <Input className={styles.searchInput}
                               placeholder="搜索课程" allowClear onChange={e=>this.handleFilter(e,3)}
                        />
                    </Col>
                    <Col >
                        <Button type="dashed" shape="circle" icon="search" onClick={this.queryListInteract}/>
                    </Col>
                </Row>
                <Table
                    rowKey={record=>record.id}
                    columns={column}
                    dataSource={source}
                />
                <Modal
                    title="回答问题"
                    visible={this.state.replyVisible}
                    onCancel={this.cancelReply}
                    onOk={()=>this.submitAnswer(this.state.currentInteractId, this.state.answer)}
                    okText="确认"
                    cancelText="取消"
                >
                    <TextArea  onChange={this.changeAnswer}/>
                </Modal>
                <Modal
                    title="互动详情"
                    visible={this.state.detailVisible}
                    onCancel={this.cancelDetail}
                    footer={<Button key="submit" type="primary" onClick={this.cancelDetail}>确定</Button>}
                >
                    <Descriptions bordered>
                        <Descriptions.Item label="提问人" span={24}>{this.state.currentInteract.spokesmanName}</Descriptions.Item>
                        <Descriptions.Item label="问题" span={24}>请问：{this.state.currentInteract.question}</Descriptions.Item>
                        <Descriptions.Item label="回复人" span={24}>{this.state.currentInteract.replyman}</Descriptions.Item>
                        <Descriptions.Item label="回复内容" span={24}>{this.state.currentInteract.answer}</Descriptions.Item>
                    </Descriptions>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessageManage);