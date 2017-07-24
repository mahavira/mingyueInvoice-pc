import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import env from '../config/env'
import store from '../store'
import whitelist from './whitelist'
const ajaxUrl = env === 'development' ? 'http://localhost:3000/project_dzff/' : env === 'production' ? 'http://120.92.45.7/project_dzff/' : 'https://debug.url.com'
Vue.http.options.root = ajaxUrl
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push(function (request, next) {
  if (whitelist.indexOf(request.url) < 0) {
    if (!store.state.userinfo.token) {
      window.location.href = '/login'
    }
    if (store.state.userinfo.id) {
      if (!request.body.id) request.body.id = store.state.userinfo.id
    }
    request.headers.set('token', store.state.userinfo.token || '')
    next(({ body }) => {
      if (body && body.res_code && (body.res_code >= 900 && body.res_code < 1000)) {
        window.location.href = '/login'
      }
    })
  } else {
    next()
  }
})
// Vue.http.interceptor.before = function (request, next) {
//   if (!store.state.userinfo.id) {
//     Object.assign(request.body, { id: store.state.userinfo.id }, request.body)
//   }
//   next();
// };