export default {
  name: 'ViewPassword',
  data() {
    return {
      loading: false,
      formValidate: {
        oldPassword: '',
        newPassword: ''
      },
      ruleValidate: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码不足6位数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.fetchLogin()
        }
      })
    },
    fetchLogin(attributes) {
      this.loading = true
      this.$http.post('app/user/updateUserPassword', this.formValidate).then(({body}) => {
        if (body.res_code === 200) {
          this.$Notice.success({
            title: '成功',
            desc: '修改成功!'
          })
        } else {
          this.$Notice.error({
            title: '错误',
            desc: body.res_data ? body.res_data : '修改失败!'
          })
        }
        this.loading = false
      }, e => {
        this.$Notice.error({
          title: '错误',
          desc: '修改失败!'
        })
        this.loading = false
      })
    }
  },
  created() { },
  mounted() { }
}
