//app.js
var fundebug = require('utils/fundebug.js');
fundebug.apikey = 'b77a986f7a1df47e4f67f13f872d13cb311bc6a8394c92293c34022c8936550d';
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs.slice(0, 40))

    //Fundebug 插件测试
    //throw new Error("Test");
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    adminUserViewId:'',
    token:'',
    userInfo: null,
    weixiudan: null,//维修单
    username:null,
  },
})