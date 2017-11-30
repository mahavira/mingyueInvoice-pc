import Vue from 'vue'
import Vuex from 'vuex'
import menu from '../config/menu'
var userinfo = localStorage.getItem('userinfo')
userinfo = JSON.parse(userinfo)
if (!userinfo || typeof userinfo != 'object') {
  userinfo = {}
}
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    menu: menu,
    menuActiveName: '',
    breadcrumb: [],
    userinfo: userinfo,
    financeUsers: []
  },
  getters: {
  },
  mutations: {
    breadcrumb(state, path) {
      var result = []
      recursiveBreadcrumb('path', path, state.menu, 0, result)
      state.breadcrumb = result
    },
    menu(state, route) {
      let activeName = ''
      state.menu.forEach((n, i) => {
        if (n.path === route.path || (n.match && n.match.indexOf(route.name) >= 0)) {
          activeName = route.path
        }
      })
      state.menuActiveName = activeName
    },
    set(state, data) {
      Object.assign(state, data)
    },
    setUserinfo(state, value) {
      Object.assign(state.userinfo, value)
      localStorage.setItem('userinfo', JSON.stringify(state.userinfo))
    }
  },
  actions: {
    fetchFinanceUsers({ commit, state }, idCode) {
      idCode = idCode || state.userinfo.office.idCode
      Vue.http.post('app/login/getFinanceUsers', { idCode: idCode }).then(({body})=> {
        if (body.res_code === 200) {
          commit('set', {
            financeUsers: body.res_data
          })
        }
      }, e => {
      })
    }
  }
})
function recursiveBreadcrumb(key, val, data, index, result) {
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
