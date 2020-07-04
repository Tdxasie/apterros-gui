import { combineReducers } from 'redux';

import { focusTerminalReducer, openTerminalReducer } from './terminal';
import mqttDataReducer from './mqtt';

const allReducers = combineReducers({
	focusTerminalReducer,
	openTerminalReducer,
	mqttDataReducer
});

export default allReducers;