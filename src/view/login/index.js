import Vue from 'vue'
export default {
  data() {
    return {
      loading: false,
      formValidate: {
        username: '18611852267',
        password: '123456'
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
  mounted() {
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
      this.$http.post('app/login/login', this.formValidate).then(req => {
        if (req.res_code === 200) {
          this.$store.commit('set', {
            userinfo: req.res_data
          })
          this.$router.push('/invoices')
          Vue.http.headers.common['token'] = req.res_data.token
          Vue.http.body.common['token'] = '21212121212'
          this.$Message.success('登录成功!')
        } else {
          this.$Message.error(req.res_data ? req.res_data : '登录失败!')
        }
        this.loading = false
      }, e => {
        this.$Message.error('登录失败!')
        this.loading = false
      })
    }
  }
}