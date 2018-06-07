// component/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: 'home'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tagPage(e) {
      const page = {
        home: '../home/home',
        product: "../all_products/all_products"
      };
      
      const p = e.target.dataset.url;

      if (p !== this.data.url) {
        wx.redirectTo({
          url: page[p]
        })
      }
    }
  }
})
