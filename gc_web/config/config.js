export default {
    plugins: [
        [
            'umi-plugin-react', {
                antd: true,
                dva: true
            },
        ]
    ],
    theme: {
        "primary-color": "#1DA57A",
    },
    routes : [
        {
            path:'/login',
            component: '../pages/login/Login',
        },
        {
            path: '/',
            component: '../layouts',
            routes: [
                {
                    path:'/',
                    component:'../pages/home/Home',
                },
                {
                    path:'/web',
                    component: '../pages/home/Home',
                },
                {
                    path:'/web/personal',
                    component:'../pages/personal/Personal'
                }, {
                    path:'/web/messageManage',
                    component: '../pages/messageManage/MessageManage',
                }, {
                     path:'/web/passageManage',
                     component: '../pages/passageManage/PassageManage',
                }, {
                    path:'/web/checkPassage',
                    component: '../pages/checkPassage/CheckPassage',
                }, {
                    path:'/web/columnManage',
                    component: '../pages/columnManage/ColumnManage',
                },
                {
                    path:'/system',
                    component:'../pages/home/Home',
                },{
                    path: '/system/limit',
                    component: '../pages/limit/Limit'
                },{
                    path: '/system/roleAssignment',
                    component: '../pages/roleAssignment/RoleAssignment'
                },{
                    path: '/system/roleManage',
                    component: '../pages/roleManage/RoleManage'
                },{
                    path:'/system/personalManage',
                    component:'../pages/personalManage/PersonalManage'
                }
            ]
        },

    ],
    proxy:{
        // 当你请求是以/api开头的时候，则我帮你代理访问到http://localhost:3000
        // 例如：
        // /api/users  http://localhost:3000/api/users
        // 我们真是服务器接口是没有/api的
        "/api":{
            target:"http://localhost:8080",
            pathRewrite:{"^/api":""}
        }
    }
};