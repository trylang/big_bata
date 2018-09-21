import Layout from '../views/layout/index'
import Blank from '../views/layout/blank'

const meta = {requiresAuth: true}

const routes = [
    {
        path: '/',
        redirect: {name: 'data-marketing-index'},
        component: Layout
    }, 
    {
        path: '/data-marketing',
        name: 'data-marketing',
        meta,
        component: Layout,
        children: (pre => [{
            path: '',
            name: `${pre}-index`,
            meta: {...meta, title: '数据概览', hasFilterBox: true, path: 'index', icon: 'icon-shujugailan'},
            component: Blank,
            children: [{
                path: 'index',
                name: `${pre}-index`,
                meta: {...meta, title: '概览', hasFilterBox: true, path: 'index', icon: 'icon-shujugailan'},
                component: () => import('@/views/pages/data-marketing/overview/index')
            }]
        }, 
        {
            path: 'content',
            name: `${pre}-content`,
            meta: {...meta, title: '营销数据分析', hasFilterBox: true, path: 'activity', icon: 'icon-huodongxiaoguofenxi'},
            component: Blank,
            children: [
                {
                    path: 'activity',
                    name: `${pre}-activity`,
                    meta: {...meta, title: '活动效果分析', hasFilterBox: true, path: 'activity', icon: 'icon-huodongxiaoguofenxi'},
                    component: () => import('@/views/pages/data-marketing/activity')
                }, 
                {
                      path: 'comparative',
                      name: `${pre}-comparative`,
                      meta: {...meta, title: '活动对比分析', hasFilterBox: true, path: 'comparative', icon: 'icon-huodongduibifenxi'},
                      component: () => import('@/views/pages/data-marketing/comparative/index')
                },
                {
                    path: 'ticket',
                    name: `${pre}-ticket`,
                    meta: {...meta, title: '券效果分析', hasFilterBox: true, path: 'ticket', icon: 'icon-quanxiaoguofenxi'},
                    component: () => import('@/views/pages/data-marketing/ticket/index')
                },
                    
                {
                    path: 'sales-member',
                    name: `${pre}-sales-member`,
                    meta: {...meta, title: '会员经营分析', hasFilterBox: true, path: 'sales-member', icon: 'icon-huiyuanjingyingfenxi'},
                    component: () => import('@/views/pages/data-marketing/sales-member/index')
                },
                {
                  path: 'relevance',
                  name: `${pre}-relevance`,
                  meta: {...meta, title: '客流关联分析', hasFilterBox: true, path: 'relevance', icon: 'icon-keliuguanlianfenxi'},
                  component: () => import('@/views/pages/data-marketing/relevance/index')
                },
            ]
        },
        {
            path: 'settings',
            name: `${pre}-settings`,
            meta: {...meta, title: '系统设置', hasFilterBox: true,  path: 'settings', icon: 'icon-xitongpeizhi'},
            component: Blank,
            children: [{
                path: 'settings',
                name: `${pre}-settings`,
                meta: {...meta, title: '设置', hasFilterBox: true,  path: 'settings', icon: 'icon-xitongpeizhi'},
                component: () => import('@/views/pages/data-marketing/settings/index')
            }]
            
        }])('data-marketing')
    },
    {
        path: '/data-crm',
        name: 'data-crm',
        meta,
        component: Layout,
        children: [{
            path: '/drawer1',
            name: 'data-crm-drawer1',
            meta: {...meta, title: 'drawer1', path: 'index', icon: 'icon-shujugailan'},
            component: Blank,
            children: (pre => [{
                path: 'demo1-1',
                name: `${pre}-demo1-1`,
                meta: {...meta, title: 'demo1-1', path: 'demo1-1', icon: 'icon-shujugailan'},
                component: () => import('@/views/pages/data-crm/drawer1/demo1-1')
            }, 
            {
                path: 'demo1-2',
                name: `${pre}-demo1-2`,
                meta: {...meta, title: 'demo1-2', path: 'demo1-2', icon: 'icon-huodongxiaoguofenxi'},
                component: () => import('@/views/pages/data-crm/drawer1/demo1-2')
            }])('data-crm')
        },
        {
            path: '/drawer2',
            name: 'data-crm-drawer2',
            meta: {...meta, title: 'drawer2', path: 'index', icon: 'icon-shujugailan'},
            component: Blank,
            children: (pre => [{
                path: 'demo2-1',
                name: `${pre}-demo2-1`,
                meta: {...meta, title: 'demo2-1', path: 'demo2-1', icon: 'icon-shujugailan'},
                component: () => import('@/views/pages/data-crm/drawer2/demo2-1')
            }, 
            {
                path: 'demo2-2',
                name: `${pre}-demo2-2`,
                meta: {...meta, title: 'demo2-2', path: 'demo2-2', icon: 'icon-huodongxiaoguofenxi'},
                component: () => import('@/views/pages/data-crm/drawer2/demo2-2')
            }])('data-crm')
        }]
    },
    
];

export default routes
