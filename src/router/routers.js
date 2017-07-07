export default [
{
  name: 'login',
  path: '/login',
  meta: {
    title: 'login'
  },
  component: require('@/view/login/index.vue'),
},
{
  name: 'main',
  path: '/',
  meta: {
    title: '首页'
  },
  component: require('@/view/index.vue'),
  children:[
{
  name: 'home',
  path: '/home',
  meta: {
    title: '首页'
  },
  component: require('@/view/home/index.vue'),
},
{
  name: 'publish',
  path: '/publish',
  meta: {
    title: '发表'
  },
  component: require('@/view/publish/index.vue'),
},
{
  name: 'settingsAccount',
  path: 'settings/account',
  meta: {
    title: '账号信息'
  },
  component: require('@/view/settings/account/index.vue'),
},
]

},
]
