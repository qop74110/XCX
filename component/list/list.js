// component/list/list.js
const app = getApp();
Component({
  properties: {
    prdList: {
      type: Array,
      value: [],
      // observer(newVal) {
      //   console.log(1)
      // }
    }
  },
  data: {  },
  methods: {
    open_details(e) {
      const i = e.currentTarget.dataset.index;
      wx.setStorage({
        key: 'details',
        data: this.data.prdList[i],
        success() {
          if (app.data.u_id !== "") {
            wx.navigateTo({
              url: '../prompt/prompt',
              fail: app.fail
            })
          } else wx.navigateTo({
            url: '../login/login?url=../prompt/prompt',
            fail: app.fail
          })
        }
      });
    },
  },
 
})


