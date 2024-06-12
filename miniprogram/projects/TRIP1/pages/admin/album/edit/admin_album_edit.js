const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminAlbumBiz = require('../../../../biz/admin_album_biz.js');
const AlbumBiz = require('../../../../biz/album_biz.js'); 

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options)) return; 

		this._loadDetail(); 
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		this.selectComponent("#cmpt-form").reload();
		wx.stopPullDownRefresh();
	},

	model: function (e) {
		pageHelper.model(this, e);
	},

	_loadDetail: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let id = this.data.id;
		if (!id) return;

		if (!this.data.isLoad) this.setData(AdminAlbumBiz.initFormData(id)); // 初始化表单数据

		let params = {
			id
		};
		let opt = {
			title: 'bar'
		};
		let album = await cloudHelper.callCloudData('admin/album_detail', params, opt);
		if (!album) {
			this.setData({
				isLoad: null
			})
			return;
		};

		this.setData({
			isLoad: true,

			formTitle: album.ALBUM_TITLE,
			formCateId: album.ALBUM_CATE_ID,
			formOrder: album.ALBUM_ORDER,
		
			formForms: album.ALBUM_FORMS,
		});
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		// 数据校验
		let data = this.data;
		data = validate.check(data, AdminAlbumBiz.CHECK_FORM, this);
		if (!data) return;

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		data.cateName = AlbumBiz.getCateName(data.cateId);

		try {
			let albumId = this.data.id;
			data.id = albumId;

			// 先修改，再上传 
			await cloudHelper.callCloudSumbit('admin/album_edit', data);

			await cloudHelper.transFormsTempPics(forms, 'album/', albumId, 'admin/album_update_forms');

			let callback = async () => {

				// 更新列表页面数据
				let node = {
					'ALBUM_TITLE': data.title,
					'ALBUM_CATE_NAME': data.cateName,
					'ALBUM_ORDER': data.order,
				}
				pageHelper.modifyPrevPageListNodeObject(albumId, node);

				wx.navigateBack();

			}
			pageHelper.showSuccToast('修改成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},


	url: function (e) {
		pageHelper.url(e, this);
	}

})