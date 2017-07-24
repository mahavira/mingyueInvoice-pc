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
      
    }
  },
  created () {},
  mounted () {}
}
