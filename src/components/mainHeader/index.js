import {mapState} from 'vuex'
export default {
  name: 'ComponentsMainHeader',
  data () {
    return {
      isNewMessage: false
    }
  },
  computed: {
    ...mapState(['userinfo'])
  },
  methods: {
    logout () {
      localStorage.setItem('userinfo', JSON.stringify({}))
      window.location.href = '#/login'
    },
    fetchNewMessage () {
      setTimeout(() => {
        this.$http.post('app/message/getCount', {}).then(({ body }) => {
          if (body.res_code === 200) {
            this.isNewMessage = body.res_data == 1
          }
          this.fetchNewMessage()
        }, e => {
          this.fetchNewMessage()
        })
      }, 3000)
    }
  },
  mounted () {
    this.fetchNewMessage()
  }
}
