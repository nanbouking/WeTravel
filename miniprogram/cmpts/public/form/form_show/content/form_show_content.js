const pageHelper = require('../../../../../helper/page_helper.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		formContent: [{
			type: 'text',
			val: '',
		}]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {

		let parent = pageHelper.getPrevPage(2);
		if (!parent) return;

		if (!options) return;

		if (!options.cmptId || !options.cmptFormName) return;
		let cmptId = '#' + options.cmptId;
		let cmptFormName = options.cmptFormName;

		let formContent = parent.selectComponent(cmptId).getOneFormVal(cmptFormName);

		if (formContent.length == 0) {
			formContent = [{ type: 'text', val: '' }];
		}

		this.setData({
			cmptId,
			cmptFormName,

			formContent
		});

		let curPage = pageHelper.getPrevPage(1);
		if (!curPage) return;
		if (curPage.options && curPage.options.source == 'admin') {
			wx.setNavigationBarColor({ //管理端顶部
				backgroundColor: '#2499f2',
				frontColor: '#ffffff',
			});
		}

	},




	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {

	},

	model: function (e) {
		pageHelper.model(this, e);
	},


	url: function (e) {
		pageHelper.url(e, this);
	},

	bindSaveTap: function (e) {
		// 获取富文本，如果没填写则为[]
		let formContent = this.selectComponent("#contentEditor").getNodeList();

		let parent = pageHelper.getPrevPage(2);
		if (!parent) return;

		parent.selectComponent(this.data.cmptId).setOneFormVal(this.data.cmptFormName, formContent);

		wx.navigateBack();
	}
})