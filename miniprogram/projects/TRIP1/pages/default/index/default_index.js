const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		album: [
			'/projects/TRIP1/images/home/b1.jpg',
			'/projects/TRIP1/images/home/b3.jpg',
			'/projects/TRIP1/images/home/b4.jpg',
			'/projects/TRIP1/images/home/b5.jpg',
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
	},

	_loadList: async function () {
		let opts = {
			title: 'bar'
		}
		await cloudHelper.callCloudSumbit('home/list', {}, opts).then(res => {

			let dataList = res.data;

			let hot1List = [];
			let hot2List = [];
			for (let k = 0; k < dataList.length; k++) {
				let item = dataList[k];
				if (item.type == 'product') hot1List.push(item);
				else if (item.type == 'album')
					hot2List.push(item);
			}
			this.setData({
				hot1List,
				hot2List
			})
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
		this._loadList();
	},

	onPullDownRefresh: async function () {
		await this._loadList();
		wx.stopPullDownRefresh();
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


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
})