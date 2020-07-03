import { FOCUSCHANGED, TERMQUAKED } from '../constants/action_types';

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