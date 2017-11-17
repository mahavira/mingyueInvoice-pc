import {isArray, forEach} from 'lodash'
import invoice from '@/mixins/invoice'
export default {
  name: 'ViewInvoices',
  mixins: [invoice],
  data () {
    return {
      limitMoney: '',
      formValidate: {
        beginMoney: '',
        endMoney: '',
        beginDate: '',
        endDate: ''
      }
    }
  },
  methods: {
    fetch(attributes) {
      this.isLoading = true
      this.$http.post('app/bill/getMyBills', Object.assign({
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }, this.formValidate, {
        beginDate: this.formValidate.beginDate ? this.formatDate(this.formValidate.beginDate) : '',
        endDate: this.formValidate.endDate ? this.formatDate(this.formValidate.endDate) : ''
      })).then(({body}) => {
        if (body.res_code === 200) {
          if (body.res_data.list && isArray(body.res_data.list)) {
            this.data = body.res_data.list
            this.limitMoney = body.res_data1
          } else {
            this.data = []
          }
          this.total = body.res_data.count
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
    },
    singlePrintBefore (item) {
      if (this.isExceedMaxMoney(item.sumWithTax)) {
        this.$notify.error({
          title: '不可打印',
          message: '此发票金额超过单张发票最大金额'
        })
        return
      }
      this.singlePrint(item)
    },
    isExceedMaxMoney (money) {
      var limitMoney = parseFloat(this.limitMoney)
      return parseFloat(money) > limitMoney
    },
    handleCheckAll() {
      if (this.checkedAll) {
        this.checkedIds = []
      } else {
        forEach(this.data, item => {
          if (this.checkedIds.indexOf(item.id) <= 0 && item.fpHandleStatus != '3' && !this.isExceedMaxMoney(item.sumWithTax)) {
              this.checkedIds.push(item.id)  
          }
        })
      }
    }
  },
  created () {
    this.fetch()
  }
}
