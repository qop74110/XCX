// pages/Vest/Vest.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _name: '',
    _money: '',
    total_money: 0,         //  合计金额
    btn_load: false,        //  防止表单重复提交 
    list: [],               //  账单列表

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: `${app.data.app_name}--账本`
    })
    this.setData({
      list: wx.getStorageSync('logs') || []
    });

    this.total();

    // if (!wx.getStorageSync('online'))this.taggle();
    // else {
    //   wx.redirectTo({
    //     url: '../home/home'
    //   })
    // }
  },
// 显示开关
  taggle(){
    wx.request({
      url: app.data.origin + '/xcx/online.json', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.d7de5d11297dcea7)
        if (res.data[app.data.wxId]) {
          wx.setStorage({
            key: "online",
            data: "1"
          });
          wx.redirectTo({
            url: '../home/home'
          })
        };
      }
    })
  },

  set_name(e) {
    this.setData({
      _name: e.detail.value
    })
  },

  set_money(e) {
    this.setData({
      _money: e.detail.value
    })
  },
  // 计算总金额
  total() {
    let total_money = 0;
    for (let i = 0; i < this.data.list.length; i++) {
      total_money += this.data.list[i]._money * 1
    }

    this.setData({
      total_money: total_money.toFixed(2)
    });
  },

  submit() {
    this.setData({ btn_load: true });

    let { _name, _money, list } = this.data;

    if (_name === "") app.alert("请输入 账目详情");
    else if (_money === "") alert.alert("请输入 账目金额");
    else {
      _money = _money * 1;

      list.unshift({
        _name,
        _money: _money.toFixed(2)
      });

      wx.setStorage({
        key: "logs",
        data: list
      })

      this.setData({
        _name: '',
        _money: '',
        list
      });

      this.total();
    }
    this.setData({ btn_load: false });
  },

  del(e) {
    const i = e.target.dataset.i;
    const list = this.data.list;
    list.splice(i, 1);

    wx.setStorage({
      key: "logs",
      data: list
    })

    this.setData({
      list
    })

    this.total();
  }

})