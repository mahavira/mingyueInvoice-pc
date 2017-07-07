export default [{
  name: '首页',
  path: '/home',
  icon: 'ios-home-outline'
}, {
  name: '发表',
  path: '/publish',
  icon: 'edit'
}, {
  name: '管理',
  icon: 'ios-paper-outline',
  children: [{
    name: '内容管理',
    path: '/manage/content'
  }, {
    name: '工作室管理',
    path: '/manage/studio',
    match: ['manageStudioId'] // 如匹配路由name也可激活<Menu:activeName>
  }, {
    name: '广告管理',
    path: '/manage/ad'
  }]
}, {
  name: '设置',
  icon: 'ios-gear-outline',
  children: [{
    name: '账号信息',
    path: '/settings/account'
  }]
}]