const util = require('../../utils/util.js')
Page({
  data: {
    list:[
      {
        id:1,
        title:'React源码解析',
        descp:'探寻react源码之路...'
      },
      {
        id:2,
        title: '如何成为一名前端专家',
        descp: '走进大牛们的前端人生...'
      }
    ]
  },
  onLoad: function () {
  },
  onPullDownRefresh: function () {
    var that=this;
    setTimeout(function () { that.stopPullDownRefresh()},800)
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 800
    })
    let list=this.data.list;
    let length=list.length;
    let index = Math.floor(Math.random() * length);
    let obj=list[index];
    obj.id=length+1;
    list.push(obj);
    this.setData({list:list});
    console.log('onPullDownRefresh', new Date())
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast();
        console.log(res, new Date())
      }
    })
  },
  readDetails:function(e){
    let params = util.getParams(e.currentTarget.dataset);
    
    wx.navigateTo({
      url: '/pages/details/details'+params
    })
  }
})