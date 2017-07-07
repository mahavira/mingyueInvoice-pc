let util = {}
let title = '明阅电子发票'
util.title = function (t) {
  t = t ? t + ' - ' + title : title
  window.document.title = t
}
export default util
