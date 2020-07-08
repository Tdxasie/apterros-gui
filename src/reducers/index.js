import { combineReducers } from 'redux';

import { focusTerminalReducer, openTerminalReducer } from './terminal';
import { mqttDataReducer, mqttStatusReducer }from './mqtt';

const allReducers = combineReducers({
	focusTerminalReducer,
	openTerminalReducer,
	mqttDataReducer,
	mqttStatusReducer
});

export default allReducers;