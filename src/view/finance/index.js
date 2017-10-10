export default {
  name: 'ViewFinance',
  data() {
    return {
      loading: false,
      formValidate: {
        limitMoney: 0
      },
      ruleValidate: {
        limitMoney: [
          { required: true, message: '请输入单张发票最大金额', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.fetch()
        }
      })
    },
    fetch() {
      this.loading = true
      this.formValidate.id = this.$store.state.userinfo.id
      this.$http.post('app/bill/setLimitMoney', this.formValidate).then(({body}) => {
        if (body.res_code === 200) {
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          this.$store.commit('setUserinfo', {
            limitMoney: this.formValidate.limitMoney
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: body.res_data ? body.res_data : '修改失败'
          })
        }
        this.loading = false
      }, (xhr) => {
        this.$notify.error({
          title: '错误',
          message: '修改失败'
        })
        this.loading = false
      })
    },
    getLimitMoney () {
      this.$http.post('app/bill/getLimitMoney', {id: this.$store.state.userinfo.id}).then(({body}) => {
        if (body.res_code === 200) {
          this.formValidate.limitMoney = body.res_data
        } else {
          this.$notify.error({
            title: '错误',
            message: body.res_data ? body.res_data : '修改失败'
          })
        }
      }, (xhr) => {
        this.$notify.error({
          title: '错误',
          message: '修改失败'
        })
      })
    }
  },
  created () {
    this.formValidate.limitMoney = this.$store.state.userinfo.limitMoney
  }
}
