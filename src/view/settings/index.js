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
          { required: true, message: '请输入财务主管', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入Email', trigger: 'blur' }
        ]
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
    // fetch() {
    //   this.loading = true
    //   for (var key in this.urls) {
    //     var fields = {id: this.$store.state.userinfo.id}
    //     fields[key] = this.formValidate[key]
    //     this.$http.post(this.urls[key], fields).then(({body}) => {
    //       if (body.res_code === 200) {
    //         this.$notify.success({
    //           title: '成功',
    //           message: '修改成功'
    //         })
    //         this.$store.commit('setUserinfo', {})
    //       } else {
    //         this.$notify.error({
    //           title: '错误',
    //           message: body.res_data ? body.res_data : '修改失败'
    //         })
    //       }
    //       this.loading = false
    //     }, (xhr) => {
    //       this.$notify.error({
    //         title: '错误',
    //         message: '修改失败'
    //       })
    //       this.loading = false
    //     })
    //   }
    // },
    fetch() {
      this.loading = true
      var fields = {}
      for (var key in this.ruleValidate) {
        fields[key] = this.formValidate[key]
      }
      this.$http.post('app/user/updateUser', fields).then(({body}) => {
        if (body.res_code === 200) {
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          this.$store.commit('setUserinfo', {})
        } else {
          this.$notify.error({
            title: '错误',
            message: body.res_data ? body.res_data : '修改失败'
          })
        }
        this.loading = false
      }, (xhr) => {
        this.$notify.error({
          title: '错误',
          message: '修改失败'
        })
        this.loading = false
      })
    }
  },
  created() {
    this.$store.dispatch('fetchFinanceUsers')
  }
}
