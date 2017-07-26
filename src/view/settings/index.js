import { mapState } from 'vuex'
export default {
  name: 'ViewSettingsAccount',
  data() {
    return {
      loading: false,
      ruleValidate: {
        name: [
          { required: true, message: '请输入表示名称', trigger: 'blur' }
        ],
        financeId: [
          { required: true, message: '请输入主管财务', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入Email', trigger: 'blur' }
        ]
      },
      urls: {
        name: 'app/user/updateUserName',
        email: 'app/user/updateEmail',
        financeId: 'app/user/updateUserFinance'
      }
    }
  },
  computed: {
    ...mapState({
      financeUsers: 'financeUsers'
    }),
    formValidate: {
      get () {
        return this.$store.state.userinfo
      },
      set (value) {
        this.$store.commit('set', {
          userinfo: value
        })
      }
    }
  },
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
      var fields = Object.assign({
        id: this.$store.state.userinfo.id
      }, this.formValidate)
      for (var key in this.urls) {
        this.$http.post(this.urls[key], fields).then(({body}) => {
          if (body.res_code === 200) {
            this.$Message.success('修改成功')
            this.$store.commit('setUserinfo', {})
          } else {
            this.$Message.error(body.res_data ? body.res_data : '修改失败')
          }
          this.loading = false
        }, (xhr) => {
          this.$Message.error('修改失败!')
          this.loading = false
        })
      }
    }
  },
  created() {
    this.$store.dispatch('fetchFinanceUsers')
  }
}
