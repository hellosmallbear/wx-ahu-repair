//index.js
//获取应用实例
var app = getApp()
var md = require('../../utils/md5.js')
var dt = require('../../utils/data.js')
var utils = require('../../utils/util.js')
Page({
  data: {
    savedFilePath: "",
    username: getApp().globalData.username,
    password: "",
    code: "",
    // 滚动图
    imgUrls: [
      '../../images/ahu.jpg',
      '../../images/ahu1.jpg',
    ],
    // 工具第一行
    arr1: [
      { imgurl: '../../images/icon/notice.png', txt: '公告' },
      { imgurl: '../../images/icon/kefu.png', txt: '客服' },
      { imgurl: '../../images/icon/saoyisao.png', txt: '扫一扫' },
      { imgurl: '../../images/icon/data.png', txt: '数据' }
    ],
    // 工具第二行
    arr2: [
      { imgurl: '../../images/icon/hoursebx.png', txt: '宿舍维修' },
      { imgurl: '../../images/icon/kongtiao.png', txt: '空调故障' },
      { imgurl: '../../images/icon/rl.png', txt: '日历' },
      { imgurl: '../../images/icon/about.png', txt: '关于我们' }
    ]
  },
  onLoad:function(options){
    this.setData({
      username:getApp().globalData.username,
    })
  },

  //点击跳转相应的页面  跳转到非tabBar页面用navigateTo  tarBar用switchTab
  kindToggle: function (e) {
    var txt = e.currentTarget.id;
    //var code = this.data.code;
    //var httpsurl = app.globalData.url;
    //var url1 = '../detail/detail?ch=' + code.slice(2);
    switch (txt) {
      case '公告':
        wx.navigateTo({
          url: '../notice/notice'
        });
        break;
      case '数据':
        wx.navigateTo({
          url: '../shuju/shuju'
          })
        break;
      case '客服':
        wx.navigateTo({
          url: '../kefu/kefu'
        });
        break;
      case '扫一扫':
        wx.scanCode({
          success: (res) => {
            console.log(res.result)
            // var url = '../stationmessage/stationmessage?id=' + res.result
            // wx.navigateTo({
            //   url: url
            // });
          }
        });
        break;
      case '宿舍维修':
        wx.reLaunch({
          url: '../susheWx/susheWx'
        });
        break;
      case '空调故障':
        wx.navigateTo({
          url: '../airCondition/airCondition'
        });
        break;
      case '日历':
          wx.navigateTo({
              url: '../calendar/calendar'
          });
          break;
      case '关于我们':
          wx.navigateTo({
              url: '../about/about'
          });
          break;
    }
  }
})