/**
 * Notes: 业务基类 
 * Date: 2021-03-15 04:00:00 
 */

const dbUtil = require('../../../framework/database/db_util.js');
const util = require('../../../framework/utils/util.js');
const AdminModel = require('../../../framework/platform/model/admin_model.js');
const NewsModel = require('../model/news_model.js');
const MeetModel = require('../model/meet_model.js');
const AlbumModel = require('../model/album_model.js');
const ProductModel = require('../model/product_model.js');
const BaseService = require('../../../framework/platform/service/base_service.js');

class BaseProjectService extends BaseService {
	getProjectId() {
		return util.getProjectId();
	}

	async initSetup() {

		let F = (c) => 'bx_' + c;
		const INSTALL_CL = 'setup_trip1';
		const COLLECTIONS = ['setup', 'admin', 'day', 'join', 'log', 'meet', 'news', 'product', 'album', 'fav', 'user'];
		const CONST_PIC = '/images/cover.gif';

		const NEWS_CATE = '1=本景区动态,2=美食,3=特产';
		const MEET_TYPE = '1=景点预约,2=停车预约';
		const ALBUM_CATE = '1=线路,2=吃喝,3=住宿,4=购物,5=其他';
		const PRODUCT_CATE = '1=仙山贡水,2=伍家台,3=狮子关,4=其他景点';


		if (await dbUtil.isExistCollection(F(INSTALL_CL))) {
			return;
		}

		console.log('### initSetup...');

		let arr = COLLECTIONS;
		for (let k = 0; k < arr.length; k++) {
			if (!await dbUtil.isExistCollection(F(arr[k]))) {
				await dbUtil.createCollection(F(arr[k]));
			}
		}

		if (await dbUtil.isExistCollection(F('admin'))) {
			let adminCnt = await AdminModel.count({});
			if (adminCnt == 0) {
				let data = {};
				data.ADMIN_NAME = 'admin';
				data.ADMIN_PASSWORD = 'e10adc3949ba59abbe56e057f20f883e';
				data.ADMIN_DESC = '超管';
				data.ADMIN_TYPE = 1;
				await AdminModel.insert(data);
			}
		}


		if (await dbUtil.isExistCollection(F('news'))) {
			let newsCnt = await NewsModel.count({});
			if (newsCnt == 0) {
				let newsArr = NEWS_CATE.split(',');
				for (let j in newsArr) {
					let title = newsArr[j].split('=')[1];
					let cateId = newsArr[j].split('=')[0];

					let data = {};
					data.NEWS_TITLE = title + '标题1';
					data.NEWS_DESC = title + '简介1';
					data.NEWS_CATE_ID = cateId;
					data.NEWS_CATE_NAME = title;
					data.NEWS_CONTENT = [{ type: 'text', val: title + '内容1' }];
					data.NEWS_PIC = [CONST_PIC];

					await NewsModel.insert(data);
				}
			}
		}

		if (await dbUtil.isExistCollection(F('meet'))) {
			let meetCnt = await MeetModel.count({});
			if (meetCnt == 0) {
				let meetArr = MEET_TYPE.split(',');
				for (let j in meetArr) {
					let title = meetArr[j].split('=')[1];
					let typeId = meetArr[j].split('=')[0];

					let data = {};
					data.MEET_TITLE = title + '标题1';
					data.MEET_STYLE_SET = {
						desc: title + '简介1',
						pic: CONST_PIC
					};
					data.MEET_ADMIN_ID = '1';
					data.MEET_TYPE_ID = typeId;
					data.MEET_TYPE_NAME = title;
					data.MEET_CONTENT = [{ type: 'text', val: title + '内容1' }];
					data.MEET_DAYS = [];
					data.MEET_FORM_SET = [
						{ type: 'text', title: '姓名', must: true },
						{ type: 'mobile', title: '手机', must: true }
					];

					await MeetModel.insert(data);
				}
			}
		}

		if (await dbUtil.isExistCollection(F('album'))) {
			let albumCnt = await AlbumModel.count({});
			if (albumCnt == 0) {
				let albumArr = ALBUM_CATE.split(',');
				for (let j in albumArr) {
					let title = albumArr[j].split('=')[1];
					let cateId = albumArr[j].split('=')[0];

					let data = {};
					data.ALBUM_TITLE = title + '标题1';
					data.ALBUM_CATE_ID = cateId;
					data.ALBUM_CATE_NAME = title;
					data.ALBUM_OBJ = { cover: [CONST_PIC], detail: [{ type: 'text', val: title + '内容1' }] };
					await AlbumModel.insert(data);
				}
			}

		}

		if (await dbUtil.isExistCollection(F('product'))) {
			let productCnt = await ProductModel.count({});
			if (productCnt == 0) {
				let productArr = PRODUCT_CATE.split(',');
				for (let j in productArr) {
					let title = productArr[j].split('=')[1];
					let cateId = productArr[j].split('=')[0];

					let data = {};
					data.PRODUCT_TITLE = title + '标题1';
					data.PRODUCT_CATE_ID = cateId;
					data.PRODUCT_CATE_NAME = title;
					data.PRODUCT_OBJ = { cover: [CONST_PIC], price: 1999, origPrice: 999, adv: '产品亮点', album: [CONST_PIC] };
					await ProductModel.insert(data);
				}
			}
		}

		if (!await dbUtil.isExistCollection(F(INSTALL_CL))) {
			await dbUtil.createCollection(F(INSTALL_CL));
		}
	}

}

module.exports = BaseProjectService;