// pages/bxrecord/bxrecord.js
import api from "../../utils/api.js"
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    number: ""
  },
  onLoad() {
    this.setData({
      number: getApp().globalData.username
    })
  },
  getLocalTime:function(nS) {     
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');     
  },
  check: function () {
    var number = this.data.number;
    var that = this;
    wx.request({
      url: api.bxrecurl,
      method: 'GET',
      data: {
        number: app.globalData.username
      },
      success: (res) => {
        var repairMsg = res.data.data;
        for (var key in repairMsg){
          repairMsg[key].createTime = this.getLocalTime(repairMsg[key].createTime);
          repairMsg[key].repairTime = this.getLocalTime(repairMsg[key].repairTime);
        }
        that.setData({
          repairMsg: repairMsg
        });
        console.log(repairMsg);
      },
      error: (res) => {
        console.log(res)
      }
    })
  }
})