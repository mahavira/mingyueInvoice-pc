export default {
  name: 'ViewPassword-forget',
  data() {
    return {
      loading: false,
      countdownTime: 120,
      countdownStart: false,
      formValidate: {
        mobile: '18611852267',
        smsCode: 'xxxx'
      },
      ruleValidate: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '手机号码格式错误', trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { len: 4, message: '验证码为4位数字', trigger: 'blur' },
          { validator: this.validateSmsCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.fetchRegister()
        }
      })
    },
    fetchRegister(attributes) {
      this.loading = true
      this.$http.post('app/login/getUserByMobile', this.formValidate).then(req => {
        if (req.res_code === 200 && req.res_data == "1") {
          this.$Message.success('该手机已经被注册!')
          this.$router.push('/invoices')
        }
        this.loading = false
      }, e => {
        this.$Message.error('登录失败!')
        this.loading = false
      })
    },
    validateSmsCode(rule, value, callback) {
      this.$http.post('app/smsCode', this.formValidate).then((data) => {
        if (data.res_code === 200) callback()
        else callback(new Error('验证码错误'))
      }, function (xhr, type, errorThrown) {
        callback(new Error('验证码错误'))
      })
    },
    fetchSmsCode() {
      this.$http.post('app/fetchSmsCode', this.formValidate)
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
    }
  }
}
