export default [
  {
    name: "发票信息管理",
    path: "/allInvoices",
    icon: "el-icon-menu"
  },
  {
    name: "我的发票",
    path: "/",
    icon: "el-icon-star-on"
  },
  {
    name: "上传发票",
    icon: "el-icon-upload2",
    path: "/uploader",
    match: ["/guide"]
  },
  {
    name: "基本信息",
    icon: "el-icon-setting",
    path: "/settings"
  },
  {
    name: "修改密码",
    icon: "el-icon-edit",
    path: "/password"
  }
];
