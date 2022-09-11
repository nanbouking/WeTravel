/**
 * Notes: 测试模块控制器
 * Date: 2021-03-15 19:20:00 
 */

const BaseController = require('../../controller/base_project_controller.js');
const fakerLib = require('../../../../framework/lib/faker_lib.js');

const VoteModel = require('../../model/vote_model.js');
const VoteJoinModel = require('../../model/vote_join_model.js');
const VoteService = require('../../service/vote_service.js');

const EnrollModel = require('../../model/enroll_model.js');
const EnrollJoinModel = require('../../model/enroll_join_model.js');

const ActivityModel = require('../../model/activity_model.js');
const ActivityJoinModel = require('../../model/activity_join_model.js');

class TestController extends BaseController {

	async test() {
		console.log('TEST>>>>>>>');

		//this.mockEnrollJoin();
		//this.mockActivityJoin();
		this.mockVoteJoin();

	}

	async mockEnrollJoin() {
		console.log('mockEnrollJoin >>>>>>> Begin....');
		let ENROLL_ID = 'b69f67c062d7d46b0bc4d2985c084775';

		let enroll = await EnrollModel.getOne(ENROLL_ID);
		if (!enroll) return console.error('no enroll');

		let join = {};
		join.ENROLL_JOIN_ENROLL_ID = ENROLL_ID;
		join.ENROLL_JOIN_STATUS = 1;

		console.log('>>>>delete');
		let delCnt = await EnrollJoinModel.del({ ENROLL_JOIN_ENROLL_ID: ENROLL_ID });
		console.log('>>>>delete=' + delCnt);

		for (let k = 1; k <= 10; k++) {
			console.log('>>>>insert >' + k);
			join.ENROLL_JOIN_USER_ID = fakerLib.getUuid();

			join.ENROLL_JOIN_LAST_TIME = fakerLib.getAddTimestamp();
			join.ENROLL_JOIN_ADD_TIME = fakerLib.getAddTimestamp();

			join.ENROLL_JOIN_FORMS = [
				{ mark: 'name', title: '姓名', type: 'text', val: fakerLib.getName() },
				{ mark: 'phone', title: '手机', type: 'mobile', val: fakerLib.getMobile() }
			];

			await EnrollJoinModel.insert(join);
		}

		console.log('>>>> STAT');
		let cnt = await EnrollJoinModel.count({
			ENROLL_JOIN_ENROLL_ID: ENROLL_ID
		});

		await EnrollModel.edit(ENROLL_ID, { ENROLL_JOIN_CNT: cnt, ENROLL_MAX_CNT: cnt + 10 });

		console.log('mockEnrollJoin >>>>>>> END');
	}

	async mockActivityJoin() {
		console.log('mockActivityJoin >>>>>>> Begin....');
		let ACTIVITY_ID = '0a4ec1f962d867481158b94f6441f613';

		let activity = await ActivityModel.getOne(ACTIVITY_ID);
		if (!activity) return console.error('no activity');

		let join = {};
		join.ACTIVITY_JOIN_ACTIVITY_ID = ACTIVITY_ID;
		join.ACTIVITY_JOIN_STATUS = 1;

		console.log('>>>>delete');
		let delCnt = await ActivityJoinModel.del({ ACTIVITY_JOIN_ACTIVITY_ID: ACTIVITY_ID });
		console.log('>>>>delete=' + delCnt);

		for (let k = 1; k <= 10; k++) {
			console.log('>>>>insert >' + k);
			join.ACTIVITY_JOIN_USER_ID = fakerLib.getUuid();

			join.ACTIVITY_JOIN_CODE = fakerLib.getStr(15);
			join.ACTIVITY_JOIN_ADD_TIME = fakerLib.getAddTimestamp();

			join.ACTIVITY_JOIN_FORMS = [
				{ mark: 'name', title: '姓名', type: 'text', val: fakerLib.getName() },
				{ mark: 'phone', title: '手机', type: 'mobile', val: fakerLib.getMobile() }
			];

			await ActivityJoinModel.insert(join);
		}

		console.log('>>>> STAT');
		let cnt = await ActivityJoinModel.count({
			ACTIVITY_JOIN_ACTIVITY_ID: ACTIVITY_ID
		});

		await ActivityModel.edit(ACTIVITY_ID, { ACTIVITY_JOIN_CNT: cnt, ACTIVITY_MAX_CNT: cnt + 10 });

		console.log('mockActivityJoin >>>>>>> END');
	}


	async mockVoteJoin() {
		console.log('mockVoteJoin >>>>>>> Begin....');
		let VOTE_ID = 'b69f67c062c3a2b209da6ef133c9d874';

		let vote = await VoteModel.getOne(VOTE_ID);
		if (!vote) return console.error('no vote');

		let join = {};
		join.VOTE_JOIN_VOTE_ID = VOTE_ID;

		console.log('>>>>delete');
		let delCnt = await VoteJoinModel.del({ VOTE_JOIN_VOTE_ID: VOTE_ID });
		console.log('>>>>delete=' + delCnt);


		for (let k = 1; k <= 10; k++) {
			console.log('>>>>insert >' + k);
			join.VOTE_JOIN_USER_ID = fakerLib.getUuid(); 
			join.VOTE_JOIN_ADD_TIME = fakerLib.getAddTimestamp();

			
			join.VOTE_JOIN_CNT = 1;
			join.VOTE_JOIN_SELECTED = [k % vote.VOTE_ITEM.length];

			await VoteJoinModel.insert(join);
		}

		console.log('>>>> STAT');
		let service = new VoteService();
		service.statVoteItem(VOTE_ID);

		console.log('mockVoteJoin >>>>>>> END');
	}
}

module.exports = TestController;