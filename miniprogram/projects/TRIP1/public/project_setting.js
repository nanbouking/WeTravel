module.exports = {
	PROJECT_COLOR: '#00C176',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#00C176',

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '景区概况', key: 'SETUP_CONTENT_ABOUT' },
		{ title: '公交信息', key: 'SETUP_CONTENT_BUS' },
		{ title: '停车场', key: 'SETUP_CONTENT_PARKING' },
		{ title: '找厕所', key: 'SETUP_CONTENT_TOLIET' },
		{ title: '星级旅行社', key: 'SETUP_CONTENT_LXS' },
		{ title: '星级导游', key: 'SETUP_CONTENT_DY' },
		{ title: '一周天气', key: 'SETUP_CONTENT_WEATHER' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
		{ mark: 'area', title: '所在地区', type: 'area' }
	],


	NEWS_NAME: '内容',
	NEWS_CATE: [
		{ id: 1, title: '景区动态', style: 'upimg' },
		{ id: 2, title: '美食', style: 'leftbig1' },
		{ id: 3, title: '特产', style: 'leftbig3' },
	],

	// ### 预约相关  
	MEET_NAME: '预约',
	MEET_TYPE: [
		{ id: 1, title: '景点预约', style: 'leftbig2' },
		{ id: 2, title: '停车预约', style: 'leftbig3' }
	],
	MEET_CAN_NULL_TIME: false, // 是否允许有无时段的日期保存和展示   

	MEET_JOIN_FIELDS: [
		{ mark: 'name', type: 'text', title: '姓名', must: true, max: 30 },
		{ mark: 'phone', type: 'mobile', title: '手机', must: true }
	],

	ALBUM_NAME: '攻略',
	ALBUM_CATE: [
		{ id: 1, title: '线路' },
		{ id: 2, title: '吃喝' },
		{ id: 3, title: '住宿' },
		{ id: 4, title: '购物' },
		{ id: 5, title: '其他' },
	],
	ALBUM_FIELDS: [
		{ mark: 'cover', title: '封面图片', type: 'image', min: 1, max: 1, must: true },
		{ mark: 'desc', title: '简介', type: 'textarea', max: 100, must: true },
		{ mark: 'detail', title: '详细介绍', type: 'content', must: true },
	],

	PRODUCT_NAME: '景点',
	PRODUCT_CATE: [
		{ id: 1, title: '仙山贡水' },
		{ id: 2, title: '伍家台' },
		{ id: 3, title: '狮子关' },
		{ id: 4, title: '其他景点' }
	],
	PRODUCT_FIELDS: [
		{ mark: 'cover', title: '封面图片', type: 'image', min: 1, max: 1, must: true },
		{ mark: 'star', title: '推荐指数(星级)', type: 'select', selectOptions: ['1', '2', '3', '4', '5'], def: 1, must: true },
		{ mark: 'time', title: '开放时间', type: 'textarea', must: false },
		{ mark: 'address', title: '地址', type: 'textarea', must: false },
		{ mark: 'desc', title: '简介', type: 'textarea', max: 10000, must: true },
		{ mark: 'traffic', title: '交通攻略', type: 'textarea', max: 500, must: false },
		{ mark: 'ticket', title: '门票攻略', type: 'textarea', max: 500, must: false },
		{ mark: 'other', title: '其他信息', type: 'textarea', max: 10000, must: false },
		{ mark: 'album', title: '景点图集', type: 'image', min: 1, max: 10, must: true },
	],
}