// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sustech_imgs: [
      "../../images/main/sustech_1.JPG",
      "../../images/main/sustech_2.JPG",
      "../../images/main/sustech_3.JPG"
    ],
    news: [
      {
        "news_id": 1,
        "news_source_id": 23,
        "news_source_name": "南方科技大学",
        "news_source_img": "../../images/icons/sustech.png",
        "news_title": "南方科技大学预约系统上线啦！",
        "news_time": "2019-05-01",
        "news_cover": "../../images/main/sustech_1.JPG"
      },
    ]
  },

  jump_to_news: function() {
    console.log('jump to news')
    wx.navigateTo({
      url: '../news/news',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})