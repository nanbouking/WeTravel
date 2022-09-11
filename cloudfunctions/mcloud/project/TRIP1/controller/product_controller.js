/**
 * Notes: 产品模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-08 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const ProductService = require('../service/product_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const dataUtil = require('../../../framework/utils/data_util.js');

class ProductController extends BaseProjectController {

	/** 列表 */
	async getProductList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ProductService();
		let result = await service.getProductList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].PRODUCT_ADD_TIME = timeUtil.timestamp2Time(list[k].PRODUCT_ADD_TIME, 'Y-M-D');
			list[k].PRODUCT_OBJ.desc = dataUtil.fmtText(list[k].PRODUCT_OBJ.desc, 100);
			list[k].PRODUCT_OBJ.star =  (list[k].PRODUCT_OBJ.star);
		}

		return result;

	}


	/** 浏览详细 */
	async viewProduct() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ProductService();
		let product = await service.viewProduct(input.id);

		if (product) {
			// 显示转换 
			product.PRODUCT_ADD_TIME = timeUtil.timestamp2Time(product.PRODUCT_ADD_TIME, 'Y-M-D');
		}

		return product;
	}

}

module.exports = ProductController;