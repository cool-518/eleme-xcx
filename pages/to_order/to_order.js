// pages/to_order/to_order.js
var local_data = require("../../local_data/local_data.js") //引入本地虚拟数据
Page({
    data: {
        chose_food_num: '',
        total_price: 0,
        delUrl: "",
        goodCategoryActive: false,
        count:0
    },
    onLoad: function (options) { // restaurant
        var restaurantId = options.id;
        var list_left = ["热销", "米饭", "管饱", "美味", "优惠"];
        var food_type = ["food_hot", "food_rice", "food_full", "food_delicious", "food_discount"];
        var least_price = local_data.resturants[restaurantId].least_price;
        var diff = local_data.resturants[restaurantId].diff;
        this.setData({
            restaurant: local_data.resturants[restaurantId],
            list_left: list_left,
            food_type: food_type,
            least_price: least_price,
            diff: diff
        });
        // 初始化,显示热销
        this.setData({
            restaurant_food: this.data.restaurant.food_hot,
            list_left_item: this.data.list_left[0],
            leftindex: 0
        });
    },
    // 点击左侧列表切换种类
    onFindMore: function (event) {
        var leftindex = event.currentTarget.dataset.leftindex;
        console.log(leftindex)
        var list_left_item = this.data.list_left[leftindex]
        this.setData({
            restaurant_food: this.data.restaurant[this.data.food_type[leftindex]],
            list_left_item: list_left_item,
            leftindex: leftindex,
        });
    },
    // 添加食物到购物车
    onAddItem: function (event) {
        this.data.count++;
        var foodId = event.target.dataset.foodid;
        for (var i = 0; i < this.data.restaurant_food.length; i++) {
            if (this.data.restaurant_food[i].food_id === foodId) {
                this.data.restaurant_food[foodId].count += 1;
            }
        }
        this.data.total_price += this.data.restaurant_food[foodId].price;
        this.data.diff = this.data.least_price - this.data.total_price
        if (this.data.diff < 0) {
            this.data.diff = 0;
        }

        if (this.data.leftindex === 0) {
            this.setData({
                restaurant_food: this.data.restaurant.food_hot,
                list_left_item: this.data.list_left[0],
                leftindex: 0,
                total_price: this.data.total_price,
                diff: this.data.diff,
                count: this.data.count
            });
        } else {
            this.setData({
                restaurant_food: this.data.restaurant[this.data.food_type[this.data.leftindex]],
                list_left_item: this.data.list_left_item,
                leftindex: this.data.leftindex,
                total_price: this.data.total_price,
                diff: this.data.diff,
                count: this.data.count
            });
        }
    },
    onDeleItem: function (event) {
        this.data.count--;
        if (this.data.count<0){
            this.data.count=0
        }
        var foodId = event.target.dataset.foodid;
        for (var i = 0; i < this.data.restaurant_food.length; i++) {
            if (this.data.restaurant_food[i].food_id === foodId) {
                this.data.restaurant_food[foodId].count -= 1;
                if (this.data.restaurant_food[foodId].count == -1) {
                    this.data.restaurant_food[foodId].count = 0;
                }
            }
        }
        this.data.total_price -= this.data.restaurant_food[foodId].price;
        if (this.data.total_price<0){
            this.data.total_price=0;
        }
        this.data.diff = this.data.least_price - this.data.total_price
        if (this.data.diff < 0) {
            this.data.diff = 0;
        }
        if (this.data.leftindex === 0) {
            this.setData({
                restaurant_food: this.data.restaurant.food_hot,
                list_left_item: this.data.list_left[0],
                leftindex: 0,
                total_price: this.data.total_price,
                diff: this.data.diff,
                count: this.data.count
            });
        } else {
            this.setData({
                restaurant_food: this.data.restaurant[this.data.food_type[this.data.leftindex]],
                list_left_item: this.data.list_left_item,
                leftindex: this.data.leftindex,
                total_price: this.data.total_price,
                diff: this.data.diff,
                count: this.data.count
            });
        }
    },
    onPay: function () {
        wx.navigateTo({
            url: '../my/my'
        })
    },
    onUnload:function(event){
        for (var i = 0; i < this.data.restaurant_food.length;i++){
            this.data.restaurant_food[i].count=0;
       }
    }
})