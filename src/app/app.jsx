import React from 'react';
import {useSelector} from 'react-redux';
import GameSettings from '@components/gameSettings';
import LeaderBoard from '@components/leaderBoard';
import GameBoard from '@components/gameBoard';
import '@styles/style.scss';


export default function App() {
	const error = useSelector(state => state.game.error);

	return (
		<div className="game-container">
			<div className="game-container__game-field">
				<GameSettings />
				<GameBoard />

				{error && (
					<div className="game-container__error">{error}</div>
				)}
			</div>
			<div className="game-container__leader-board">
				<LeaderBoard />
			</div>
		</div>
	);
}
