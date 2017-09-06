import { mapState } from 'vuex'

export default {
  name: 'ViewRegister-info',
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formValidate.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      formValidate: {
        idCode: '',
        name: '',
        financeUserId: '',
        email: '',
        password: '',
        passwordAgain: ''
      },
      ruleValidate: {
        idCode: [
          { required: true, message: '请输入企业ID', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入表示名称', trigger: 'blur' }
        ],
        financeUserId: [
          { required: true, message: '请输入财务主管', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '无效的Email', trigger: 'blur' }
        ],
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
  computed: mapState({
    financeUsers: 'financeUsers'
  }),
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
      var userinfo = this.$store.state.userinfo
      var attributes = Object.assign({}, this.formValidate, {
        smsCode: userinfo.smsCode,
        mobile: userinfo.mobile
      })
      this.$http.post('app/login/register', attributes).then(({body}) => {
        if (body.res_code === 200) {
          this.$Notice.success({
            title: '成功',
            desc: '注册成功！'
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 1500)
        } else {
          this.$Notice.error({
            title: '错误',
            desc: body.res_data ? body.res_data : '注册失败'
          })
        }
        this.loading = false
      }, (xhr) => {
        this.$Notice.error({
          title: '错误',
          desc: '注册失败'
        })
        this.loading = false
      });
    },
    getFinanceUsers() {
      this.$store.dispatch('fetchFinanceUsers', this.formValidate.idCode)
    }
  }
}
