/**
 * Notes: 相册模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-07 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const AlbumService = require('../service/album_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class AlbumController extends BaseProjectController { 

	/** 列表 */
	async getAlbumList() {

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

		let service = new AlbumService();
		let result = await service.getAlbumList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].ALBUM_ADD_TIME = timeUtil.timestamp2Time(list[k].ALBUM_ADD_TIME, 'Y-M-D');

			if (list[k].ALBUM_OBJ && list[k].ALBUM_OBJ.detail)
			delete list[k].ALBUM_OBJ.detail;
		} 

		return result;

	}


	/** 浏览详细 */
	async viewAlbum() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AlbumService();
		let album = await service.viewAlbum(input.id);

		if (album) {
			// 显示转换 
			album.ALBUM_ADD_TIME = timeUtil.timestamp2Time(album.ALBUM_ADD_TIME, 'Y-M-D');
		}

		return album;
	} 

}

module.exports = AlbumController;