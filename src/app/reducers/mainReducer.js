import { combineReducers } from 'redux';
import leaderBoard from './leaderBoard';
import game from './game';


export default combineReducers({
	leaderBoard,
	game
});
