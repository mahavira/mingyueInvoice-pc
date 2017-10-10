import { isArray } from 'lodash'
import invoice from '@/mixins/invoice'
export default {
  name: 'ViewAllInvoices',
  mixins: [invoice],
  data() {
    return {
      contract: {},
      formValidate: {
        beginMoney: '',
        endMoney: '',
        beginDate: '',
        endDate: '',
        createName: ''
      }
    }
  },
  methods: {
    fetch() {
      this.isLoading = true
      this.$http.post('app/bill/getBillsMsg', Object.assign({
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }, this.formValidate, {
        beginDate: this.formValidate.beginDate ? this.formatDate(this.formValidate.beginDate) : '',
        endDate: this.formValidate.endDate ? this.formatDate(this.formValidate.endDate) : ''
      })).then(({ body }) => {
        if (body.res_code === 200) {
          if (body.res_data.list && isArray(body.res_data.list)) {
            this.data = body.res_data.list
          } else {
            this.data = []
          }
          this.total = body.res_data.count
          if (body.res_data1) {
            this.contract = body.res_data1
            this.contract.use = body.res_data2
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: body.res_data || '数据获取失败！'
          })
        }
        this.isLoading = false
      }, e => {
        this.$notify.error({
          title: '错误',
          message: '数据获取失败！'
        })
        this.isLoading = false
      })
    }
  },
  created() {
    this.fetch()
  }
}
