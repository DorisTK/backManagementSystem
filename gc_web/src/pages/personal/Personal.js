import React from 'react';
import router from 'umi/router';
import {connect} from 'dva';
import {Card, Avatar, Upload, Modal, Icon, message, List, Form, Input, Radio, Button} from 'antd';
import * as styles from './Personal.less';
const namespace = 'personal';

function mapStateToProps(state) {
    return{
        currentUser: state.personal.currentUser
    }
}

function getBase64(img, callback){
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
/**
 * 限制用户上传的图片格式和大小
 * */
function beforeUpload(file){
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

let storage=window.localStorage;
class Personal extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            changeHeadVisible: false,//用于控制修改头像的模态框是否显示
            loading: false,
            headName: '',//用于和数据库交互的头像名
            key: 'tab1',//用于控制当前显示的是基本资料还是修改密码
            newPassword:'',//新秘密
            user:{//临时用户
                name:'',
                sex:'',
                operatorName:'',
                email:''
            },

        }
    }

    componentDidMount(){
        this.queryCurrentUser();
    }

    /**
     * 获取当前用户
     * */
    queryCurrentUser=()=>{
        let storage=window.localStorage;
        const id = storage.id;
        this.props.dispatch({type:`${namespace}/queryCurrentUser`, params: id})
    };
    /**
     * 控制是否显示修改头像框
     * */
    changeHead=(flag)=>{
        flag===1?this.setState({changeHeadVisible: false}):this.setState({changeHeadVisible: true});
    };
    handleChange = info => {
        this.setState({headName: info.file.name});
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
            this.props.dispatch({type: `${namespace}/uploadFile`, params: info.file.originFileObj});
            this.setState({headName:info.file.originFileObj.name})
        }
    };
    /**
     * 修改头像
     * */
    updateHead=()=>{
        let user = this.props.currentUser[0];
        user.head_photo = this.state.headName;
        user.operatorType = 1;
        delete user.operator_type;
        this.props.dispatch({type:`${namespace}/changeUsers`, params: user});
        storage['headPhoto'] = this.state.headName;
        router.push("/web/personal");
        this.setState({changeHeadVisible: false})
    };
    /**
     * 退出个人中心
     * */
    closePerson=()=>{
        router.push("/web");
    };
    /**
     * 改变修改基本资料或修改密码
     * */
    onTabChange = (key) => {this.setState({ key: key });};
    /**
     * 保存基本资料
     * */
    saveInformation=e=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if(!err){
                let user = this.props.currentUser[0];
                user.name=values.name;
                user.email=values.email;
                user.sex=values.sex;
                user.operatorType=values.operator_type;
                user.head_photo = storage.headPhoto;
                this
                    .props
                    .dispatch({type:`${namespace}/changeUsers`, params: user})
                    .then(()=>{
                        let storage=window.localStorage;
                        storage.headPhoto = this.props.currentUser[0].headPhoto;
                        this.queryCurrentUser()
                    })
            }
        });
    };
    /**
     * 修改密码
     * */
    changePassword=e=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                let user = this.props.currentUser;
                user.password = values.newPassword;
                this
                    .props
                    .dispatch({type:`${namespace}/changeUsers`, params: user})
                    .then(this.queryCurrentUser)
            }
        });
    };
    /**
     * 获取新旧密码的回调
     * */
    handlePassword=(e)=>{
        this.setState({newPassword:e.target.value})
    };

    render(){
        let user = {};
        this.props.currentUser[0]===undefined?user=this.state.user:user=this.props.currentUser[0];
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (<div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>);
        const data = [
            {
                title:'名称',
                data:user.name,
            },{
                title:'性别',
                data:user.sex,
            },{
                title:'身份',
                data:user.operatorName,
            },{
                title:'邮箱地址',
                data:user.email,
            }
        ];
        const { imageUrl } = this.state;
        const tabList = [
            {
                key: 'tab1',
                tab: '基本资料',
            },
            {
                key: 'tab2',
                tab: '修改密码',
            },
        ];
        const testKey = this.state.key;

        const contentList = {
            tab1: <Form onSubmit={this.saveInformation}>
                <Form.Item label="用户名称">
                    {getFieldDecorator('name', {
                        initialValue: user!=null?user.name:null,
                        rules: [
                            {
                                required: testKey==='tab1'?true:false,
                                message: '请输入名称',
                            }
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="邮箱">
                    {getFieldDecorator('email', {
                        initialValue: user!=null?user.email:null,
                        rules: [
                            {
                                required: testKey==='tab1'?true:false,
                                message: '请输入邮箱',
                            }
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="性别">
                    {getFieldDecorator('sex', {
                        initialValue:user.sex==='男'?'男':'女',
                        rules: [
                            {
                                required: testKey==='tab1'?true:false,
                                message: '请选择性别',
                            }
                        ],
                    })( <Radio.Group >
                        <Radio value='男'>男</Radio>
                        <Radio value='女'>女</Radio>
                    </Radio.Group>)}
                </Form.Item>
                <Button type="primary" htmlType="submit">保存</Button>
                <Button type="danger" onClick={this.closePerson}>关闭</Button>
            </Form>,
            tab2: <Form  onSubmit={this.changePassword}>
                <Form.Item label="旧密码：">
                    {getFieldDecorator('oldPassword', {
                        rules: [
                            {
                                required: testKey==='tab2'?true:false,
                                message: '请输入旧密码',
                            },{
                                validator: (rule, value, callback) => {
                                    if (value!==user.password&&testKey==='tab2') {
                                        callback('请输入正确的旧密码')
                                    }
                                    callback()
                                }
                            }
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="新密码：">
                    {getFieldDecorator('newPassword', {
                        rules: [
                            {
                                required: testKey==='tab2'?true:false,
                                message: '请输入新密码',
                            }
                        ],
                    })(<Input onChange={this.handlePassword}/>)}
                </Form.Item>
                <Form.Item label="确认密码：">
                    {getFieldDecorator('submitPassword', {
                        rules: [
                            {
                                required: testKey==='tab2'?true:false,
                                message: '请输入确认密码',
                            },{
                                validator: (rule, value, callback) => {
                                    if (value!==this.state.newPassword && testKey==='tab2') {
                                        callback('与新密码不一致')
                                    }
                                    callback()
                                }
                            }
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Button type="primary" htmlType="submit">保存</Button>
                <Button type="danger"  onClick={this.closePerson}>关闭</Button>
            </Form>
        };

        return(
            <div style={{display:'flex'}}>
                <Card title="个人资料">

                    <img  src={"http://localhost:8080/img/relative/"+storage.headPhoto}
                          style={{borderRadius:'50%',width:'80px',height:'80px',marginLeft: '36%'}}/>
                    <span onClick={()=>this.changeHead(2)} className={styles.changeHead}>修改头像</span>
                     <List dataSource={data}
                          renderItem={item => (
                              <List.Item>
                                  <List.Item.Meta
                                      avatar={<Icon type="user" />}
                                      title={<span>{item.title}</span>}
                                  />
                                  <div>{item.data}</div>
                              </List.Item>
                          )}
                    >
                    </List>
                </Card>
                <Card title="基本资料"
                      tabList={tabList}
                      activeTabKey={this.state.key}
                      onTabChange={this.onTabChange}
                >
                    {contentList[this.state.key]}
                </Card>
                <Modal visible={this.state.changeHeadVisible}
                       onOk={this.updateHead}
                       onCancel={()=>this.changeHead(1)}
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                    </Upload>
                </Modal>
            </div>
        )
    }

}

export default connect(mapStateToProps)(Form.create()(Personal));