import { isArray, forEach } from 'lodash'

export default {
  name: 'ViewAllInvoices',
  data() {
    return {
      data: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      checkedIds: [],
      pdfUrl: '',
      contract: {},
      isPrinting: false
    }
  },
  computed: {
    checkedAll() {
      if (!this.data.length) return false
      var result = true
      forEach(this.data, item => {
        if (item.fpHandleStatus != '3') {
          if (this.checkedIds.indexOf(item.id) < 0) {
            result = false
            return
          }
        }
      })
      return result
      // return this.checkedIds.length >= this.data.length
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
      let invoices = []
      ids.forEach(n => {
        invoices.push('invoiceList=' + n)
      })
      var invoiceList = invoices.join('&')
      this.$http.post('app/bill/printPdf?' + invoiceList, {}).then(({ body }) => {
        if (body.res_code === 200) {
          this.pdfUrl = window.location.origin + body.res_data
          // window.open(window.location.origin + body.res_data)
          this.printPdf()
            // this.isPrinting = false
          this.setPrint(ids)
        } else {
          this.$Notice.error({
            title: '错误',
            desc: '发票地址获取失败！'
          })
          this.isPrinting = false
        }
      }, e => {
        this.$Notice.error({
          title: '错误',
          desc: '发票地址获取失败！'
        })
        this.isPrinting = false
      })
    },
    printPdf() {
      var iframe = this.$refs.iframe
      var url = this.pdfUrl
      console.log(iframe)
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.isPrinting = false
          // iframe.focus()
          iframe.contentWindow.print()
        })
      } else {
        iframe.onload = () => {
          console.log('iframe load', iframe.contentWindow)
          this.isPrinting = false
          // iframe.focus()
          iframe.contentWindow.print()
        }
        iframe.onerror = () => {
          console.log('iframe load error')
          this.isPrinting = false
        }
      }
      iframe.src = url
    },
    /**
     * 设置为已打印
     */
    setPrint (ids) {
      if (isArray(ids)) {
        ids.forEach(n => {
          this.fetchSetPrint(n)
        })
        return false
      }
      this.fetchSetPrint(ids)
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
      if (this.checkedAll) {
        this.checkedIds = []
      } else {
        this.data.forEach(item => {
          if (this.checkedIds.indexOf(item.id) < 0 && item.fpHandleStatus != '3') {
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
