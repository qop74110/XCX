// pages/all_products/all_products.js
const app = getApp();
Page({
  data: {
    prdList: [],
    selectedColor: "3",
    O_selectedColor: "9",
    hideOther: true,
    sPage: {
      tuijian: {
        index: "1",
        spage: "31",
        text: "推荐"
      },
      jisu: {
        index: "2",
        spage: "2",
        text: "极速"
      },
      qita: {
        index: "3",
        text: "其他"
      },
      tongguo: {
        index: "4",
        spage: "51",
        text: "通过率高"
      },
      zhengxin: {
        index: "5",
        spage: "52",
        text: "不查征信"
      },
      lixi: {
        index: "6",
        spage: "53",
        text: "超低利息"
      },
      zhima: {
        index: "7",
        spage: "54",
        text: "芝麻信用"
      },
      shouji: {
        index: "8",
        spage: "56",
        text: "手机身份证"
      }
    }
  },
  onLoad: function (options) {
    const spage = wx.getStorageSync('spage') || 'tuijian';
    this.screen(this.data.sPage[spage]);
    wx.removeStorageSync('spage');
  },
  request(spage) {
    const _this = this;
    wx.showLoading({ title: '加载中' });
    app.ajax('GetProduct', {         // 热门推荐
      channel: app.data.channel,
      sPage: spage,
      sAppName: app.data.app_name
    }, function (d) {
      _this.prdList(d)
    });
  },
  prdList(d) {
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
  screen(e) {
    let d = e;
    if (e.target !== undefined) d = e.target.dataset;

    if (d.index === "3") {
      this.setData({
        selectedColor: d.index,
        hideOther: !this.data.hideOther
      });
    } else {
      this.request(d.spage);
      if (d.index > 3) {
        this.setData({
          hideOther: true,
          O_selectedColor: d.index
        });
      } else {
        this.setData({
          hideOther: true,
          O_selectedColor: "0",
          selectedColor: d.index,
        });
      }
    }
  },
  onShareAppMessage: function () {
    return app.share;
  },
  onShow: function () {
    const spage = wx.getStorageSync('spage');
    if (spage) {
      if (spage !== 'jisu') this.screen(this.data.sPage.qita);
      this.screen(this.data.sPage[spage]);
      wx.removeStorageSync('spage');
    }
  },
})