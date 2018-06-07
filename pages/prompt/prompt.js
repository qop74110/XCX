// pages/prompt.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    p_id: null,
    app_name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const details = wx.getStorageSync('details');
    this.setData({
      app_name: app.data.app_name,
      p_id: details.uid
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.share;
  },

  apply() {
    let route = getCurrentPages();
    let data = {
      Record: {
        userId: app.data.u_id,
        prdId: this.data.p_id,
        channel: app.data.channel + '-' + app.data.app_name,
        channel2: "",
        page: /home/.test(route[0].route) ? "1" : '2'
      }
    }
    data = { strJson: JSON.stringify(data) };
    app.ajax('SetRecord', data, console.log);
  },
})