/**
 * Notes: 相册后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-05 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const ProductBiz = require('./product_biz.js');
const projectSetting = require('../public/project_setting.js');

class AdminProductBiz extends BaseBiz {

	static initFormData(id = '') {
		let cateIdOptions = ProductBiz.getCateList();

		return {
			id,

			cateIdOptions,
			fields: projectSetting.PRODUCT_FIELDS, 
			
			formTitle: '',
			formCateId: (cateIdOptions.length == 1) ? cateIdOptions[0].val : '',
			formOrder: 9999,

			formForms: [],
		}

	}

}

AdminProductBiz.CHECK_FORM = {
	title: 'formTitle|must|string|min:2|max:50|name=标题',
	cateId: 'formCateId|must|id|name=分类',
	order: 'formOrder|must|int|min:0|max:9999|name=排序号',
	forms: 'formForms|array',
};


module.exports = AdminProductBiz;