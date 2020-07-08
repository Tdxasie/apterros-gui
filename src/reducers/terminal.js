import { FOCUSCHANGED, TERMQUAKED } from '../constants/action_types';

const INIT_STATE_FOCUS = {
	isFocused: false
};

export const focusTerminalReducer = (state = INIT_STATE_FOCUS, action) => {
	switch(action.type){
		case FOCUSCHANGED:
			return {...state, isFocused: action.isFocused};
		default:
			return state;
	}
};

const INIT_STATE_OPEN = {
	isOpen: false
};

export const openTerminalReducer = (state = INIT_STATE_OPEN, action) => {
	switch(action.type){
		case TERMQUAKED:
			return {...state, isOpen: action.isOpen};
		default:
			return state;
	}
};

