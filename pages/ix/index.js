import { config } from '../../config.js';

// 引入coolsite360交互配置设定
require('coolsite.config.js');

//工具方法
const util = require('../../utils/util.js')

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "index",
  /**
   * 页面的初始数据
   */

  data: {
    userInfo: {},
    picList:[
      { 
        id:1,
        imgUrl:"http://qty83k.creatby.com/materials/origin/e3f6d0305383ac71b2703b2697bff3e7_origin.jpg",
        iconUrl:"http://qty83k.creatby.com/materials/origin/a67f2e79e6ed8ae5bf46237d4f88a4e7_origin.png",
        numbers:435,
        date:"2017.09.10"
      },
      {
        id:2,
        imgUrl: "http://qty83k.creatby.com/materials/origin/2260b2cfec75ff3bed26c6c885a36d4f_origin.jpg",
        iconUrl: "http://qty83k.creatby.com/materials/origin/c5656ef00d38d89eae437c5a9102f8fa_origin.png",
        numbers: 45,
        date: "2017.09.09"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },

  showPicList(imgUrl){
    let list = this.data.picList ;
    let obj = {
      id: list.length+1,
      imgUrl: imgUrl,
      iconUrl: "http://qty83k.creatby.com/materials/origin/a67f2e79e6ed8ae5bf46237d4f88a4e7_origin.png",
      numbers: 0,
      date: util.formatTimeymd(new Date())
    }
    list.push(obj);
    this.setData({picList:list});
  },
  //以下为自定义点击事件
  showPic(){
    let that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.showToast({
          title: "上传中",
          icon: "loading",
          duration: 2000
        })
        wx.uploadFile({
          url: config.service.uploadUrl, //腾讯云
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            if(!res.statusCode || res.statusCode!=200)
                return ;
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
            var data = res.data;
            let url=JSON.parse(data);
            let imgUrl=url.data.imgUrl;
            that.showPicList(imgUrl);
                        //do something
          },
          fail: function ( errMsg ) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })
      }
    })
  }
})

