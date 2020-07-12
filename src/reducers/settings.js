import { SETTINGS } from '../constants/action_types';

const INIT_STATE = {
	settings: undefined
};

export const settingsReducer = (state = INIT_STATE, action) => {
	switch(action.type){
		case SETTINGS:
			return action.payload;
		default:
			return state;
	}
};