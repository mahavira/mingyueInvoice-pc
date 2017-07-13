export default {
  name: 'ViewInvoices',
  data () {
    return {
      data: [],
      total: 22,
      pageSize: 10,
      pageNo: 1
    }
  },
  methods: {
    fetch(attributes) {
      this.$http.post('app/bill/getMyBills', {
        pageNo: this.pageNo
      }).then(req => {
        if (req.res_code === 200) {
          this.data = req.res_data
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
