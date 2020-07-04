import { NEWDATA } from '../constants/action_types';

export const newMqttData = (payload) => {
	return {
		type: NEWDATA,
		payload
	};
};