var loadDir = require('./load_dir')
var mocks = loadDir('../src/http/mock')
for (var k in mocks) {
  (function(mock){
    if (!mock.path) return
    app[mock.type](mock.path, function (req, res) {
      res.json(mock.export(req, res))
    })
  }(mocks[k]))
}
