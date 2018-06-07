const app = getApp();
let a = "test";
Page({
  data: {
    prdList: [],
    loading: true,
  },
  onLoad() {
    this.tagPage();
  },
  tagPage() {
    if (!wx.getStorageSync('online')) {
      this.setData({ loading: false })
      this._getData();
    } else {
      const _this = this;
      wx.showLoading({ title: '加载中' });
      wx.request({
        url: app.data.origin + '/xcx/online.json',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data[app.data.wxId]) {
            _this._getData();

            wx.setStorage({
              key: "online",
              data: "1"
            });

            _this.setData({ loading: false })
          } else {
            wx.redirectTo({
              url: '../Vest/Vest'
            })
          }
        },
        complete() {
          wx.hideLoading();
        }
      })
    }
  },
  _getData() {
    const _this = this;
    wx.showLoading({ title: '加载中' });
    app.ajax('GetProduct', {         // 热门推荐
      channel: app.data.channel,
      sPage: '66',
      sAppName: app.data.app_name
    }, function (d) {
      _this.init_recommend(d)
    });
  },
  open_list(e) {
    wx.setStorageSync('spage', e.currentTarget.dataset.spage);
    wx.redirectTo({
      url: '../all_products/all_products',
      fail: app.fail
    })
  },
  init_recommend(d) {
    const data = JSON.parse(d.d).prdList;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].logo = app.data.origin + data[i].logo;
      }
      this.setData({
        prdList: data
      })
    }
    wx.hideLoading();
  },
  onShareAppMessage: function () {
    return app.share;
  },
})