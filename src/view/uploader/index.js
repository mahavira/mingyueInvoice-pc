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
        this.$Message.error('请粘贴电子发票链接!')
        return
      }
      this.loading = true
      this.$http.post('app/bill/uploadUrl', {
        billUrl: this.link,
        financeId: this.$store.state.userinfo.financeId
      }).then(req => {
        if (req.res_code === 200) {
          this.$Message.error('上传成功!')
          this.link = ''
        } else {
          this.$Message.error(req.res_data ? req.res_data : '上传失败!')
        }
        this.loading = false
      }, e => {
        this.$Message.error('上传失败!')
        this.loading = false
      })
    }
  },
  created() { },
  mounted() { }
}
