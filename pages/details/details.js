// pages/details/details.js
const app = getApp();
Page({
  data: {
    details: null,
    app_name: ''
  },
  onLoad: function (options) {
    this.setData({
      details: wx.getStorageSync('details')
    });
    wx.removeStorageSync('details');
    wx.setNavigationBarTitle({ title: this.data.details.name });
    this.setData({
      app_name: app.data.app_name
    });
  },
  apply() {
    let route = getCurrentPages();
    let data = {
      Record: {
        userId: app.data.u_id,
        prdId: this.data.details.uid,
        channel: app.data.channel + '-' + app.data.app_name,
        channel2: "",
        page: /home/.test(route[0].route) ? "1" : '2'
      }
    }
    data = { strJson: JSON.stringify(data) };
    app.ajax('SetRecord', data, console.log);
  },
  onShareAppMessage: function () {
    return app.share;
  },
})