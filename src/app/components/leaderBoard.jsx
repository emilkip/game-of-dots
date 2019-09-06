import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as GameApi from '../services/gameApi';
import '@styles/leader-board.scss';


export default function LeaderBoard() {
	const winners = useSelector(state => state.leaderBoard.winners);
	const dispatch = useDispatch();

	useEffect(() => {
		async function getWinners() {
			await GameApi.getWinners(dispatch);
		}

		getWinners();
	}, []);

	return (
		<div className="leader-board">
			<h1>Leader board</h1>

			<ul>
				{winners.map(item => (
					<li key={item.id}>
						<span>{item.winner}</span>
						<span>{item.date}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
