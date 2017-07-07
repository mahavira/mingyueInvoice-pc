var fs = require('fs')
var Handlebars = require('handlebars')

function copyViewHtml(path) {
  fs.readFile("./build/template/component/index.html", 'utf-8', function (err, source) {
    var template = Handlebars.compile(source)
    var result = template({ name: path })
    fs.writeFile('./src/' + path + '/index.html', result)
  })
}
function copyViewJs(path) {
  fs.readFile("./build/template/component/index.js", 'utf-8', function (err, source) {
    var template = Handlebars.compile(source)
    var result = template({
      name: path.split('/').map(e => {
        if (!e) return ''
        else return e[0].toUpperCase() + e.substring(1, e.length)
      }).join('')
    })
    fs.writeFile('./src/' + path + '/index.js', result)
  })
}
function copyViewCss(path) {
  fs.writeFile('./src/' + path + '/index.css', fs.readFileSync("./build/template/component/index.css"))
}
function copyViewVue(path) {
  fs.writeFile('./src/' + path + '/index.vue', fs.readFileSync("./build/template/component/index.vue"))
}

function copyTo(path) {
  copyViewHtml(path)
  copyViewJs(path)
  copyViewCss(path)
  copyViewVue(path)
}
module.exports = copyTo