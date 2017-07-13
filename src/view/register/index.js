export default {
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
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '手机号码格式错误', trigger: 'blur' },
          { validator: this.validateMobileExist, trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { len: 4, message: '验证码为4位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.validateSmsCode()
        }
      })
    },
    validateMobileExist(rule, value, callback) {
      this.$http.post('app/login/getUserByMobile', {
        mobile: this.formValidate.mobile
      }).then(req => {
        if (req.res_code === 200) {
          if (req.res_data == "0") callback()
          else if (req.res_data == "1") callback(new Error('该手机已经被注册'))
        } else {
          callback(new Error('请求错误！'))
        }
      }, e => {
        callback(new Error('请求错误！'))
      })
    },
    validateSmsCode() {
      this.loading = true
      this.$http.post('app/smsCode', this.formValidate).then((data) => {
        if (data.res_code === 200) {
          this.$store.commit('set', {
            userinfo: Object.assign({}, this.$store.state.userinfo, this.formValidate)
          })
          this.$router.push('/register-info')
        }
        else this.$Message.error('验证码不正确!')
        this.loading = false
      }, function (xhr, type, errorThrown) {
        this.$Message.error('验证码不正确!')
        this.loading = false
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