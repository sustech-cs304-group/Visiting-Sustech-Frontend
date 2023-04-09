// pages/book-req/book-req.js
import WxValidate from '../../utils/WxValidate'

Page({
  data: {
    // 好像这些暂时没啥用，用的还是wxml里面的表单
    // date: '2023-04-01',
    // name: 'Visiter Joe',
    // phone: '13600008888',
    // idcard: '111111333355779999',
    // numTogether: '0',
    // purpose: '其他',
    date: '',
    show: false,
    isloading: false
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    var mon = date.getMonth() + 1;
    mon = mon.toString();
    if (mon.length < 2) {
      mon = "0" + mon;
    }
    var day = date.getDate().toString();
    if (day.length < 2) {
      day = "0" + day;
    }
    return "2023-" + mon + "-" + day;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  // 有input变化的时候绑定的方法
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindNumPeopleChange: function (e) {
    console.log('随行人数改变为：', e.detail.value)
  },
  checkChange(e) {
    console.log(e.detail)
  },
  // 提交的方法、并且验证
  submitForm(e) {
    const params = e.detail.value
    console.log(params, 10)
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.validationErrors()
      console.log(error[0], 40)
      this.showModal(error[0])
      return false
    } else {
      var formBookReq = e.detail.value;
      wx.request({
        url: 'https://10.17.133.136:443/appointment/add',
        method: 'POST',
        header: {
          'Authorization': wx.getStorageSync('token'),
          'content-type': "application/json"
        },
        data: {
          appointmentDate: formBookReq.date,
          name: formBookReq.name,
          phone: formBookReq.phone,
          idcard: formBookReq.idCard,
          accompanyingNum: formBookReq.numPeople,
          purpose: formBookReq.purpose[0]
        },
        success: (res) => {
          console.log(res)
          console.log('预约申请已上传到后端', 20)
          this.showModal({ msg: '提交成功' })
          return true
        },
        fail: (res) => {
          console.log('抱歉，预约申请上传到后端失败', 40)
          this.showModal({ msg: '上传失败，请重试' })
          return false
        }
      })
    }
  },
  // 提交按钮的动画
  getsubload() {
    this.setData({
      isloading: true
    })
    setTimeout(() => {
      this.setData({
        isloading: false
      })
    }, 3000)
  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  // 初始化验证规则
  onLoad: function () {
    this.initValidate();
  },
  initValidate() {
    // 初始化验证表单的正确性的实例
    let rules = {
      date: {
        required: true,
      },
      name: {
        required: true,
        rangelength: [2, 4],
      },
      phone: {
        required: true,
        minlength: 11,
      },
      idCard: {
        required: true,
        idcard: true,
      },
      numPeople: {
        required: true,
        range: [0, 5],
      },
      purpose: {
        minArraySize: 1,
      },
    }
    let msgs = {
      date: {
        required: '请选择入校日期',
      },
      name: {
        required: '请输入名字',
        rangelength: '输入名字长度必须是2~4位',
      },
      phone: {
        required: '请输入电话号码',
        minlength: '输入电话号码的长度必须是11位',
      },
      idCard: {
        required: '请输入身份证号码',
        idcard: '请检查您输入的身份证号',
      },
      numPeople: {
        required: '请输入随行人员人数（单独请输入0）',
        range: '人数限制为0~5人',
      },
      purpose: {
        minArraySize: '请至少选择一个到访目的',
      },
    }
    this.WxValidate = new WxValidate(rules, msgs)
    this.WxValidate.addMethod('minArraySize', (value, param) => {
      // return this.WxValidate.optional(value) && (value.length >= param)
      return value.length >= param
    }, '最小Array长度')
  }
})




