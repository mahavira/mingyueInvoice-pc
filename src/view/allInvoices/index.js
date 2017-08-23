import {isArray} from 'lodash'
export default {
  name: 'ViewAllInvoices',
  data () {
    return {
      data: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      checkedIds: [],
      pdfUrl: '/static/monitoring.pdf',
      contract: {}
    }
  },
  computed: {
    checkedAll () {
      if (!this.data.length) return false
      return this.checkedIds.length >= this.data.length
    }
  },
  methods: {
    batchPrint () {
      this.onPrint()
    },
    singlePrint (item) {
      this.onPrint()
    },
    handleDelete (item) {},
    fetch(attributes) {
      this.$http.post('app/bill/getBillsMsg', {
        pageNo: this.pageNo
      }).then(({body}) => {
        if (body.res_code === 200) {
          if (body.res_data.list && isArray(body.res_data.list)) {
            this.data = body.res_data.list
          }
          if (body.res_data1) {
            this.contract = body.res_data1
            this.contract.use = body.res_data2
          }
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
    },
    handleCheckAll () {
      if (this.data.length <= this.checkedIds.length) {
        this.checkedIds = []
      } else {
        this.data.forEach(item => {
          if (this.checkedIds.indexOf(item.id) < 0) {
            this.checkedIds.push(item.id)
          }
        })
      }
    },
    handleCheck(id) {
      var i = this.checkedIds.indexOf(id)
      if (i >= 0) {
        this.checkedIds.splice(i, 1)
      } else {
        this.checkedIds.push(id)
      }
    },
    onPrint () {
      this.$refs.printIframe.contentWindow.print()
    }
  },
  created () {
    this.fetch()
  },
  mounted () {}
}
