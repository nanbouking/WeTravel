/**
 * Notes: 相册模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-07 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const AlbumModel = require('../model/album_model.js');

class AlbumService extends BaseProjectService {

	/** 浏览资讯信息 */
	async viewAlbum(id) {

		let fields = '*';

		let where = {
			_id: id,
			ALBUM_STATUS: AlbumModel.STATUS.COMM
		}
		let album = await AlbumModel.getOne(where, fields);
		if (!album) return null; 

		AlbumModel.inc(id, 'ALBUM_VIEW_CNT', 1);

		return album;
	}


	/** 取得分页列表 */
	async getAlbumList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'ALBUM_ORDER': 'asc',
			'ALBUM_ADD_TIME': 'desc'
		};
		let fields = 'ALBUM_OBJ,ALBUM_VIEW_CNT,ALBUM_TITLE,ALBUM_CATE_ID,ALBUM_ADD_TIME,ALBUM_ORDER,ALBUM_STATUS,ALBUM_CATE_NAME';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		where.and.ALBUM_STATUS = AlbumModel.STATUS.COMM; // 状态  


		if (util.isDefined(search) && search) {
			where.or = [
				{ ALBUM_TITLE: ['like', search] },
			];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					if (sortVal) where.and.ALBUM_CATE_ID = String(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'ALBUM_ADD_TIME');
					break;
				}
			}
		}

		return await AlbumModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}


}

module.exports = AlbumService;