import { isArray } from 'lodash'
function printPdf (iframe, url) {
  if (iframe.attachEvent) {
    iframe.attachEvent('onload', function () {
      iframe.focus()
      iframe.contentWindow.print()
    })
  } else {
    iframe.onload = function () {
      iframe.focus()
      iframe.contentWindow.print()
    }
  }
  iframe.src = url
}

export default {
  name: 'ViewAllInvoices',
  data() {
    return {
      data: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      checkedIds: [],
      pdfUrl: '/static/monitoring.pdf',
      contract: {},
      isPrinting: false
    }
  },
  computed: {
    checkedAll() {
      if (!this.data.length) return false
      return this.checkedIds.length >= this.data.length
    }
  },
  methods: {
    batchPrint() {
      if (!this.checkedIds.length) {
        this.$Notice.error({
          title: '错误',
          desc: '请选择你要打印的发票'
        })
        return
      }
      this.fetchPdf(this.checkedIds)
    },
    singlePrint(item) {
      this.fetchPdf([item.id])
    },
    fetchPdf(ids) {
      this.isPrinting = true
      this.$http.post('app/bill/printPdf', {
        id: ids.join()
      }).then(({ body }) => {
        if (body.res_code === 200) {
          this.pdfUrl = body.res_data
          this.printPdf()
          this.isPrinting = false
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
    printPdf() {
      printPdf(this.$refs.printIframe, this.pdfUrl)
      // this.$refs.printIframe.contentWindow.print()
    },
    fetch(attributes) {
      this.$http.post('app/bill/getBillsMsg', {
        pageNo: this.pageNo
      }).then(({ body }) => {
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
    onChange(pageNo) {
      this.pageNo = pageNo
      this.fetch()
    },
    handleCheckAll() {
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
    }
  },
  created() {
    this.fetch()
  },
  mounted() { }
}
