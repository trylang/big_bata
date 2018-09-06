import Layout from '../views/layout/index'

const meta = {requiresAuth: true}

const routes = [
    {
        path: '/',
        redirect: {name: 'data-marketing-index'},
        component: Layout
    }, {
        path: '/data-marketing',
        name: 'data-marketing',
        meta,
        component: Layout,
        children: (pre => [{
            path: 'index',
            name: `${pre}-index`,
            meta: {...meta, title: '数据概览', path: 'index', icon: 'icon-shujugailan'},
            component: () => import('@/views/pages/data-marketing/overview/index')
        }, {
            path: 'activity',
            name: `${pre}-activity`,
            meta: {...meta, title: '活动效果分析', path: 'activity', icon: 'icon-huodongxiaoguofenxi'},
            component: () => import('@/views/pages/data-marketing/activity')
        }, {
            path: 'ticket',
            name: `${pre}-ticket`,
            meta: {...meta, title: '券效果分析', path: 'ticket', icon: 'icon-quanxiaoguofenxi'},
            component: () => import('@/views/pages/data-marketing/ticket/index')
        },
            //  {
            //   path: 'sales-day',
            //   name: `${pre}-sales-day`,
            //   meta: {...meta, title: '日营销数据分析', path: 'sales-day', icon: 'icon-shujugailan'},
            //   component: () => import('@/views/pages/data-marketing/sales-day/index')
            // },
            {
                path: 'sales-member',
                name: `${pre}-sales-member`,
                meta: {...meta, title: '会员经营分析', path: 'sales-member', icon: 'icon-huiyuanjingyingfenxi'},
                component: () => import('@/views/pages/data-marketing/sales-member/index')
            },
            // {
            //   path: 'write-off',
            //   name: `${pre}-write-off`,
            //   meta: {...meta, title: '核销数据分析', path: 'write-off', icon: 'icon-shujugailan'},
            //   component: () => import('@/views/pages/data-marketing/write-off/index')
            // },
            {
                path: 'settings',
                name: `${pre}-settings`,
                meta: {...meta, title: '系统设置', path: 'settings', icon: 'icon-xitongpeizhi'},
                component: () => import('@/views/pages/data-marketing/settings/index')
            }])('data-marketing')
    }
];

export default routes
