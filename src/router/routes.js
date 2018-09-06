import Layout from '../views/layout/index'

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
            path: 'index',
            name: `${pre}-index`,
            meta: {...meta, title: '数据概览', path: 'index', icon: 'icon-shujugailan'},
            component: () => import('@/views/pages/data-marketing/overview/index')
        }, 
        {
            path: 'activity',
            name: `${pre}-activity`,
            meta: {...meta, title: '活动效果分析', path: 'activity', icon: 'icon-huodongxiaoguofenxi'},
            component: () => import('@/views/pages/data-marketing/activity')
        }, 
        {
              path: 'comparative',
              name: `${pre}-comparative`,
              meta: {...meta, title: '活动对比分析', path: 'comparative', icon: 'icon-shujugailan'},
              component: () => import('@/views/pages/data-marketing/comparative/index')
        },
        {
            path: 'ticket',
            name: `${pre}-ticket`,
            meta: {...meta, title: '券效果分析', path: 'ticket', icon: 'icon-quanxiaoguofenxi'},
            component: () => import('@/views/pages/data-marketing/ticket/index')
        },
            
        {
            path: 'sales-member',
            name: `${pre}-sales-member`,
            meta: {...meta, title: '会员经营分析', path: 'sales-member', icon: 'icon-huiyuanjingyingfenxi'},
            component: () => import('@/views/pages/data-marketing/sales-member/index')
        },
        {
          path: 'footfall',
          name: `${pre}-footfall`,
          meta: {...meta, title: '客流关联分析', path: 'footfall', icon: 'icon-shujugailan'},
          component: () => import('@/views/pages/data-marketing/footfall/index')
        },
        {
            path: 'settings',
            name: `${pre}-settings`,
            meta: {...meta, title: '系统设置', path: 'settings', icon: 'icon-xitongpeizhi'},
            component: () => import('@/views/pages/data-marketing/settings/index')
        }])('data-marketing')
    }
];

export default routes
