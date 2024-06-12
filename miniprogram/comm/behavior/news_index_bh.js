const pageHelper = require('../../helper/page_helper.js');
module.exports = Behavior({
	/**
	 * 页面的初始数据
	 */
	data: {
	},

	methods: {
		/**
			* 生命周期函数--监听页面加载
			*/
		onLoad: async function (options) {

		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function () { },

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: async function () {

		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function () {

		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {

		},

		url: async function (e) {
			pageHelper.url(e, this);
		},

		bindCommListCmpt: function (e) {
			pageHelper.commListListener(this, e);
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function () {

		},

		_setCate(cateList, options, cateId = 0) {
			if (!cateId) {
				if (options && options.id) {
					cateId = options.id;
				}
			} 

			this.setData({
				_params: {
					cateId,
				}
			});



			for (let k = 0; k < cateList.length; k++) {
				if (cateList[k].id == cateId) {
					wx.setNavigationBarTitle({
						title: cateList[k].title
					});

					if (cateList[k].style) { //样式
						this.setData({
							listMode: cateList[k].style
						});
					} else {
						this.setData({
							listMode: 'leftbig1'
						});
					}

				}
			}
		}

	}
})