import { NEWDATA } from '../constants/action_types';

const INIT_STATE = {
	payload: null
};

const mqttDataReducer = (state = INIT_STATE, action) => {
	switch(action.type){
		case NEWDATA:
			console.log(action.payload);
			return {...state, payload: action.payload};
		default:
			return state;
	}
};

export default mqttDataReducer;