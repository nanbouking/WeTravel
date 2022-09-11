/**
 * Notes: 设置管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-07-11 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const cloudBase = require('../../../../framework/cloud/cloud_base.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const setupUtil = require('../../../../framework/utils/setup/setup_util.js');
const config = require('../../../../config/config.js');
const md5Lib = require('../../../../framework/lib/md5_lib.js');

class AdminSetupService extends BaseProjectAdminService {

	// 通用setup
	async setSetup(key, val, type = '') {
		await setupUtil.set(key, val, type);
	}

	/** 小程序码 */
	async genMiniQr(page, sc = 'qr') {
		//生成小程序qr buffer
		let cloud = cloudBase.getCloud();

		if (page.startsWith('/')) page = page.substring(1);
		console.log('page=' + page, ', scene=' + sc);

		let color = ['0', '0', '0'];
		if (config.TEST_MODE == true && page.includes('default/index/default_index')) {
			// 首页且测试模式
			let rd = PID;
			rd = rd.match(/\d+/g).join('');
			rd = Number(rd) % 20;

			let colorArr = [];
			colorArr.push('0 238 238');
			colorArr.push('47 79 79');
			colorArr.push('105 139 105');
			colorArr.push('119 136 153');
			colorArr.push('100 149 237');
			colorArr.push('0 205 0');
			colorArr.push('176 196 222');
			colorArr.push('205 190 112');
			colorArr.push('255 20 147');
			colorArr.push('139 90 0');
			colorArr.push('205 16 118');
			colorArr.push('255 174 185');
			colorArr.push('108 166 205');
			colorArr.push('0 0 139');
			colorArr.push('130 130 130');
			colorArr.push('205 150 205');
			colorArr.push('205 102 0');
			colorArr.push('139 101 8');
			colorArr.push('72 209 204');
			colorArr.push('176 196 222');
			color = colorArr[rd].split(' ');
		}


		let result = await cloud.openapi.wxacode.getUnlimited({
			scene: sc,
			width: 280,
			lineColor: {
				r: color[0],
				g: color[1],
				b: color[2],
			},
			check_path: false,
			//env_version: 'trial', //release,trial,develop
			page
		});

		let cloudPath = PID + '/' + 'setup/' + md5Lib.md5(page) + '.png';
		let upload = await cloud.uploadFile({
			cloudPath,
			fileContent: result.buffer,
		});

		if (!upload || !upload.fileID) return;

		let ret = await cloudUtil.getTempFileURLOne(upload.fileID);
		return ret + '?rd=' + this._timestamp;
	}

}

module.exports = AdminSetupService;