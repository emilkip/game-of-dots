import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actionTypes from '../config/actionTypes';
import * as gameApi from '../services/gameApi';
import '@styles/game-board.scss';


export default function GameBoard() {
	const dispatch = useDispatch();
	const mode = useSelector(state => state.game.mode);
	const gameStatus = useSelector(state => state.game.status);
	const user = useSelector(state => state.game.user);
	const settings = useSelector(state => state.game.settings);

	const [gameBoard, setBoard] = useState([]);
	const [currentMode, setMode] = useState(mode);
	const [timer, setTimer] = useState(null);
	const [currentDot, setCurrentDot] = useState({});
	const [score, setScore] = useState({ computer: 0, user: 0 });

	const gameBoardRef = useRef(gameBoard);
	const currentDotRef = useRef(currentDot);
	const scoreRef = useRef(score);

	const currentSetting = settings[mode];
	gameBoardRef.current = gameBoard;
	currentDotRef.current = currentDot;
	scoreRef.current = score;


	useEffect(() => {
		if (gameStatus === 'started') {
			const initialBoard = generateBoard(currentSetting.field);
			resetScore();

			setBoard(Array.from(initialBoard));
			createNewDot(initialBoard);
			dispatch({ type: actionTypes.GAME.SET_STATUS, payload: 'play' });
		}
		if (gameStatus === 'ended') {
			const winner = score.computer > score.user ? 'Computer' : (user || 'User');
			gameApi.setWinner(dispatch, { winner });
		}
	}, [gameStatus]);

	useEffect(() => {
		if (currentMode !== mode) {
			setMode(mode);
		}
	}, [mode]);

	const generateBoard = (size = 5) => Array(size).fill([]).map(() => Array(size).fill(0));

	const generateRandomDot = (boardSize = 5) => ({
		row: Math.floor(Math.random() * boardSize),
		cell: Math.floor(Math.random() * boardSize)
	});

	const clearTimer = () => {
		clearTimeout(timer);
		setTimer(null);
	};

	const resetScore = () => {
		setScore({ computer: 0, user: 0 });
		scoreRef.current = { computer: 0, user: 0 };
	};

	const addScore = side => {
		scoreRef.current[side] += 1;
		setScore(scoreRef.current);
	};

	const createNewDot = (board) => {
		const scoreToWin = Math.floor((currentSetting.field * currentSetting.field) / 2);
		let dot;

		if (timer) clearTimer();

		if (scoreRef.current.user === scoreToWin || scoreRef.current.computer === scoreToWin) {
			dispatch({ type: actionTypes.GAME.SET_STATUS, payload: 'ended' });
			clearTimer();
			return;
		}

		while (!dot) {
			const newDot = generateRandomDot(currentSetting.field);

			if (!board[newDot.row][newDot.cell]) {
				dot = newDot;
			}
		}

		board[dot.row][dot.cell] = 1;
		setCurrentDot({ row: dot.row, cell: dot.cell });
		setBoard(Array.from(board));

		const newTimer = setTimeout(timerHandler, currentSetting.delay);
		setTimer(newTimer);
	};

	const timerHandler = () => {
		gameBoardRef.current[currentDotRef.current.row][currentDotRef.current.cell] = 3;
		setBoard(gameBoardRef.current);
		addScore('computer');
		createNewDot(gameBoardRef.current);
	};

	const onCellClick = (row, cell) => {
		const isCorrectDot = currentDot.row === row && currentDot.cell === cell;

		if (timer && isCorrectDot) {
			gameBoard[row][cell] = 2;
			setBoard(Array.from(gameBoard));
			addScore('user');
			createNewDot(gameBoard);
		}
	};

	const renderBoard = () => {
		const cellStatuses = ['empty', 'current', 'success', 'fail'];

		return gameBoard.map((row, rowIndex) => (
			<div key={`row-${rowIndex}`} className="game-board__board-row">
				{row.map((cell, cellIndex) => (
					<div key={`cell-${cellIndex}`}
							 className={`game-board__board-cell game-board__board-cell--${cellStatuses[cell]}`}
							 onClick={() => onCellClick(rowIndex, cellIndex)}>
					</div>
				))}
			</div>
		));
	};

	return (
		<div className="game-board">
			<div className="game-board__message">
				{gameStatus === 'ended' && (
					<span>{score.computer > score.user ? 'Computer' : (user || 'User')} won!</span>
				)}
			</div>
			<div className="game-board__score">
				<span>Computer</span> {score.computer} : {score.user} <span>{user || 'User'}</span>
			</div>
			<div className={`game-board__board ${gameStatus === 'ended' ? 'game-board__board--disabled' : ''}`}>
				{(currentSetting && gameBoard.length !== 0) && renderBoard()}
			</div>
		</div>
	);
}
