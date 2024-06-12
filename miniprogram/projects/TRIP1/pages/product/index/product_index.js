const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProductBiz = require('../../../biz/product_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
		 * 生命周期函数--监听页面加载
		 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		this._getSearchMenu();

		if (options && options.id) {
			this.setData({
				_params: {
					sortType: 'cateId',
					sortVal: options.id,
				}
			});
		} else {
			this.setData({

				_params: {
					sortType: 'cateId',
					sortVal: '',
				}
			});
		}
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


	onShareAppMessage: function () {

	},

	_getSearchMenu: function () {
		ProductBiz.setCateTitle();

		let sortItem1 = [{ label: '全部', type: 'cateId', value: '' }];

		sortItem1 = sortItem1.concat(ProductBiz.getCateList());

		let sortItems = [
			{ label: '排序', type: '', value: '' },
			{ label: '最新', type: 'sort', value: 'PRODUCT_ADD_TIME|desc' },
			{ label: '最热', type: 'sort', value: 'PRODUCT_VIEW_CNT|desc' },
			{ label: '推荐指数', type: 'sort', value: 'PRODUCT_OBJ.star|desc' },
		];
		let sortMenus = sortItem1;

		this.setData({
			sortItems: [sortItems],
			sortMenus
		})

	}

})