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
        array2: [],
        Array: [
            {
                array0: '请选择',
                id: 0,
                array: ['请选择'],
            },
            {
                array0: '用水故障',
                id: 1,
                array: ['马桶', '水箱', '水池', '水管', '其他'],
            },
            {
                array0: '用电故障',
                id: 2,
                array: ['照明', '空调', '插座', '其他', '/'],
            },
            {
                array0: '漏水故障',
                id: 3,
                array: ['屋顶漏水', '墙壁渗水', '其他', '/', '/'],
            },
            {
                array0: '家具故障',
                id: 4,
                array: ['床铺桌子', '椅子', '门窗', '其他', '/'],
            },
            {
                array0: '其他故障',
                id: 5,
                array: ['/', '/', '/', '/', '/']
            }
        ],
        array3: [],
        index2: 0,
        index3: 0,
        array4: [],
        index4: 0,
        date: '',
    },
    //页面初始化加载
    onLoad: function (options) {
        var that = this;

        // 设置故障设备及故障分类
        var Array = that.data.Array;
        var array2 = []
        for (var i = 0; i < Array.length; i++) {
            array2.push(Array[i].array0)
        }
        that.setData({
            array2: array2,
            array3: Array[that.data.index2].array
        })

        var time = util.formatTime(new Date());
        var time1 = util.formatDate(new Date());
        that.setData({
            time: time,
            date: time1
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
                success(res) { },
                fail(res) { }
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
            index2: e.detail.value,
            index3: 0
        })
        var Array = this.data.Array
        this.setData({
            array3: Array[this.data.index2].array
        })
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
            return 1;
        } else {
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
        var gzfl = this.data.array2[this.data.index2];
        var gzsb = this.data.array3[this.data.index3];
        var rqxz = this.data.date;
        var yysj = this.data.array4[this.data.index4];
        var repairType = gzfl.concat('-'+gzsb)
        // console.log(repairType1)
        // var repairType = gzfl + '-' + gzsb;
        // console.log(repairType)
        var formData = {
            repairDate: rqxz,
            submitTime: this.data.time,
            number: this.data.number,
            tel: result.tel,
            repairContext: result.repairContext,
            repairTime: yysj,
            repairAddress: repairAddress,
            repairType: repairType
        }

        var park = yuanqu.indexOf("请选择");
        var repairType = gzfl.indexOf("请选择");
        var repairDevice = gzsb.indexOf("请选择");

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
        } else if (repairType >= 0) {
            wx.showToast({
                title: '请选择故障分类',
                icon: "loading",
                duration: 1500
            })
        } else if (repairDevice >= 0) {
            wx.showToast({
                title: '请选择故障设备',
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
                    // console.log(res);
                    wx.showToast({
                        title: '信息不完整',
                        icon: 'loading',
                        duration: 1500
                    })
                },
                complete: function (res) {

                },
            })
        }
    }
})