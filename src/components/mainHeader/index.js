import {mapState} from 'vuex'
export default {
  name: 'ComponentsMainHeader',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userinfo'])
  },
  methods: {
    logout () {
      localStorage.setItem('userinfo', JSON.stringify({}))
      window.location.href = '#/login'
    }
  },
  created () {},
  mounted () {}
}
