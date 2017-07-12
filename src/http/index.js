import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import env from '../config/env'
const ajaxUrl = env === 'development' ? 'http://localhost:8080/project_dzff/' : env === 'production' ? 'http://120.92.45.7/project_dzff/' : 'https://debug.url.com'
Vue.http.options.root = ajaxUrl
// Vue.http.headers.common['Content-Type'] = 'application/json;charset=utf-8'
// Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'
Vue.http.options.emulateJSON = true
// Vue.http.options.emulateHTTP = true