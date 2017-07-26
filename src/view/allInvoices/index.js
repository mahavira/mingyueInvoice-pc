import {isArray} from 'lodash'
export default {
  name: 'ViewAllInvoices',
  data () {
    return {
      data: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      checkedIds: []
    }
  },
  computed: {
    checkedAll () {
      if (!this.data.length) return false
      return this.checkedIds.length >= this.data.length
    }
  },
  methods: {
    batchPrint () {},
    singlePrint (item) {},
    handleDelete (item) {},
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
    },
    handleCheckAll () {
      if (!this.checkedAll) {
        this.data.forEach((item, i) => {
          if (this.checkedIds.indexOf(item.id)) {
            checkedIds.push(item.id)
          }
        })
      } else {
        this.checkedIds = []
      }
    }
  },
  created () {},
  mounted () {}
}
