// pages/fangwuWx/fangwuWx.js
var app = getApp();
var util = require("../../utils/util.js");
var api = require("../../utils/api.js");
Page({
    //页面的初始数据
    data: {

        repairDate: "",
        submitTime: "",
        tel: "",
        repairContext: "",
        repairTime: "",
        repairAddress: "array1+dormNumber",
        repairImg: "../image/camera.png",

        dormNumber: "",
        imgSrc1: "",
        imgSrc2: "",
        array1: ['请选择', '李园', '桃园', '桔园', '枫园', '槐园', '桂园', "竹园", "松园",
            "梅园", "杏园", "枣园", '榴园', '蕙园8栋', '蕙园9栋', '蕙园10栋'],
        index1: 0,
        array2: ['请选择', '锁具', '灯具', '房门', '空调', '电风扇', '床铺', '插座', '桌椅', '卫生间门', '蹲便器', '节水龙头', '晾衣杆', '阳台门', '阳台窗', '漏水', '堵塞', '其他'],
        index2: 0,
        array3: ['请选择', '堵塞', '漏水', '损坏', '其他'],
        index3: 0,
        array4: [],
        index4: 0,
        date: '2018-01-20',
    },
    //页面初始化加载
    onLoad: function (options) {
        var that = this;
        var time = util.formatTime(new Date());
        that.setData({
            time: time
        });
        var username = app.globalData.username;
        that.setData({
            number: username
        });
        //获取预约时间
        wx.request({
            url: api.repairtime,
            success(res) {
                var times = res.data.data;
                var str = [];
                for (var i = 0; i < times.length; i++) {
                    str.push(times[i].startTime + '-' + times[i].endTime);
                }
                that.setData({
                    array4: str
                })
            }
        }),

            //获取分类
            wx.request({
                url: api.repairflurl,
                success(res) {
                    console.log(res.data)
                },
                fail(res) {
                    //console.log(res)
                }
            })
    },

    //选择上传图片操作函数
    chooseImageTap: function () {
        let _this = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#f7982a",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        _this.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        _this.chooseWxImage('camera')
                    }
                }
            }
        })
    },
    chooseWxImage: function (type) {
        let _this = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                _this.setData({
                    repairImg: res.tempFilePaths[0],
                })
            }
        })
    },

    //picker选择器
    listenerPickerSelected1: function (e) {
        //改变index值，通过setData()方法重绘界面
        this.setData({
            index1: e.detail.value
        });
    },
    listenerPickerSelected2: function (e) {
        this.setData({
            index2: e.detail.value
        });
    },
    listenerPickerSelected3: function (e) {
        this.setData({
            index3: e.detail.value
        });
    },
    listenerPickerSelected4: function (e) {
        this.setData({
            index4: e.detail.value
        });
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    // 检查字符串是否为合法手机号码
    isPhone: function (str) {
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
        if (reg.test(str)) {
            //console.log('手机号码格式输入正确');
            return 1;
        } else {
            //console.log('请输入正确格式的手机号码');
            return -1;
        }
    },
    //提交表单数据操作函数  
    formSubmit: function (e) {
        var that = this;
        //获取表单所有input的值
        var result = e.detail.value;
        var yuanqu = this.data.array1[this.data.index1];
        var repairAddress = yuanqu + result.dormNumber;
        var gzsb = this.data.array2[this.data.index2];
        var gzyy = this.data.array3[this.data.index3];
        var rqxz = this.data.date;
        var yysj = this.data.array4[this.data.index4];
        var formData = {
            repairDate: rqxz,
            submitTime: this.data.time,
            number: this.data.number,
            tel: result.tel,
            repairContext: result.repairContext,
            repairTime: yysj,
            repairAddress: repairAddress,
        }

        var park = yuanqu.indexOf("请选择");
        var device = gzsb.indexOf("请选择");
        var reson = gzyy.indexOf("请选择");

        if (this.isPhone(formData.tel) < 0) {
            wx.showToast({
                title: '手机号码错误',
                icon: "loading",
                duration: 1500
            })
        } else if (park >= 0) {
            wx.showToast({
                title: '请选择园区',
                icon: "loading",
                duration: 1500
            })
        } else if (device >= 0) {
            wx.showToast({
                title: '请选择故障设备',
                icon: "loading",
                duration: 1500
            })
        } else if (reson >= 0) {
            wx.showToast({
                title: '请选择故障原因',
                icon: "loading",
                duration: 1500
            })
        } else {
            //将表单数据和图片以文件形式上传
            wx.uploadFile({
                url: api.uploadurl,
                filePath: this.data.repairImg,  //图片路径，如tempFilePaths[0]
                name: 'upload',
                header: {
                    "content-type": "multipart/form-data"
                },
                formData: formData,       //表单数据
                success: function (res) {
                    if (res.statusCode == 200) {
                        wx.showToast({
                            title: '提交成功',
                            icon: "success",
                            duration: 1500,
                        });
                        that.setData({
                            result: ''
                        });
                        setTimeout(function () {
                            wx.switchTab({
                                url: '../index/index',
                            })
                        }, 2000)
                    }
                },
                fail: function (res) {
                    console.log(res);
                    wx.showToast({
                        title: '信息不完整',
                        icon: 'loading',
                        duration: 1500
                    })
                },
                complete: function (res) {

                },

            })
                ,
                setTimeout(function () {
                    wx.switchTab({
                        url: '../index/index',
                    }), 2000
                })
        }
    }
})