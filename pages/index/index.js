//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎来到前端的世界',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls:[
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504713754958&di=7a5da236af328b06398698b3a2677f17&imgtype=0&src=http%3A%2F%2Fcv.qiaobutang.com%2Fuploads%2Farticle_images%2F2015%2F6%2F1%2F17%2F556c26f00cf20d6a7e2532c5%2Fbig.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504713925940&di=20acbf24f985ef4590789d65d78460c2&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150831%2Fmp30065012_1441016852077_1_th.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504714090495&di=69c7f6730ddbd4da7626b12fd989172b&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D912c790983d4b31cf03c94bbb7d7276f%2F42166d224f4a20a49de25e8d98529822730ed0f8.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504714154722&di=7bb3665aefbfaf02fd00c893ea1a3471&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3De23e4cd9bd4543a9e116f28f767ee0f7%2F8326cffc1e178a82e826ed8dfc03738da977e881.jpg"
      
    ],
    indicatorDots: true,
    autoplay: true,
    indicatorcolor:'white',
    activecolor:'green',
    interval: 2000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../main/main'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Rua的小程序',
      path: '/pages/index?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
