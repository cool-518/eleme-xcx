// pages/home/home.js
var local_data = require("../../local_data/local_data.js") //引入本地假数据
Page({
    data: {
        resturants: "",
         home_detail: ""
    },
    onShow: function () {
       
    },
    onLoad: function (event) { 
        
        console.log(this.dataset)
       
        this.setData({
            resturants: local_data.resturants,
       
            // rttName: local_data.resturants[resturantId].name, //rtt表示resturant
            // rttId: resturantId,
            // rttIconUrl: local_data.resturants[resturantId].url,
            // rttStar: local_data.resturants[resturantId].star,
            // rttSale: local_data.resturants[resturantId].sale
        })
    },
    toOrder: function (event) {
        var resturantId = event.currentTarget.dataset.id //注意不是target,通过传id，在toOrder页面的   //options.id接收，根据id甄选数据
        wx.navigateTo({
            url: '../to_order/to_order?id=' + resturantId,//后面不要跟wxml
        })
    }
})