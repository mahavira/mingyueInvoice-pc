export default {
  name: 'ViewUploader',
  data() {
    return {
      link: ''
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
    }
  },
  created() { },
  mounted() { }
}
