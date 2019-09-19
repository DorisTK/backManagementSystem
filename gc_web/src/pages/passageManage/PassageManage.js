import {Component} from 'react';
import './PassageManage.less';
import * as styles from './PassageManage.less';
import moment from 'moment';



import {connect} from 'dva';
import {Table, Divider, Row, Tree, Modal, Popconfirm, Icon, message, Form, Input, Cascader, Button,DatePicker} from 'antd';

import PassageForm from './components/PassageForm'

const {TreeNode,} = Tree;

const namespace = 'selectPassage';
const storage=window.localStorage;



function mapStateToProps(state) {
    return {
        passage: state.selectPassage.passage,
        parts: state.selectPassage.parts,
        firstColumn: state.selectPassage.firstColumn,
        accounts:state.selectPassage.accounts
    }
}
const title = () => '文章管理';
const showHeader = true;

const pagination = {position: 'bottom'};
const firstColumn = null;


class PassageManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            //属性
            filter:{
                passageTitle:"",
                startingTime:"",
                endingTime:"",
            },

            //table
            bordered: false,
            loading: false,
            pagination,
            size: "small",
            title,
            showHeader,
            rowSelection: {},
            scroll: undefined,
            hasData: true,
            record: null,
            detailVisible: null,
            selectedRowKeys:[],
            selectedRows:[],

            //modele
            Operation: null,
            content: null,

            //行元素
            Record: null,
            Passage:this.props.passage,
        };

    }

    componentDidMount() {
        this.columnListInteract();
        this.queryListInteract();
        this.listFirstColumnInteract();
        this.uersInteract();
        this.setState({
            user:storage.id,
            }
        )

    }


    /**
     * 获取所有文章信息
     */
    queryListInteract = () => {
        this.props.dispatch({type: `${namespace}/selectP`});
    };

    /**
     * 根据栏目获取文章
     * @param key
     */
    queryListInteractByPart = (key) => {
        this.props.dispatch({type: `${namespace}/selectPC`, param: key});
    };

    /**
     * 模糊查询
     * @param parms
     */
    queryListInteractByUnclear = (parms) =>{
        this.props.dispatch({type: `${namespace}/selectU`, params: parms})
    };

    /**
     * 获取栏目信息
     */
    columnListInteract = () => {
        this.props.dispatch({type: `${namespace}/selectC`})
    };

    /**
     * 获取一级栏目
     */
    listFirstColumnInteract = () => {
        this.props.dispatch({type: `${namespace}/selectF`})
    };

    uersInteract = () =>{
        this.props.dispatch({type: `${namespace}/selectUser`})
    };

    /**
     * 删除
     * @param key
     */
    deleteInteract = (key) => {
        this.props.dispatch({type: `${namespace}/deleteP`, param: key}).then(this.queryListInteract)
    };


    /**
     * 更新文章
     * @param passage
     */
    updateInteract = (passage) => {
        this.props.dispatch({type: `${namespace}/updateP`, param: passage}).then(this.queryListInteract)
    };

    /**
     * 新增文章
     * @param passage
     */
    insertInteract = (passage) => {
        this.props.dispatch({type: `${namespace}/insertP`, param: passage}).then(this.queryListInteract)
    };





    detail(record) {
        this.setState({
            visible: true,
            Operation: "Detail",
            Record: record,
            foot: null,
            detailVisible: "1"
        });
    }

    change(record) {
        const {accounts} = this.props;
        const  {user} =  this.state;
        let flag = "";
        accounts.map(it=>{
            if (it.name==record.author) {
                flag = it.id
            }
        });

        if (flag == this.state.user||user == 1){
            this.setState({
                visible: true,
                Operation: "Change",
                Record: record,
                detailVisible: "0"
            });
        }
        else {
            message.error("权限不够")
        }
    }

    add() {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        const  {user} = this.state;
        const passage={ create_time: currentdate, author: user, name: "", is_checked: 0, id: "", title: "", is_top: 0, content: "" };

        this.setState({
            visible: true,
            Operation: "Add",
            Record: passage,
            detailVisible: "0"
        });
    }


    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        const value = this.formRef.getItemsValue();
        let data = value.create_time.toString();
        data = moment(data).format('YYYY-MM-DD');
        const {parts} = this.props;
        const  accounts = this.props.accounts;

        console.log("account",accounts);
        parts.map(it => {
            if (it.name === value.columnId) {
                delete value.name;//删除属性
                value.columnId = it.id
            }
        });

        accounts.map(it => {
           if (it.name===value.author){
               value.author = it.id;

           }
        });

        value.createTime = data;
        delete value.create_time;
        value.isTop = 0;
        delete value.is_top;
        if (value.author.length!==0&&value.createTime.length!==0&&value.columnId!==0&&value.title.length!==0) {
            if (this.state.Operation==="Change") {
                this.updateInteract(value);
            }
            if (this.state.Operation==="Add"){
                // delete value.id;
                this.insertInteract(value);

            }
            this.setState({
                visible: false,
                confirmLoading: false,
            })
        }
        else {
            message.error("请输入完整信息");
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleFilter=(other,e,type)=>{
        const filter = this.state.filter;
        //type:1:标题，2：起始时间；3：截至时间
        switch (type) {
            case 1: filter.passageTitle = e.target.value;break;
            case 2: filter.startingTime = e;break;
            case 3: filter.endingTime = e;break;
        }
        this.setState({filter});
    };

    inquirePassage = () =>{

        if (this.state.filter.passageTitle.length === 0 && this.state.filter.startingTime.length === 0 && this.state.filter.endingTime.length === 0){
            message.success("显示所有信息");
            this.queryListInteract();
        }
        else if (this.state.filter.startingTime.length === 0 && this.state.filter.endingTime.length !== 0){
            message.error("请选择前时间点")
        }
        else if (this.state.filter.endingTime.length === 0 && this.state.filter.startingTime.length !== 0){
            message.error("请选择后时间点")
        }
        else {
            this.queryListInteractByUnclear(this.state.filter)
        }
    };

    selectPassageByPart = (key) => {
        key = key.toString();
        if (key === "all") {
            this.queryListInteract()
        } else {
            let type = key.slice(0, 1);
            let part = key.slice(1);
            let total = "";
            let parts = this.props.parts;
            if (type === "f") {
                parts.map(it => {
                    if (it.total == part) {
                        total += it.id+","
                    }
                });
                total=total.slice(0,-1);
                this.queryListInteractByPart(total)
            }
            if (type === "p") {
                this.queryListInteractByPart(part)
            }
        }
    };

    deletes =()=>{
        const {selectedRows} = this.state;
        if (selectedRows.length === 0){
            message.error("请选择删除栏目")
        } else {
            selectedRows.map(it=>{
                this.deleteInteract(it.id);
            });
        }
    };

    onSelectChange = (selectedRowKeys,selectedRows) => {
        this.setState({ selectedRowKeys });
        this.setState({selectedRows});
    };

    oncancel = () =>{
        this.setState({
            visible: false,
        });
    };


    render() {
        let {parts} = this.props;
        let {firstColumn} = this.props;
        let {selectedRowKeys} = this.state;
        let {selectedRows} = this.state;
        let passage =this.props.passage;

        const rowSelection = {
            selectedRowKeys,
            selectedRows,
            onChange: this.onSelectChange
        };

        const columns = [
            {
                title: 'title',
                dataIndex: 'title',
                width: 200,
            },
            {
                title: 'author',
                dataIndex: 'author',
                width: 150,
            },
            {
                title: 'column',
                dataIndex: 'name',
                width: 150,
            },
            {
                title: 'create_time',
                dataIndex: 'create_time',
                width: 150,
            },

            {
                title: 'Action',
                key: 'action',
                width: 300,
                render: (text, record, index) => (
                    <span>
                        <span className={styles.operator} onClick={index => {
                            this.detail(record)
                        }}>Detail</span>
                        <Divider type="vertical"/>
                        <span className={styles.operator} onClick={index => {
                            this.change(record)
                        }}>Change</span>
                        <Divider type="vertical"/>
                        <Popconfirm
                            title="Are you sure？"
                            icon={<Icon type="question-circle-o" style={{color: 'red'}}/>}
                            onConfirm={() => {
                                const {accounts} = this.props;
                                const  {user} =  this.state;
                                let flag = "";
                                accounts.map(it=>{
                                    if (it.name==record.author) {
                                        flag = it.id
                                    }
                                });
                                if (flag == this.state.user||user == 1){
                                    this.deleteInteract(record.id)
                                }
                                else {
                                    message.error("权限不够")
                                }

                                // this.deleteInteract(record.id)
                            }}
                            onCancel={() => {
                                message.error('Click on No')
                            }}
                        >
                        <a href="#">Delete</a>
                        </Popconfirm>
                        <Divider type="vertical"/>
                    </span>
                ),
            },
        ];


        return (

            <Row type="flex" justify="space-between">
                <Tree defaultExpandAll={true} onSelect={key => this.selectPassageByPart(key)}>
                    <TreeNode key={"all"} title={"所有栏目"}>
                        {
                            firstColumn === null ? null : firstColumn.map(it => {
                                return (
                                    <TreeNode title={it.name} key={"f" + it.id}>
                                        {
                                            parts === null ? null : parts.map(part => {
                                                if (part.total === it.id) {
                                                    return (
                                                        <TreeNode title={part.name} key={"p" + part.id}/>
                                                    )
                                                }
                                            })
                                        }
                                    </TreeNode>
                                )
                            })
                        }
                    </TreeNode>
                </Tree>

               <div>
                   <Row type="flex" justify="space-between">
                       <div id="serch">
                           <span>文章标题</span>
                           <Input  size={"small"} allowClear className={styles.searchInput} onChange={e=>this.handleFilter(null,e,1)}/>
                           <span>创建日期，从：</span>
                           <DatePicker  size={"small"} onChange={(dateString,date)=>this.handleFilter(dateString,date,2)}/>
                           <span>&nbsp;到&nbsp;</span>
                           <DatePicker  size={"small"} onChange={(dateString,date)=>this.handleFilter(dateString,date,3)}/>
                           <Button size={"small"} type="primary" icon="search" onClick={()=>{this.inquirePassage()}}>
                               搜索
                           </Button>
                       </div>
                       <div id="optiong">
                           <Divider type="vertical"/>
                           <Popconfirm title='确定要删除所选中的文章吗？' cancelText='点错了' okText='确认' onConfirm={()=>this.deletes()}>
                               <span className={styles.operator} style={{color: "#ee504c"}} >Delete</span>
                           </Popconfirm>
                           <Divider type="vertical"/>
                           <span
                               className={styles.operator}
                               type="primary"
                               onClick={index => {
                                   this.add()
                               }}
                           >Add</span>
                           <Divider type="vertical"/>
                       </div>
                   </Row>
                   <Table {...this.state} rowSelection={rowSelection} columns={columns} dataSource={this.props.passage} rowKey={record => record.id}
                   />
               </div>

                <Modal
                    title={"PassageManage - " + this.state.Operation}
                    width={850}
                    style={{top: 10}}
                    visible={this.state.visible}
                    destroyOnClose={true}
                    onCancel={this.oncancel}

                    footer={this.state.detailVisible === "0" ? [<Button key="back" onClick={() => {
                        this.handleCancel()
                    }}>取消</Button>,
                        <Button key="submit" onClick={() => {
                            this.handleOk()
                        }}>保存</Button>] : <Button key="sure" onClick={() => {
                        this.handleCancel()
                    }}>确定</Button>}

                >
                    <PassageForm
                        Record={this.state.Record}
                        Operation={this.state.Operation}
                        wrappedComponentRef={(form) => this.formRef = form}
                        Parts={this.props.parts}
                    />
                </Modal>
            </Row>
        );
    }

}

export default connect(mapStateToProps)(PassageManage);