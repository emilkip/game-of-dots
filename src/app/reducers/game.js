import { handleActions } from 'redux-actions';
import actionTypes from '../config/actionTypes';

const gameDefault = {
	user: '',
	status: 'wait',
	mode: 'normalMode',
	settings: {},
	error: null
};

export default handleActions(
	{
		[actionTypes.GAME.START](state, action) {
			return {
				...state,
				user: action.payload.username,
				mode: action.payload.mode,
				status: 'started'
			};
		},
		[actionTypes.GAME.SET_STATUS](state, action) {
			return {
				...state,
				status: action.payload
			};
		},
		[actionTypes.GAME.RESET](state) {
			return {
				...state,
				status: 'reset'
			};
		},
		[actionTypes.GAME.SET_SETTINGS](state, action) {
			return {
				...state,
				settings: action.payload
			};
		},
		[actionTypes.GAME.SET_ERROR](state, action) {
			return {
				...state,
				error: action.payload
			};
		}
	},
	gameDefault
);

