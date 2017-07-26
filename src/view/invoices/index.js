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
        pageNo: this.pageNo
      }).then(({body}) => {
        if (body.res_code === 200) {
          if (body.res_data.list && isArray(body.res_data.list)) {
            this.data = body.res_data.list
          }
        } else {
          this.$Message.error('数据获取失败!')
        }
      }, e => {
        this.$Message.error('数据获取失败!')
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
