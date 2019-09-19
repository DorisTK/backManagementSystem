import React from 'react';
import {connect} from 'dva';
import {Table, Button, Modal, Row, Col, Select, DatePicker, Input, Icon} from 'antd';
import * as styles from './CheckPassage.less';
 const namespace = 'checkPassage';
const {Option} = Select;

 function mapStateToProps(state) {
     return{
         listPassage: state.checkPassage.listPassage,
         listColumn: state.checkPassage.listColumn,
         listUser: state.checkPassage.listUser
     }
 }

 class CheckPassage extends React.Component{
     constructor(props){
         super(props);
         this.state={
             detailVisible: false,// 控制是否显现文章详情
             currentPassage: {title:null},// 当前被选中的文章
             filter:{
                 author:'',//作者名
                 columnName:'',//栏目名称
                 startTime:'',//起始时间
                 endTime:'',//截止时间
                 isChecked:-1,//是否审核（0：未审核；1：通过；2：不通过）
             }
         }
     };

     componentWillMount(){
         this.queryListPassage();
         this.props.dispatch({type:`${namespace}/listColumn`});
         this.props.dispatch({type:`${namespace}/listUser`});
     }

     /**
      * 查询所有文章
      * */
     queryListPassage=()=>{
         const filter = this.state.filter;
         this.props.listUser.map(it=>{
             it.name === filter.author?filter.author = it.id:null
         });
         this.props.dispatch({type:`${namespace}/listPassage`, params: filter})
     };
     /**
      * 查看文章内容
      * */
     displayDetail=(key)=>{
         let passage = null;
         this.props.listPassage.map(it=>{
             it.id === key?passage=it:null;
         });
         this.setState({
             detailVisible: true,
             currentPassage: passage
         })
     };
     cancelDetail=()=>{this.setState({detailVisible: false})};
     /**
      * 审核
      * */
     check=(isChecked)=>{
         const passage = this.state.currentPassage;
         passage.is_checked = isChecked;
         this.props.listColumn.map(it=>{
             if(it.name===passage.name){
                 passage.columnId = it.id;
                 delete passage.name
             }
         });
         passage.createTime = passage.create_time;
         delete passage.create_time;
         passage.isChecked = passage.is_checked;
         delete passage.is_checked;
         passage.idTop = passage.is_top;
         delete passage.is_top;
         this.props.dispatch({type:`${namespace}/check`, passage}).then(this.queryListPassage);
         this.setState({detailVisible: false})
     };
     /**
      * 获取当前过滤条件
      * */
     handleFilter=(other,e,type)=>{
         const filter = this.state.filter;
         //type:1: 作者名，2：栏目名称，3: 起始时间；4：截止时间；5：审核情况
         switch (type) {
             case 1: filter.author = e.target.value;break;
             case 2: filter.columnName = e.target.value;break;
             case 3: filter.startTime = e;break;
             case 4: filter.endTime = e;break;
             case 5: filter.isChecked = e;break;
         }
         this.setState({filter: filter})
     };
     render(){
         const column = [
             {
                 title:'文章标题',
                 dataIndex:'title'
             },{
                 title:'作者',
                 dataIndex:'author'
             },{
                 title:'栏目名称',
                 dataIndex:'name'
             },{
                 title:'创建日期',
                 dataIndex:'create_time'
             },{
                 title:'是否置顶',
                 dataIndex:'is_top',
                 render: (is_top) => {
                     let color = is_top === 0 ? "#99D060" : "#CECECE";
                     let word = is_top === 0 ? "是" : "否";
                     return <div style={{display: 'flex', alignItems: 'center'}}>
                         <div style={{
                             width: "10px",
                             height: "10px",
                             background: color,
                             borderRadius: "50%",
                             opacity: '1',
                         }}>
                         </div>
                         <span style={{color: color}}>{word}</span>
                     </div>
                 }
             },{
                 title:'是否审核',
                 dataIndex:'is_checked',
                 render: (is_checked) => {
                     let color = 'white';
                     let word = '';
                     switch (is_checked) {
                         case 0: color = '#CECECE';
                             word = '未审核';
                             break;
                         case 1: color = '#99D060';
                             word = '通过审核';
                             break;
                         case 2: color = '#FF4040';
                             word = '未通过审核';
                             break;
                     }
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
                 render: (record) =>
                     <div>
                         <Button onClick={()=>{this.displayDetail(record.id)}}>审核</Button>
                     </div>
             }
         ];

         return(
             <div>
                 <Row>
                     <Col span={4} style={{display: 'flex'}}>
                         <span className={styles.searchWord}>作者</span>
                         <Input className={styles.searchInput}
                                placeholder="搜索作者" allowClear onChange={e=>this.handleFilter(null,e,1)}
                         />
                     </Col>
                     <Col span={4} style={{display: 'flex'}}>
                         <span className={styles.searchWord}>栏目</span>
                         <Input className={styles.searchInput}
                                placeholder="搜索栏目" allowClear onChange={e=>this.handleFilter(null,e,2)}
                         />
                     </Col>
                     <Col span={4} style={{display: 'flex'}}>
                         <span className={styles.searchWord}>起始</span>
                         <DatePicker  className={styles.searchInput}
                                      placeholder="选择时间" onChange={(dateString,date)=>this.handleFilter(dateString,date,3)} />
                     </Col>
                     <Col span={4} style={{display: 'flex'}}>
                         <span className={styles.searchWord}>截止</span>
                         <DatePicker  className={styles.searchInput}
                                      placeholder="选择时间" onChange={(dateString,date)=>this.handleFilter(dateString,date,4)} />
                     </Col>
                     <Col span={6} style={{display: 'flex'}}>
                         <span className={styles.searchWords}>审核情况</span>
                         <Select  className={styles.searchInput} onChange={values=>this.handleFilter(null,values,5)}>
                             <Option value={0}>未审核</Option>
                             <Option value={1}>已通过审核</Option>
                             <Option value={2}>未通过审核</Option>
                         </Select>
                     </Col>
                     <Col >
                         <Button type="dashed" shape="circle" icon="search" onClick={this.queryListPassage}/>
                     </Col>
                 </Row>
                 <Table
                     rowKey={record=>record.id}
                     columns={column}
                     dataSource={this.props.listPassage}
                 />
                 <Modal
                     visible={this.state.detailVisible}
                     title={this.state.currentPassage.title}
                     onCancel={this.cancelDetail}
                     footer={[<Button  key="back" onClick={()=>{this.check(2)}}>不通过审核</Button>,
                        <Button key="submit" onClick={()=>{this.check(1)}}>通过审核</Button>,
                     ]}
                 >
                     <div>{this.state.currentPassage.content}</div>
                 </Modal>
             </div>
         )
     }
 }

 export default connect(mapStateToProps)(CheckPassage);