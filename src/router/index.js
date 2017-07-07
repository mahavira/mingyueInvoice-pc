import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import util from '../utils'
import routers from './routers'
import store from '../store'
Vue.use(Router)
const RouterConfig = {
  mode: 'history',
  routes: routers
}
const router = new Router(RouterConfig)
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  util.title(to.meta.title)
  next()
})
router.afterEach(() => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
  var currentRoutePath = router.currentRoute.path
  store.commit('breadcrumb', currentRoutePath)
  store.commit('menu', router.currentRoute)
})

export default router
