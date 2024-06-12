/**
 * Notes: passport模块业务逻辑 
 * Date: 2020-10-14 07:48:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectService = require('./base_project_service.js');
const cloudBase = require('../../../framework/cloud/cloud_base.js');
const UserModel = require('../model/user_model.js');
const dataUtil = require('../../../framework/utils/data_util.js');

class PassportService extends BaseProjectService {

	// 注册
	async register(userId, {
		mobile,
		name,
		forms,
		status
	}) {
		// 判断是否存在
		let where = {
			USER_MINI_OPENID: userId
		}
		let cnt = await UserModel.count(where);
		if (cnt > 0)
			return await this.login(userId);

		where = {
			USER_MOBILE: mobile
		}
		cnt = await UserModel.count(where);
		if (cnt > 0) this.AppError('该手机已注册');

		// 入库
		let data = {
			USER_MINI_OPENID: userId,
			USER_MOBILE: mobile,
			USER_NAME: name,
			USER_OBJ: dataUtil.dbForms2Obj(forms),
			USER_FORMS: forms,
			USER_STATUS: Number(status)
		}
		await UserModel.insert(data);

		return await this.login(userId);
	}

	/** 获取手机号码 */
	async getPhone(cloudID) {
		let cloud = cloudBase.getCloud();
		let res = await cloud.getOpenData({
			list: [cloudID], // 假设 event.openData.list 是一个 CloudID 字符串列表
		});
		if (res && res.list && res.list[0] && res.list[0].data) {

			let phone = res.list[0].data.phoneNumber;

			return phone;
		} else
			return '';
	}

	/** 取得我的用户信息 */
	async getMyDetail(userId) {
		let where = {
			USER_MINI_OPENID: userId
		}
		let fields = 'USER_MOBILE,USER_NAME,USER_FORMS,USER_OBJ,USER_STATUS,USER_CHECK_REASON'
		return await UserModel.getOne(where, fields);
	}

	/** 修改用户资料 */
	async editBase(userId, {
		mobile,
		name,
		forms
	}) {
		let whereMobile = {
			USER_MOBILE: mobile,
			USER_MINI_OPENID: ['<>', userId]
		}
		let cnt = await UserModel.count(whereMobile);
		if (cnt > 0) this.AppError('该手机已注册');

		let where = {
			USER_MINI_OPENID: userId
		}

		let user = await UserModel.getOne(where);
		if (!user) return;

		let data = {
			USER_MOBILE: mobile,
			USER_NAME: name,
			USER_OBJ: dataUtil.dbForms2Obj(forms),
			USER_FORMS: forms,
		};

		if (user.USER_STATUS == UserModel.STATUS.UNCHECK)
			data.USER_STATUS = UserModel.STATUS.UNUSE;

		await UserModel.edit(where, data);

	}

	/** 登录 */
	async login(userId) {

		let where = {
			'USER_MINI_OPENID': userId
		};
		let fields = 'USER_ID,USER_MINI_OPENID,USER_NAME,USER_PIC,USER_STATUS';
		let user = await UserModel.getOne(where, fields);
		let token = {};
		if (user) {

			// 正常用户
			token.id = user.USER_MINI_OPENID;
			token.key = user.USER_ID;
			token.name = user.USER_NAME;
			token.pic = user.USER_PIC;
			token.status = user.USER_STATUS;

			// 异步更新最近更新时间
			let dataUpdate = {
				USER_LOGIN_TIME: this._timestamp
			};
			UserModel.edit(where, dataUpdate);
			UserModel.inc(where, 'USER_LOGIN_CNT', 1);

		} else
			token = null;

		return {
			token
		};
	}



}

module.exports = PassportService;