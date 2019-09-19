import React, { Component } from 'react';
import { Form, Input,DatePicker,Select,message, Upload, Button, Icon} from 'antd';
import moment from 'moment';
import {connect} from 'dva';
const namespace = 'selectPassage';
function mapStateToProps(state) {
    return{
    }
}

const FormItem = Form.Item;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';
const staticPath = "E:\\resource\\";

const {Option} = Select;

let flag = false;
let typeText = true;


class CVForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            fileList: [
                {
                    uid: '-1',
                    name: `${this.props.Record.title}`,
                    status: 'done',
                    url: staticPath+`${this.props.Record.content}`,
                },
            ],
            uploading: false,
        };
    }

    componentWillMount() {
        // To disabled submit button at the beginning.
        setTimeout(() => {  this.props.form.validateFields()}, 0);
    
        if (this.props.Record.name==="教学课件"||this.props.Record.name==="教学视频") {
            typeText = false
        }else {
            typeText = true
        }

    }

    getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
        const valus= this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        if (valus.columnId==19||valus.columnId==20){
            valus.content = this.state.fileList[0].url
        }
        return valus;
    };



    tests = (key,value) =>{
        if (key==19||key==20) {
            typeText = false
        }else {
            typeText = true
        }
    };


    handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.name;
            }
            return file;
        });
        this.setState({fileList});
    };

    handleUpload = () => {
        this.setState({
            uploading: true,
        });
        try {
            this.props.dispatch({type:`${namespace}/UploadFile`, params: this.state.fileList[0].originFileObj});
            this.setState({
                uploading: false,
            });
            message.success("上传成功")
        }
        catch (e) {
        }
    };



    render() {
        const { getFieldDecorator } = this.props.form;
        const {Operation,Parts} = this.props;
        const { uploading, fileList } = this.state;


        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        const props = {
            name:'file',
            onChange: this.handleChange,
            multiple: true,
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        if (Operation === "Detail") {
            flag = true;
        }
        if (Operation === "Change") {
            flag = false;
        }
        if (Operation == "Add"){
            flag = false;
        }
        return (

            <Form {...formItemLayout}>
                <FormItem
                    label="Id"
                    style={{display:'none'}}
                >
                    {getFieldDecorator('id', {
                        rules: [{ required: false }]
                    })(
                        <Input  disabled= {true} />
                    )}
                </FormItem>
                <FormItem
                    label="IsChecked"
                    style={{display:'none'}}
                >
                    {getFieldDecorator('isChecked', {
                        rules: [{ required: false }]
                    })(
                        <Input   disabled={true} />
                    )}
                </FormItem>

                <FormItem
                    label="Title"
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: false, message: 'Please input your Title!' }],
                    })(
                        <Input  disabled={flag} />
                    )}
                </FormItem>
                <FormItem
                    label="Author"
                    style={{display:'none'}}
                >
                    {getFieldDecorator('author', {
                        rules: [{ required: false,}],
                    })(
                        <Input  disabled={flag} />
                    )}
                </FormItem>
                <FormItem
                    label="Column"
                >
                    {getFieldDecorator('columnId', {

                        rules: [{ required: false }]
                    })(
                        <Select  disabled={flag} onChange={(value,keys)=>{this.tests(value,keys)}}>
                            {Parts.map((Part,index) => {
                                return (
                                    <Option key={index} value={Part.id}>{Part.name}</Option>
                                )
                            })
                            }
                        </Select>

                    )}
                </FormItem>
                <FormItem
                    label="CreateTiem"
                >
                    {getFieldDecorator('create_time', {
                        rules: [{ required: false }]
                    })(
                       <DatePicker disabled={true}/>
                    )}
                </FormItem>


                <FormItem
                    label="Content"
                >
                    {getFieldDecorator('content', {
                        rules: [{ required:false }]
                    })(
                        typeText?<TextArea disabled={flag} /> :
                            <div>
                                <Upload {...props} fileList={this.state.fileList} >
                                    <Button disabled={flag}>
                                        <Icon type="upload" /> Upload
                                    </Button>
                                 </Upload>

                                <Button
                                    type="primary"
                                    onClick={this.handleUpload}
                                    disabled={fileList.length === 0}
                                    loading={uploading}
                                    style={{ marginTop: 16 }}
                                >
                                    {uploading ? 'Uploading' : 'Start Upload'}
                                </Button>
                            </div>
                    )}
                </FormItem>

            </Form>
        );
    }
}


const PassageForm = Form.create({
    mapPropsToFields(props) {
        return {
            name: Form.createFormField({
                value: props.Record.name,
            }),
            id: Form.createFormField({
                value: props.Record.id,
            }),
            isChecked: Form.createFormField({
                value: props.Record.is_checked,
            }),
            title: Form.createFormField({
                value: props.Record.title,
            }),
            author: Form.createFormField({
                value: props.Record.author,
            }),
            columnId: Form.createFormField({
                value: props.Record.name,
            }),
            create_time: Form.createFormField({
                value: moment(props.Record.create_time, dateFormat),
            }),
            content: Form.createFormField({
                value: props.Record.content,
            }),
        };
    }
})(CVForm);

export default connect(mapStateToProps)(PassageForm);

/*
let formData = new FormData();
                formData.append("file",info.file.originFileObj);
                FileService.FileUp(formData);
 */