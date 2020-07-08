import { FOCUSCHANGED, TERMQUAKED } from '../constants/action_types';

// not formatted correctly, I was learning Redux okay ? 

export const changeFocus = (focus) => {
	return {
		type: FOCUSCHANGED,
		isFocused: focus
	};
};

export const controlTerminal = (open) => {
	return {
		type: TERMQUAKED,
		isOpen: open
	};
};