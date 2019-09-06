import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../config/actionTypes';
import CustomSelect from '@components/customSelect';
import * as GameApi from '../services/gameApi';


export default function GameSettings() {
	const [username, setUsername] = useState('');
	const [mode, setMode] = useState('normalMode');
	const gameStatus = useSelector(state => state.game.status);
	const gameSettings = useSelector(state => state.game.settings);
	const dispatch = useDispatch();

	const labels = {
		'easyMode': 'Easy',
		'normalMode': 'Normal',
		'hardMode': 'Hard'
	};

	const modes = Object.keys(gameSettings);

	useEffect(() => {
		async function getSettings() {
			await GameApi.getSettings(dispatch);
		}
		getSettings();
	}, []);

	const onPlay = () => {
		dispatch({ type: actionTypes.GAME.START, payload: { username, mode } });
	};

	const handleUsername = event => {
		setUsername(event.target.value);
	};

	const onModeSelect = mode => {
		setMode(mode);
	};

	return (
		<div className="game-settings">
			<CustomSelect items={modes} labels={labels} defaultText="Pick game mode" onSelect={onModeSelect} />
			<div className="game-settings__name">
				<input type="text" onChange={handleUsername} placeholder="Enter your name" />
			</div>
			<button className="regular-btn" onClick={onPlay}>
				{['play', 'ended'].includes(gameStatus) ? 'PLAY AGAIN' : 'PLAY'}
			</button>
		</div>
	);
}
