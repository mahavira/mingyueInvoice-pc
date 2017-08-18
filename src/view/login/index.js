import Vue from 'vue'
export default {
  data() {
    return {
      loading: false,
      formValidate: {
        username: '',
        password: '',
        remember: false
      },
      ruleValidate: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码不足6位数', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.formValidate = {
      username: localStorage.getItem('remember:username') || '',
      password: localStorage.getItem('remember:password') || '',
      remember: localStorage.getItem('remember') ? true : false
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
      this.$http.post('app/login/login', this.formValidate).then(({body}) => {
        if (body.res_code === 200) {
          this.$store.commit('setUserinfo', body.res_data)
          this.$router.push('/invoices')
          // 记住密码
          if (this.formValidate.remember) {
            localStorage.setItem('remember:username', this.formValidate.username)
            localStorage.setItem('remember:password', this.formValidate.password)
            localStorage.setItem('remember', 1)
          } else {
            localStorage.removeItem('remember:username')
            localStorage.removeItem('remember:password')
            localStorage.removeItem('remember')
          }
        } else {
          this.$Notice.error({
            title: '错误',
            desc: body.res_data ? body.res_data : '登录失败!'
          })
        }
        this.loading = false
      }, e => {
        this.$Notice.error({
          title: '错误',
          desc: '登录失败!'
        })
        this.loading = false
      })
    }
  }
}