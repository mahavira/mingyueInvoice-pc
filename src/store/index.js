import Vue from 'vue'
import Vuex from 'vuex'
import menu from '../config/menu'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    menu: menu,
    menuActiveName: '',
    menuOpenNames: [],
    breadcrumb: []
  },
  getters: {
  },
  mutations: {
    breadcrumb (state, path) {
      var result = []
      recursiveBreadcrumb('path', path, state.menu, 0, result)
      state.breadcrumb = result
    },
    menu (state, route) {
      let activeName = ''
      let openNames = []
      state.menu.forEach((n, i) => {
        if (n.path === route.path || (n.match && n.match.indexOf(route.name))) {
          activeName = i + ''
        } else if (n.children) {
          n.children.forEach((m, j) => {
            if (m.path === route.path || (m.match && m.match.indexOf(route.name) >= 0)) {
              activeName = i + '-' + j
              openNames.push(i + '')
            }
          })
        }
      })
      state.menuActiveName = activeName
      state.menuOpenNames = [...openNames]
    },
    set (state, data) {
      Object.assign(state, data)
    }
  },
  actions: {
  }
})
function recursiveBreadcrumb (key, val, data, index, result) {
  for (var i = 0, l = data.length; i < l; i++) {
    var e = data[i]
    if (e[key] && val === e[key]) {
      result[index] = e
      return true
    } else if (e.children) {
      var re = recursiveBreadcrumb(key, val, e.children, index + 1, result)
      if (re) {
        result[index] = e
        return true
      }
    }
  }
  return false
}

export default store
