import Link from 'umi/link';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import {Breadcrumb, Badge, Icon} from 'antd';

const routes = [
    {
        path: '/',
        breadcrumb: '网站后台管理系统',
        routes: [
            {
                path: '/web',
                breadcrumb: '网站内容管理',
                routes:[
                    {
                        path:'/web/personal',
                        breadcrumb: '个人中心'
                    },
                    {
                        path:'/web/messageManage',
                        breadcrumb: '留言管理'
                    },
                    {
                        path:'/web/passageManage',
                        breadcrumb: '文章管理'
                    },
                    {
                        path:'/web/checkPassage',
                        breadcrumb: '审核文章'
                    },
                    {
                        path:'/web/ColumnManage',
                        breadcrumb: '栏目管理'
                    },
                ]
            },
            {
                path:'/system',
                breadcrumb: '系统设置',
                routes:[
                    {
                        path: '/system/limit',
                        breadcrumb: '权限管理'
                    },{
                        path: '/system/Module',
                        breadcrumb: '模块管理'
                    },
                    {
                        path: '/system/RoleAssignment',
                        breadcrumb: '角色分配'
                    },
                    {
                        path: '/system/PersonalManage',
                        breadcrumb: '人员管理'
                    },
                    {
                        path: '/system/roleManage',
                        breadcrumb: '角色管理'
                    },
                    {
                        path: '/System/DefaultFeature',
                        breadcrumb: '默认功能管理'
                    },
                    {
                        path: '/System/HomeInformation',
                        breadcrumb: '首页信息设置'
                    }
                ]
            }
        ]
    }
];

const Breadcrumbs = withBreadcrumbs(routes)(
    ({breadcrumbs})=> (
        <div style={{margin:"10px 0 0 10px",verticalAlign:'middle',display: 'flex'}}>
            <Icon type="environment"/>
            <Breadcrumb separator={< Icon type = "double-right" />} classNames="spread">{
                breadcrumbs.map(({breadcrumb,match,location}, index) => (
                    <Breadcrumb.Item key={breadcrumb.key}>
                        <Link to={{
                            pathname: match.url,
                            state: match.params
                                ? match.params
                                : {},
                            query: location.query
                                ? location.query
                                : {}
                        }}>
                            <span style={{fontSize:'14px',fontFamily:'Microsoft YaHei',fontWeight:'400',lineHeight:'28px'}}>
                                {breadcrumb}
                            </span>
                        </Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </div>
    )
);

export default Breadcrumbs;