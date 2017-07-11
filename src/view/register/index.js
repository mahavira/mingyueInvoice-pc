export default {
  name: 'ViewRegister',
  data () {
    return {
      formItem: {}
    }
  },
  methods: {
    submit () {
      this.$router.push({ path: '/register-info' })
    }
  },
  created () {},
  mounted () {}
}
