// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
import app from './app'
import router from './router'
import store from './store'
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import './assets/style.less'
// import './assets/iview-theme.less'
// Vue.use(iView)
Vue.config.productionTip = false
import './http'
import './directive'
import './filtres'
import conf from './config'
Vue.prototype.$conf = conf

// fundebug
function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'
  var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options.__file ? ' at ' + vm.$options.__file : '')
}

Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options.propsData
  fundebug.notifyError(err,
  {
      metaData:
      {
          componentName: componentName,
          propsData: propsData,
          info: info
      }
   })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<app/>',
  components: { app }
})
