import Vue from 'vue'
export default {
  data() {
    return {
      loading: false,
      formValidate: {
        username: '',
        password: ''
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
      this.$http.post('app/login/login', this.formValidate).then(({body}) => {
        if (body.res_code === 200) {
          this.$store.commit('setUserinfo', body.res_data)
          this.$router.push('/invoices')
          this.$Notice.success({
            title: '成功',
            desc: '登录成功'
          })
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