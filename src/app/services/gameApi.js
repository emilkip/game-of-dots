import axios from 'axios';
import {format} from 'date-fns';
import actionTypes from '../config/actionTypes';

const API_URL = 'http://starnavi-frontend-test-task.herokuapp.com';

export async function getSettings(dispatch) {
	try {
		const response = await axios.get(`${API_URL}/game-settings`);

		dispatch({
			type: actionTypes.GAME.SET_SETTINGS,
			payload: response.data
		});

		return response.data;
	} catch (err) {
		dispatch({ type: actionTypes.GAME.SET_ERROR, payload: err.message || err });
		console.log(err);
	}
}


export async function getWinners(dispatch) {
	try {
		const response = await axios.get(`${API_URL}/winners`);

		dispatch({
			type: actionTypes.LEADER_BOARD.SET_ALL,
			payload: response.data
		});

		return response.data;
	} catch (err) {
		dispatch({ type: actionTypes.GAME.SET_ERROR, payload: err.message || err });
		console.log(err);
	}
}


export async function setWinner(dispatch, { winner = '', date = new Date() }) {
	const formattedDate = format(date, 'H:mm; dd LLLL yyyy');

	try {
		const response = await axios.post(`${API_URL}/winners`, { winner, date: formattedDate });

		dispatch({
			type: actionTypes.LEADER_BOARD.SET_ALL,
			payload: response.data
		});

		return response.data;
	} catch (err) {
		dispatch({ type: actionTypes.GAME.SET_ERROR, payload: err.message || err });
		console.log(err);
	}
}
