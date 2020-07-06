import { NEWDATA } from '../constants/action_types';

const INIT_STATE = [{
	x:0,
	y:0.5
}];

const mqttDataReducer = (state = INIT_STATE, action) => {
	switch(action.type){
		case NEWDATA:
			// console.log(state);
			return [...state, action.payload];
		default:
			return state;
	}
};

export default mqttDataReducer;