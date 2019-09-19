import { Component } from 'react';
import {connect} from 'dva';
import { Layout, Menu, Icon } from 'antd';
import title from '../image/title.png';
import Breakcrumbs from './components/Breakcrumbs.js'
import WebHeader from './components/WebHeader.js';
import * as styles from './Index.less';
import { Scrollbars } from 'react-custom-scrollbars';
import Link from 'umi/link';

// Header, Footer, Sider, Content组件在Layout组件模块下
const {Sider, Content } = Layout;

//引入子菜单组件
const {SubMenu} = Menu;
const namespace = 'index';
function mapStateToProps(state) {
    return{
        permission: state.index.permission,
        listModule: state.index.listModule,

    }
}

class Index extends Component {
    constructor(props){
        super(props);
        this.state={
            collapsed: false,//当前侧边栏是否展开
        }
    }
    componentWillMount(){
        let storage = window.localStorage;
        this.props.dispatch({type:`${namespace}/queryPermission`, params:storage.operator});
        this.props.dispatch({type:`${namespace}/queryModule`})
    }


    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        let modules = [];
        const permission = this.props.permission[0];
        if(permission!==undefined){
            modules = permission.modules.split(",");
        }

        let storage=window.localStorage;
        return (
            <Layout>
                <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}
                       collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div>
                        <img src={title} style={{width:'255px', height: '59px'}}/>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="dashboard" />网站内容管理</span>}
                        >
                            {
                                modules.indexOf("3")!==-1?<Menu.Item key="1"><Link to="/web/messageManage"><Icon type="message" theme="filled" />留言管理</Link></Menu.Item>:null
                            }
                            {
                                modules.indexOf("4")!==-1?<Menu.Item key="2"><Link to="/web/passageManage"><Icon type="file-text" theme="filled" />文章管理</Link></Menu.Item>:null
                            }
                            {
                                modules.indexOf("5")!==-1?<Menu.Item key="3"><Link to="/web/checkPassage"><Icon type="check-circle" theme="filled" />审核文章</Link></Menu.Item>:null
                            }
                            {
                                modules.indexOf("6")!==-1?<Menu.Item key="4"><Link to="/web/columnManage"><Icon type="folder" theme="filled" />栏目管理</Link></Menu.Item>:null
                            }
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="setting" theme="filled" />系统设置</span>}
                        >
                            {
                                modules.indexOf("7")!==-1?<Menu.Item key="5" ><Link to="/system/limit"><Icon type="lock" />权限管理</Link></Menu.Item>:null
                            }
                            {
                                modules.indexOf("9")!==-1?<Menu.Item key="7"><Link to="/system/roleAssignment"><Icon type="solution" />角色分配</Link></Menu.Item>:null
                            }
                            {
                                modules.indexOf("10")!==-1?<Menu.Item key="8"><Link to="/system/personalManage"><Icon type="user" />人员管理</Link></Menu.Item>:null
                            }
                            {
                                modules.indexOf("11")!==-1?<Menu.Item key="9"><Link to="/system/roleManage"><Icon type="usergroup-add" />角色管理</Link></Menu.Item>:null
                            }
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout >
                    <WebHeader toggle={this.toggle} id={storage.id} style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</WebHeader>
                    <div className={styles.breadcrumb}>
                        <Breakcrumbs location={this.props.location}/>
                    </div>
                    <Content
                        style={{
                            margin: '5px 16px 0'
                        }}>
                        <Scrollbars>
                            <div
                                style={{
                                    padding: 24,
                                    background: '#fff',
                                    minHeight: '100%'
                                }}>
                                {this.props.children}
                            </div>
                        </Scrollbars>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default connect(mapStateToProps)(Index);