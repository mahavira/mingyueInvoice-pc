let util = {}
import conf from '../config'
util.title = function (t) {
  t = t ? t + ' - ' + conf.title : conf.title
  window.document.title = t
}
export default util
