export default [
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: require('@/view/login/index.vue')
  },
  {
    name: 'register',
    path: '/register',
    meta: {
      title: '注册'
    },
    component: require('@/view/register/index.vue')
  },
  {
    name: 'registerInfo',
    path: '/register-info',
    meta: {
      title: '注册信息'
    },
    component: require('@/view/register-info/index.vue')
  },
  {
    name: 'passwordForget',
    path: '/password-forget',
    meta: {
      title: '忘记密码'
    },
    component: require('@/view/password-forget/index.vue')
  },
  {
    name: 'main',
    path: '/',
    meta: {
      title: ''
    },
    component: require('@/view/index.vue'),
    children: [
      {
        name: 'invoices',
        path: '',
        meta: {
          title: '我的发票'
        },
        component: require('@/view/invoices/index.vue')
      },
      {
        name: 'uploader',
        path: '/uploader',
        meta: {
          title: '上传发票'
        },
        component: require('@/view/uploader/index.vue')
      },
      {
        name: 'allInvoices',
        path: '/allInvoices',
        meta: {
          title: '发票信息管理'
        },
        component: require('@/view/allInvoices/index.vue')
      },
      {
        name: 'settings',
        path: '/settings',
        meta: {
          title: '账号设置'
        },
        component: require('@/view/settings/index.vue')
      },
      {
        name: 'password',
        path: '/password',
        meta: {
          title: '修改密码'
        },
        component: require('@/view/password/index.vue')
      },
      {
        name: 'guide',
        path: '/guide',
        meta: {
          title: '电子发票上传方法'
        },
        component: require('@/view/guide/index.vue')
      },
      {
        name: 'contact',
        path: '/contact',
        meta: {
          title: '联系我们'
        },
        component: require('@/view/contact/index.vue')
      },
      {
        name: 'message',
        path: '/message',
        meta: {
          title: '我的消息'
        },
        component: require('@/view/message/index.vue')
      }
    ]
  }
]
