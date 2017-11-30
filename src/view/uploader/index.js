export default {
  name: 'ViewUploader',
  data() {
    return {
      link: '',
      loading: false,
      fileList: []
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
            title: '成功',
            message: '提交成功'
          })
          this.link = ''
        } else {
          this.$notify.error({
            title: '失败',
            message: body.res_data || '提交失败!'
          })
          this.link = ''
        }
        this.loading = false
      }, e => {
        this.$notify.error({
          title: '失败',
          message: '服务器无响应'
        })
        this.loading = false
      })
    },
    onSuccess (res, file, fileList) {
      this.$refs.upload.clearFiles()
      if (res.res_code != 200) {
        this.$notify.success({
          title: '成功',
          message:  '提交成功!'
        })
        return 
      }
      this.$notify.success({
        title: '成功',
        message: '提交成功'
      })
    },
    onError (error, file, fileList) {
      this.$notify.error({
        title: '提交失败',
        message: '服务器无响应'
      })
      this.$refs.upload.clearFiles()
    }
  },
  created() { },
  mounted() { }
}
