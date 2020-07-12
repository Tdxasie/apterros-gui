import { SETTINGS } from '../constants/action_types';

export const updateSettings = (payload) => {
	return {
		type: SETTINGS,
		payload
	};
};