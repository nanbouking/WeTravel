const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../../helper/cache_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');

const CACHE_USER_CHECK_REASON = 'CACHE_USER_CHECK_REASON';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userRegCheck: projectSetting.USER_REG_CHECK,
		checkModalShow: false,

		formReason: '',
		curIdx: -1,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		//设置搜索菜单
		await this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { },

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

	bindDelTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('admin/user_del', params, opts).then(res => {

					pageHelper.delListNode(id, this.data.dataList.list, 'USER_MINI_OPENID');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (e) {
				console.log(e);
			}
		}
		pageHelper.showConfirm('确认删除？删除不可恢复', callback);

	},


	bindClearReasonTap: function (e) {
		this.setData({
			formReason: ''
		})
	},

	bindCheckTap: function (e) {
		let curIdx = pageHelper.dataset(e, 'idx');
		this.setData({
			formReason: cacheHelper.get(CACHE_USER_CHECK_REASON) || '',
			curIdx,
			checkModalShow: true,
		});
	},

	bindCheckCmpt: async function () {
		let e = {
			currentTarget: {
				dataset: {
					status: 8,
					idx: this.data.curIdx
				}
			}
		}
		cacheHelper.set(CACHE_USER_CHECK_REASON, this.data.formReason, 86400 * 365);
		await this.bindStatusTap(e);
	},

	bindStatusTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let status = pageHelper.dataset(e, 'status');

		let idx = Number(pageHelper.dataset(e, 'idx'));

		let dataList = this.data.dataList;
		let id = dataList.list[idx].USER_MINI_OPENID;

		let params = {
			id,
			status,
			reason: this.data.formReason
		}

		let cb = async () => {
			try {
				await cloudHelper.callCloudSumbit('admin/user_status', params).then(res => {
					let sortIndex = this.selectComponent('#cmpt-comm-list').getSortIndex();
 
					if (sortIndex != -1 && sortIndex != 5 && !this.data.search) { // 全部或者检索的结果
						dataList.list.splice(idx, 1);
						dataList.total--;
						this.setData({
							dataList: this.data.dataList
						});
					} else {
						let data1Name = 'dataList.list[' + idx + '].USER_CHECK_REASON';
						let data2Name = 'dataList.list[' + idx + '].USER_STATUS';
						this.setData({
							[data1Name]: this.data.formReason,
							[data2Name]: status
						});
					}

					this.setData({
						checkModalShow: false,
						formReason: '',
						curIdx: -1,
					});
					pageHelper.showSuccToast('操作成功');
				});
			} catch (e) {
				console.log(e);
			}
		}

		if (status == 8) {
			pageHelper.showConfirm('该用户审核不通过，用户修改资料后可重新提交审核', cb)
		}
		else
			pageHelper.showConfirm('确认执行此操作?', cb);
	},

	_getSearchMenu: async function () {

		let sortItems1 = [
			{ label: '全部', type: '', value: '' },
			{ label: '注册时间从早到晚', type: 'sort', value: 'newasc' },
			{ label: '注册时间从晚到早', type: 'sort', value: 'newdesc' },
		];
		let sortMenus = [
			{ label: '全部', type: '', value: '' },
			{ label: '正常', type: 'status', value: 1 },
			{ label: '禁用', type: 'status', value: 9 }

		]

		if (projectSetting.USER_REG_CHECK) {
			sortMenus = sortMenus.concat([
				{ label: '待审核', type: 'status', value: 0 },
				{ label: '审核未过', type: 'status', value: 8 }
			]);
		}
		this.setData({
			sortItems: [sortItems1],
			sortMenus
		})


	}

})