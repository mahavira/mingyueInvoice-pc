import {isArray} from 'lodash'
export default {
  name: 'ViewInvoices',
  data () {
    return {
      data: [],
      total: 0,
      pageSize: 10,
      pageNo: 1
    }
  },
  methods: {
    fetch(attributes) {
      this.$http.post('app/bill/getMyBills', {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }).then(({body}) => {
        if (body.res_code === 200) {
          if (body.res_data.list && isArray(body.res_data.list)) {
            this.data = body.res_data.list
          } else {
            this.data = []
          }
          this.total = body.res_data.total
        } else {
          this.$Notice.error({
            title: '错误',
            desc: '数据获取失败！'
          })
        }
      }, e => {
        this.$Notice.error({
          title: '错误',
          desc: '数据获取失败！'
        })
      })
    },
    onChange (pageNo) {
      this.pageNo = pageNo
      this.fetch()
    }
  },
  created () {
    this.fetch()
  }
}
