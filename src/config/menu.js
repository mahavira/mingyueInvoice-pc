export default [{
  name: '发票信息管理',
  path: '/allInvoices',
  icon: 'ios-list-outline'
}, {
  name: '我的发票',
  path: '/invoices',
  icon: 'ios-albums-outline'
}, {
  name: '上传发票',
  icon: 'ios-upload-outline',
  path: '/uploader',
  match: ['guide']
}, {
  name: '账号设置',
  icon: 'ios-gear-outline',
  children: [{
    name: '我的信息',
    icon: 'ios-settings',
    path: '/settings',
  }, {
    name: '修改密码',
    icon: 'ios-locked-outline',
    path: '/password'
  }]
}]