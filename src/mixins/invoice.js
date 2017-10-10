import { isArray } from 'lodash'
window.onfocus = function () {
  console.log('onfocus')
}
window.onblur = function () {
  console.log('onblur')
}

var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

export default {
  data() {
    return {
      data: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      checkedIds: [],
      pdfUrl: '',
      isPrinting: false,
      isLoading: false,
      dialogVisible: false,
      dialogPrintUrl: ''
    }
  },
  computed: {
    checkedAll() {
      if (!this.data.length) return false
      return this.checkedIds.length >= this.data.length
    }
  },
  methods: {
      /**
     * 多张打印
     */
    batchPrint() {
      if (!this.checkedIds.length) {
        this.$notify.error({
          title: '错误',
          message: '请选择你要打印的发票'
        })
        return
      }
      this.fetchPdf(this.checkedIds)
    },
    /**
     * 单张打印
     * @param {*} item 
     */
    singlePrint(item) {
      this.fetchPdf([item.id])
    },
    againSinglePrint (item) {
      this.$confirm('该发票已经打印过了，是否再次打印?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fetchPdf([item.id])
      })
    },
    /**
     * 请求发票地址
     * @param {*} ids 
     */
    fetchPdf(ids) {
      this.isPrinting = true
      let invoices = []
      ids.forEach(n => {
        invoices.push('invoiceList=' + n)
      })
      var invoiceList = invoices.join('&')
      this.$http.post('app/bill/printPdf?' + invoiceList, {}).then(({ body }) => {
        if (body.res_code === 200) {
          if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
          }
          this.pdfUrl = window.location.origin + body.res_data
          if (Sys.chrome || Sys.safari) {
            this.printPdf()
          } else {
            this.isPrinting = false
            this.dialogPrint()
          }
          this.setPrint(ids)
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
    printPdf(url = '') {
      var iframe = this.$refs.iframe
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          setTimeout(() => {
            this.isPrinting = false
            iframe.focus()
            iframe.contentWindow.print()
          }, 3000)
        })
      } else {
        iframe.onload = () => {
          setTimeout(() => {
            this.isPrinting = false
            iframe.focus()
            iframe.contentWindow.print()
          }, 3000)
        }
        iframe.onerror = () => {
          console.log('iframe load error')
          this.isPrinting = false
        }
      }
      iframe.src = url || this.pdfUrl
    },
    dialogPrint (url = '') {
      this.dialogPrintUrl = '/da/static/pdfjs/web/viewer.html?url=' + (url || this.pdfUrl)
      this.dialogVisible = true
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
    onChange(pageNo) {
      this.pageNo = pageNo
      this.fetch()
    },
    handleCheckAll() {
      if (this.checkedAll) {
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
    handleSearch () {
      this.pageNo = 1
      this.fetch()
    },
    formatDate (date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d
    }
  }
}