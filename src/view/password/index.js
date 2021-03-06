export default {
  name: 'ViewPassword',
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.formValidate.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      formValidate: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      ruleValidate: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码不足6位数', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
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
          this.$notify.success({
            title: '成功',
            message: '修改成功!'
          })
          this.oldPassword = ''
          this.newPassword = ''
          this.confirmPassword = ''
        } else {
          this.$notify.error({
            title: '错误',
            message: body.res_data ? body.res_data : '修改失败!'
          })
        }
        this.loading = false
      }, e => {
        this.$notify.error({
          title: '错误',
          message: '修改失败!'
        })
        this.loading = false
      })
    }
  },
  created() { },
  mounted() { }
}
