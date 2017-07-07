/**
 * 当该文件修改后将重新执行/build/entry.js文件
 */

module.exports = [{
  name: 'login',
  path: '/login',
  title: 'login'
}, {
  name: 'main',
  path: '/',
  title: '首页',
  children: [{
    name: 'home',
    path: '/home',
    title: '首页'
  }, {
    name: 'publish',
    path: '/publish',
    title: '发表'
  }, {
    name: 'settingsAccount',
    path: 'settings/account',
    title: '账号信息'
  }]
}]

