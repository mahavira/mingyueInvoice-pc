import {isArray} from 'lodash'
export default {
  name: 'ViewInvoices',
  data () {
    return {
      data: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      isPrinting: false
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
          this.total = body.res_data.count
        } else {
          this.$notify.error({
            title: '错误',
            message: '数据获取失败！'
          })
        }
      }, e => {
        this.$notify.error({
          title: '错误',
          message: '数据获取失败！'
        })
      })
    },
    onChange (pageNo) {
      this.pageNo = pageNo
      this.fetch()
    },
    fetchPdf(id) {
      this.$http.post('app/bill/printPdf?invoiceList=' + id, {}).then(({ body }) => {
        if (body.res_code === 200) {
          var pdfUrl = window.location.origin + body.res_data
          this.printPdf(pdfUrl)
          this.fetchSetPrint(id)
        } else {
          this.$notify.error({
            title: '错误',
            message: '发票地址获取失败！'
          })
          this.isPrinting = false
        }
      }, e => {
        this.$notify.error({
          title: '错误',
          message: '发票地址获取失败！'
        })
        this.isPrinting = false
      })
    },
    printPdf(url) {
      var iframe = this.$refs.iframe
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.isPrinting = false
          iframe.contentWindow.print()
        })
      } else {
        iframe.onload = () => {
          this.isPrinting = false
          iframe.contentWindow.print()
        }
        iframe.onerror = () => {
          console.log('iframe load error')
          this.isPrinting = false
        }
      }
      iframe.src = url
    },
    fetchSetPrint (id) {
      this.$http.post('app/bill/pdfReadyPrint', {invoiceId: id}).then(({ body }) => {
        if (body.res_code === 200) {
          this.data.forEach(item => {
            if (item.id === id) {
              item.fpHandleStatus = '3'
            }
          })
        } else {
        }
      }, e => {
      })
    }
  },
  created () {
    this.fetch()
  }
}
