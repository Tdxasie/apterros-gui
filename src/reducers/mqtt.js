import { NEWDATA } from '../constants/action_types';
import { MQTTSTATUS } from '../constants/action_types';
import { MQTTPUBLISH } from '../constants/action_types';
import { WINDOW } from '../constants/settings';

const INIT_STATE_DATA = {
	data: [{
		x:0,
		y:0.5
	}]
};

export const mqttDataReducer = (state = INIT_STATE_DATA, action) => {
	switch(action.type){
		case NEWDATA:
			// console.log(state);
			if (state.data.length >= WINDOW){
				
				return {
					data: [...state.data.slice(state.data.length-WINDOW, state.data.length), action.payload]
				};
			}
			return {
				data: [...state.data, action.payload]
			};
		default:
			return state;
	}
};

const INIT_STATE_STATUS = {
	connection: false,
	receiving_data: false
};

export const mqttStatusReducer = (state = INIT_STATE_STATUS, action) => {
	switch(action.type){
		case MQTTSTATUS:
			return{...state,
				connection: action.payload.connection,
				receiving_data: action.payload.receiving_data
			};
		default:
			return state;
	}
};

const INIT_STATE_PUBLISH = {
	topic: undefined,
	message: undefined,
	done: true
};

export const mqttPublishReducer = (state = INIT_STATE_PUBLISH, action) => {
	switch (action.type) {
		case MQTTPUBLISH:
			return {
				...state,
				topic: action.payload.topic,
				message: action.payload.message,
				done: action.done
			};
		default:
			return state;
	}
};