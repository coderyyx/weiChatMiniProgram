import { config } from './config.js';

//app.js
var coolsite360 = require('./pages/coolsite/index.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        //换取openId
        wx.request({
          url: config.service.requestUrl,
          data: {
            code: res.code
          },
          success: function (res) {
            console.log('拉取openid成功', res)
            // self.globalData.openid = res.data.openid
            // callback(null, self.globalData.openid)
          },
          fail: function (res) {
            console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
            callback(res)
          }
        })
      },
      fail: error => {
        console.log(error)
      },
      complete: co => {
        console.log(co)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail:error => {
        console.log(error)
      },
      complete: co => {
        console.log(co)
      }
    })
  },
  globalData: {
    userInfo: null
  },
  coolsite360: coolsite360
})