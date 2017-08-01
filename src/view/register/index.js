export default {
  data() {
    return {
      loading: false,
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
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          // this.validateSmsCode()
          this.$router.push('/register-info')
        }
      })
    },
    validateMobileExist(rule, value, callback) {
      this.$http.post('app/login/getUserByMobile', {
        mobile: this.formValidate.mobile
      }).then(({body}) => {
        if (body.res_code === 200) {
          if (body.res_data == "0") callback()
          else if (body.res_data == "1") callback(new Error('该手机已经被注册'))
        } else {
          callback(new Error('请求错误！'))
        }
      }, e => {
        callback(new Error('请求错误！'))
      })
    },
    validateSmsCode() {
      this.loading = true
      this.$http.post('app/xxxx', this.formValidate).then(({body}) => {
        if (body.res_code === 200) {
          this.$store.commit('set', {
            userinfo: Object.assign({}, this.$store.state.userinfo, this.formValidate)
          })
          this.$router.push('/register-info')
        }
        else {
          this.$Notice.error({
            title: '错误',
            desc: '验证码不正确！'
          })
        }
        this.loading = false
      }, function (xhr, type, errorThrown) {
        this.$Notice.error({
          title: '错误',
          desc: '验证码不正确！'
        })
        this.loading = false
      })
    },
    fetchSmsCode() {
      if (!this.formValidate.mobile) {
        this.$Notice.error({
          title: '错误',
          desc: '请输入手机号码'
        })
        return 
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.formValidate.mobile)) {
        this.$Notice.error({
          title: '错误',
          desc: '请输入手机号码'
        })
        return 
      }
      this.$http.post('app/sms/sendSmsCode', this.formValidate)
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