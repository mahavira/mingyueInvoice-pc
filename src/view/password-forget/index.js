export default {
  name: 'ViewPassword-forget',
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formValidatePassword.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      step: 1,
      countdownTime: 120,
      countdownStart: false,
      formValidate: {
        mobile: '',
        smsCode: ''
      },
      ruleValidate: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '手机号码格式错误', trigger: 'blur' },
          { validator: this.validateMobileExist, trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { len: 4, message: '验证码为4位数字', trigger: 'blur' }
        ]
      },
      formValidatePassword: {
        password: '',
        passwordAgain: ''
      },
      ruleValidatePassword: {
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          ,
          {
            type: 'string',
            min: 6,
            message: '密码至少6位',
            trigger: 'blur'
          }
        ],
        passwordAgain: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (name === 'formValidate') this.validateSmsCode()
          else this.changePassword()
        }
      })
    },
    validateMobileExist(rule, value, callback) {
      this.$http.post('app/login/getUserByMobile', {
        mobile: this.formValidate.mobile
      }).then(({body}) => {
        if (body.res_code === 200) {
          if (body.res_data == "1") callback()
          else callback(new Error('该手机未注册'))
        } else {
          callback(new Error('请求错误！'))
        }
      }, e => {
        callback(new Error('请求错误！'))
      })
    },
    validateSmsCode() {
      this.loading = true
      this.$http.post('app/login/forgetPassword', this.formValidate).then(({body}) => {
        if (body.res_code === 200) {
          this.step = 2
        } else {
          this.$notify.error({
            title: '错误',
            message: '验证码错误'
          })
        }
        this.loading = false
      }, function (xhr, type, errorThrown) {
        this.$notify.error({
          title: '错误',
          message: '验证码错误'
        })
        this.loading = false
      })
    },
    fetchSmsCode() {
      if (!this.formValidate.mobile) {
        this.$notify.error({
          title: '错误',
          message: '请输入手机号码'
        })
        return 
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.formValidate.mobile)) {
        this.$notify.error({
          title: '错误',
          message: '请输入手机号码'
        })
        return 
      }
      this.$http.post('app/sms/sendSmsCode', {...this.formValidate, type: 1})
      this.countdownStart = true
      this.countdown()
    },
    countdown() {
      this.countdownTime--
      if (this.countdownTime >= 0) {
        setTimeout(this.countdown, 1000)
      } else {
        this.countdownStart = false
        this.countdownTime = 120
      }
    },

    changePassword() {
      this.loading = true
      this.$http.post('app/login/createPassword', {...this.formValidate, password: this.formValidatePassword.password}).then(({body}) => {
        if (body.res_code === 200) {
          this.$notify.success({
            title: '成功',
            message: '密码修改成功'
          })
          setTimeout(() => {
            this.loading = false
            this.$router.push('/login')
          }, 1500)
        } else {
          this.$notify.error({
            title: '错误',
            message: '修改密码失败'
          })
          this.loading = false
        }
      }, function (xhr, type, errorThrown) {
        this.$notify.error({
          title: '错误',
          message: '修改密码失败'
        })
        this.loading = false
      })
    }
  }
}
