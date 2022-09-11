/**
 * Notes:  套系实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-08 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class ProductModel extends BaseProjectModel {

}

// 集合名
ProductModel.CL = BaseProjectModel.C('product');

ProductModel.DB_STRUCTURE = {
	_pid: 'string|true',
	PRODUCT_ID: 'string|true',

	PRODUCT_TITLE: 'string|true|comment=标题', 
	PRODUCT_STATUS: 'int|true|default=1|comment=状态 0=未启用,1=使用中',

	PRODUCT_CATE_ID: 'string|true|default=0|comment=分类',
	PRODUCT_CATE_NAME: 'string|false|comment=分类冗余',

	PRODUCT_ORDER: 'int|true|default=9999',
	PRODUCT_VOUCH: 'int|true|default=0',

	PRODUCT_FORMS: 'array|true|default=[]',
	PRODUCT_OBJ: 'object|true|default={}',

	PRODUCT_QR: 'string|false',
	PRODUCT_VIEW_CNT: 'int|true|default=0',

	PRODUCT_ADD_TIME: 'int|true',
	PRODUCT_EDIT_TIME: 'int|true',
	PRODUCT_ADD_IP: 'string|false',
	PRODUCT_EDIT_IP: 'string|false',
};

// 字段前缀
ProductModel.FIELD_PREFIX = "PRODUCT_";

/**
 * 状态 0=未启用,1=使用中 
 */
ProductModel.STATUS = {
	UNUSE: 0,
	COMM: 1
};



module.exports = ProductModel;