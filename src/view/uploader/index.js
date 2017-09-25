export default {
  name: 'ViewUploader',
  data() {
    return {
      link: '',
      loading: false
    }
  },
  computed: {
    headers () {
      return {
        token: this.$store.state.userinfo.token
      }
    },
    data () {
      return {
        id: this.$store.state.userinfo.id,
        financeId: this.$store.state.userinfo.id
      }
    }
  },
  methods: {
    handleSubmit() {
      if (!this.link) {
        this.$notify.error({
          title: '错误',
          message: '请粘贴电子发票链接'
        })
        return
      }
      this.loading = true
      this.$http.post('app/bill/uploadUrl', {
        billUrl: this.link,
        financeId: this.$store.state.userinfo.financeId
      }).then(({body}) => {
        if (body.res_code === 200) {
          this.$notify.success({
            title: '错误',
            message: '上传成功'
          })
          this.link = ''
          this.$router.push('/')
        } else {
          console.log(body)
          this.$notify.error({
            title: '上传失败',
            message: body.res_data || '上传失败!'
          })
        }
        this.loading = false
      }, e => {
        this.$notify.error({
          title: '上传失败',
          message: '服务器无响应'
        })
        this.loading = false
      })
    },
    onSuccess (res) {
      if (res.res_code != 200) {
        this.$notify.error({
          title: '上传失败',
          message: res.res_data || '上传失败!'
        })
      return 
      }
      this.$notify.success({
        title: '成功',
        message: '上传成功'
      })
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    },
    onError () {
      this.$notify.error({
        title: '上传失败',
        message: '服务器无响应'
      })
    }
  },
  created() { },
  mounted() { }
}
