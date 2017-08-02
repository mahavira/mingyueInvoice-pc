export default {
  name: 'ViewUploader',
  data() {
    return {
      link: ''
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
        this.$Notice.error({
          title: '错误',
          desc: '请粘贴电子发票链接'
        })
        return
      }
      this.loading = true
      this.$http.post('app/bill/uploadUrl', {
        billUrl: this.link,
        financeId: this.$store.state.userinfo.financeId
      }).then(({body}) => {
        if (body.res_code === 200) {
          this.$Notice.success({
            title: '错误',
            desc: '上传成功'
          })
          this.link = ''
          this.$router.push('/invoices')
        } else {
          this.$Notice.error({
            title: '错误',
            desc: body.res_data ? body.res_data : '上传失败!'
          })
        }
        this.loading = false
      }, e => {
        this.$Notice.error({
          title: '错误',
          desc: '上传失败'
        })
        this.loading = false
      })
    },
    onSuccess (res) {
      if (res.res_code != 200) {
        this.$Notice.error({
          title: '错误',
          desc: '上传失败'
        })
      return 
      }
      this.$Notice.success({
        title: '成功',
        desc: '上传成功'
      })
      setTimeout(() => {
        this.$router.push('/invoices')
      }, 1000)
    },
    onError () {
      this.$Notice.error({
        title: '错误',
        desc: '上传失败'
      })
    }
  },
  created() { },
  mounted() { }
}
