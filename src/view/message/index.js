import {isArray} from 'lodash'
export default {
  name: 'ViewMessage',
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
      this.$http.post('app/message/getMyMessages', {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }).then(({body}) => {
        if (body.res_code === 200) {
          if (body.res_data.list && isArray(body.res_data.list)) {
            this.data = body.res_data.list
            this.total = body.res_data.count
          }
          this.setMessageRead()
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
    readMessage (item) {
      item.isRead = true
      this.$http.post('app/message/readMyMessage', {
        id: item.id
      }).then(({body}) => {
        if (body.res_code === 200) {
        } else {
        }
      }, e => {
      })
    },
    onChange (pageNo) {
      this.pageNo = pageNo
      this.fetch()
    },
    /**
	 * 设置消息为已读
	 */
	  setMessageRead () {
      this.$http.post('app/message/changeAll', {}, function(req) {
      }, function(xhr, type, errorThrown) {
      })
	  }
  },
  created () {
    this.fetch()
  }
}
