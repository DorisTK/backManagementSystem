import React from 'react';
import * as styles from './Login.less';
import {connect} from 'dva';
import Gverify from '../../util/gverify';
import {Form, Card, Input, Icon, Button, Row, Col} from 'antd';
import ReactCanvasNest from 'react-canvas-nest';

const namespace = 'login';
function mapStateToProps(state) {
    return {
        users: state.login.users,
    }
}
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            verifyCode: null,
            focusItem: -1,
        }
    }
    componentDidMount () {
        this.setState({
            verifyCode: new Gverify('v_container')
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({type: `${namespace}/login`, loginInfo: values});
            }
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {verifyCode} = this.state;
        return (
            <div className={styles.login_total}>
                <ReactCanvasNest className = 'canvasNest' config = {{ pointColor: ' 155, 155, 155 ',lineColor: '255,255,255', lineWidth: '2'}}
                 style = {{zIndex: -1, height: '100%', width:'100%',
                     backgroundImage:`url(${require('../../image/bg3.jpg')})`,
                     backgroundSize:'100% 100%'}} />
                <Card className={styles.card}>
                    <div className={styles.title}>网站后台管理系统</div>
                    <div>
                        <Form  onSubmit={this.handleSubmit}  className={styles.login_form}>
                            <Form.Item>
                                {getFieldDecorator('account', {
                                    rules: [{required: true, message: '请输入用户名'}],
                                })(
                                    <Input
                                        className={styles.input}
                                        placeholder={"请输入账号"}
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        styles={{width:'57%'}}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码'}],
                                })(
                                    <Input
                                        placeholder={"请输入密码"}
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        styles={{width:'57%'}}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('verification', {
                                    validateFirst: true,
                                    rules: [{required: true, message: '请输入验证码'},
                                        {
                                            validator: (rule, value, callback) => {
                                                if (!verifyCode.validate(value)) {
                                                    callback('验证码错误')
                                                }
                                                callback()
                                            }
                                        }
                                    ]
                                })(
                                    <
                                        Row gutter={8}>
                                        <Col span={16}>
                                            <Input
                                                placeholder='验证码'
                                                onFocus={() => this.setState({focusItem: 2})}
                                                onBlur={() => this.setState({focusItem: -1})}
                                                size='large'/>
                                        </Col>
                                        <Col span={8}>
                                            <div id='v_container' style={{height: 40,marginTop: '22px'}}/>
                                        </Col>
                                    </Row>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className={styles.login_button}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Form.create()(Login));