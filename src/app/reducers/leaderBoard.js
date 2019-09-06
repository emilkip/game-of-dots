import { handleActions } from 'redux-actions';
import actionTypes from '../config/actionTypes';

const leaderBoardDefault = {
	winners: []
};

export default handleActions(
	{
		[actionTypes.LEADER_BOARD.SET_ALL](state, action) {
			return {
				...state,
				winners: action.payload
			};
		}
	},
	leaderBoardDefault
);

