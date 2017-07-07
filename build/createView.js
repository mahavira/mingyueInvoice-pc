
var chokidar = require('chokidar')
var fs = require('fs')
var path = require("path")
var utils = require('./utils')
var fileWatch = './src/config/router-view.js'
var fileWrite = './src/router/routers.js'
var copyComponent = require('./copyComponent.js')
chokidar.watch(fileWatch).on('change', function () {
  var pwd = path.join(__dirname, '..', fileWatch)
  delete require.cache[pwd]
  var config = require('.' + fileWatch)
  var temp = eachItems(config)
  temp = 'export default ' + temp
  writeFile(fileWrite, temp)
})
function eachItems(data, path = '') {
  var temp = ''
  temp += '[\n'
  data.forEach(function (item, i) {
    var componentPath = parsePath(item.path)
    temp += '{\n'
    temp += '  name: \'' + item.name + '\',\n'
    temp += '  path: \'' + item.path + '\',\n'
    temp += '  meta: {\n'
    temp += '    title: \'' + item.title + '\'\n'
    temp += '  },\n'
    temp += '  component: require(\'' + componentPath + '\'),\n'
    if (item.children) {
      temp += '  children:' + eachItems(item.children) + '\n'
    }
    temp += '},\n'
  })
  temp += ']\n'
  return temp
}
function parsePath(path) {
  var pathArrTmp = path.split('/')
  var pathArr = []
  pathArrTmp.forEach(function (n, i) {
    if (n) pathArr.push(n)
  })
  var name = pathArr.join('/')
  path = name ? name + '/' : ''
  var viewPath = './src/view/' + path
  var componentPath = '@/view/' + path
  if (fs.existsSync(viewPath)) return componentPath + 'index.vue'
  utils.mkdirsSync(viewPath)
  copyComponent('view/' + name)
  return componentPath + 'index.vue'
}
function writeFile(file, data) {
  fs.writeFile(file, data, function (err) {
    if (err)
      console.log("fail " + err);
    else
      console.log("写入文件ok");
  });
}
