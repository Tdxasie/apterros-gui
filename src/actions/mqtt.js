import { NEWDATA } from '../constants/action_types';
import { MQTTSTATUS } from '../constants/action_types';
import { MQTTPUBLISH } from '../constants/action_types';

export const newMqttData = (payload) => {
	return {
		type: NEWDATA,
		payload
	};
};

export const newMqttStatus = (payload) => {
	return {
		type: MQTTSTATUS,
		payload
	};
};

export const newMqttPublish = (payload) => {
	return {
		type: MQTTPUBLISH,
		payload
	};
};