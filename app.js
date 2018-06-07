//app.js
App({
  data: {
    u_id: '',
    origin: 'https://www.shoujijiekuan.com',
    channel: "4",
    app_name: '真有钱花',
    wxId:'cf22cb6586e15506',
  },
  ajax(method_name, data, callback, method = 'POST') {
    let url = this.data.origin + '/service/ws4simple.asmx/';
    wx.request({
      url: url + method_name, //仅为示例，并非真实的接口地址
      data: data,
      method: method,
      dataType: 'json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        callback(res.data)
      },
      fail: function (res) {
        callback({ d: "{}" })
      },
    })
  },
  fail() {
    // 跳转页面失败的回调函数  
    wx.navigateTo({ url: '/pages/home/home' })
  },
  alert(content, title = '', ) {
    wx.showModal({
      title: title,
      showCancel: false,
      content: content,
      confirmColor: '#333'
    })
  },
  bind_val(e, _this) {
    let [k, v, obj] = [e.target.dataset.val, e.detail.value, {}];
    obj[k] = v;
    _this.setData(obj);

  },
  onLaunch: function () {
    this.data.u_id = wx.getStorageSync('u_id') || "";
  },
  share: {
    path: 'pages/all_products/all_products',
  }
})