var fs = require('fs')
var utils = require('./utils')
var copyComponent = require('./copyComponent.js')
var arguments = process.argv.splice(2)
var name = arguments[0]

var path = './src/' + name
if (!fs.existsSync(path)) {
  utils.mkdirsSync(path)
  copyComponent(name)
}