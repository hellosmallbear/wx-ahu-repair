// pages/bxrecord/bxrecord.js
import api from "../../utils/api.js"
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        number: ""
    },
    /**
     * 页面预加载 获取学号
     */
    onLoad() {
        this.setData({
            number: getApp().globalData.username
        })
    },
    /**
     * 将时间戳转换成日期
     */
    getLocalTime: function (nS) {
        return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    /**
     * 查看 获取报修记录
     */
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
                for (var key in repairMsg) {
                    repairMsg[key].submitTime = this.getLocalTime(repairMsg[key].submitTime);
                    repairMsg[key].repairTime = repairMsg[key].repairDate + '\t日\t' + repairMsg[key].repairTime;
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