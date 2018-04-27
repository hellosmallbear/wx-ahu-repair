//login.js
//获取应用实例
import api from "../../utils/api.js"
var app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    number: '',
    idCard: ''
  },

  onLoad: function (options) {
    wx.request({
      url: api.repairflurl,
      success: function (res) {
        //console.log(res.data)
      }
    })
  },

  // 获取输入账号  
  stunumInput: function (e) {
    this.setData({
      number: e.detail.value
    })
  },

  // 获取输入密码  
  passwordInput: function (e) {
    this.setData({
      idCard: e.detail.value
    })
  },

  // 登录  
  login: function () {
    var number = this.data.number;
    var idCard = this.data.idCard;
    if (this.data.number.length == 0 || this.data.idCard.length == 0) {
      wx.showToast({
        title: '账户/密码错误',
        icon: 'loading',
        duration: 500
      })
      return;
    }
    wx.request({
      url: api.loginurl,
      method: 'GET',
      data: {
        number: this.data.number,
        idCard: this.data.idCard
        // idCard: this.data.idCard.substring(12, 18)
      },
      success: (res) => {
        var that = this;
        console.log(res);
        var message = res.data.meta.message;
        var type = res.data.data.type
        if (message == "ok" && type == "硕士") {
          //console.log(this.data.idCard)
          app.globalData.username = that.data.number;
          //console.log(app.globalData.username);
          wx.switchTab({
            url: '../index/index',
          })
        } else if (message == "ok" && type == "维修工") {
          wx.switchTab({
            url: '../wxWorker/wxWorker',
          })
        }
      },
      error: (res) => {
        console.log(res)
      }
    })
  }
})