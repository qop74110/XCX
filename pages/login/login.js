const app = getApp();
// pages/login/login.js
Page({
  data: {
    phone: '',
    state: 0,
    hide_calculator: true,    //  是否隐藏计算器
    arithmetic: '',     //  四则运算
    uSolution: null,    //  输入的数字验证码
    solution: null,     //  数字验证码
    hide_msg: true,
    uMsg: '',
    msg: "",
    url: '',
    time: null,
    msg_btn_str: '获取验证码',
  },
  bind_val(e) {
    app.bind_val(e, this)
  },
  hide_calculator_fn(e) {
    if (e.target.id === "calculator") {
      this.setData({
        state: 0,
        hide_calculator: true
      })
    }

  },
  onLoad: function (option) {
    let url = option.url;
    if (url) {
      this.data.url = url;
    }
  },
  onShareAppMessage: function () {

  },
  submit() {
    if (this.data.state !== 3) {
      if (/^[1][3|5|7|8][0-9]{9}$/.test(this.data.phone)) {
        if (this.data.state === 0) {
          this.setData({ state: 3 });
          this.init_calculator();
          this.setData({
            hide_calculator: false
          });
        } else if (this.data.state === 1) {
          this.get_msg();
        } else if (this.data.state === 2) {
          if (this.data.msg === this.data.uMsg) {
            this.setData({ state: 3 });
            this.login2();
          } else app.alert('请输入正确的验证码')
        }
      } else app.alert('请输入正确的手机号')
    }
  },
  init_calculator() {
    this.setData({
      arithmetic: '',
      uSolution: '',
      solution: ''
    });
    const symbol_arr = ["+", "-", "×", "÷"];   // 运算符号
    let method = this.random(0, symbol_arr.length - 1);   //  预算符号下标
    let symbol = symbol_arr[method];
    let first_digit = this.random(1, 9);    // 第一位数
    let second_digit = null;    // 第二位数
    let result = null;          // 运算结果

    if (symbol === "÷") {
      let num = [1];      // 随机的被除数
      num.push(first_digit);
      if (/^[12357]{1}$/.test(first_digit)) {                // 质数
        second_digit = num[this.random(0, 1)];
      } else {
        if (/^[468]{1}$/.test(first_digit)) num.push(2);    // 能被二整除的
        else num.push(3);                                   //  被三整除
        second_digit = num[this.random(0, 2)];
      }
      result = first_digit / second_digit;
    } else if (symbol === "-") {   // 减法
      if (first_digit === 1) second_digit = first_digit;
      else second_digit = this.random(1, first_digit);
      result = first_digit - second_digit;
    } else {
      second_digit = this.random(1, 9);
      if (symbol === "+") result = first_digit + second_digit;
      else result = first_digit * second_digit;
    }
    this.setData({
      solution: result.toString(),
      arithmetic: first_digit + symbol + second_digit,
    });
  },
  random: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  test_calculator(e) {
    if (this.data.uSolution === this.data.solution) {
      this.setData({
        hide_calculator: true,
        state: 1
      });
      this.submit();
    } else {
      this.init_calculator();
    }
  },
  get_msg() {
    if (this.data.time === null) {
      this.setData({ state: 3 });
      this.login1();
    }
  },
  login1() {
    let data = {
      Register: {
        username: this.data.phone,
        password: '',
        channel: app.data.channel + '-' + app.data.app_name,
        qudao: ''
      }
    };
    data = { strJson: JSON.stringify(data) }
    app.ajax('QuickLgnMsg', data, this.QuickLgnMsg_fn);
  },
  QuickLgnMsg_fn(d) {
    this.setData({ state: 1 });
    let state = parseInt(d.d);
    let str = d.d.split(',')[1];
    if (state === 1) {
      this.go(str);
    } else if (state === 0) {
      this.setData({
        hide_msg: false,
        msg: str,
        uMsg: '',
        state: 2
      });
      this.count_down();
    } else app.alert('网络错误！')
  },
  login2() {
    let data = { 
      "Register": { 
        "username": this.data.phone, 
        "password": "", 
        "channel": app.data.channel + "-" + app.data.app_name, 
        "qudao": "" 
      } 
    };
    data = { strJson: JSON.stringify(data) }
   wx.showLoading({ title: '加载中' });
    app.ajax('QuickLgn', data, this.QuickLgn_fn);
  },
  QuickLgn_fn(d) {
    this.setData({ state: 2 });
    let state = parseInt(d.d);
    if (state === 0) {
      this.go(d.d.split(',')[1]);
    } else app.alert('网络错误');
    wx.hideLoading();
  },
  count_down() {
    let s = 10;
    const _this = this;
    this.setData({
      time: setInterval(function () {
        s--;
        if (s >= 0) {
          _this.setData({
            msg_btn_str: s + 's'
          });
        } else {
          clearInterval(_this.data.time);
          _this.setData({
            msg_btn_str: '获取验证码',
            time: null
          });
        }
      }, 1000)
    });
  },
  go(str) {
    app.data.u_id = str;
    wx.setStorageSync('u_id', str)
    this.setData({ state: 1 });
    if (this.data.url !== "") {
      wx.redirectTo({ url: this.data.url })
    } else wx.navigateBack();
  },
})