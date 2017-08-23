import Vue from 'vue'
Vue.filter('slice', function (value, start, end) {
    if (!value) return ''
    return value.slice(start, end)
})
