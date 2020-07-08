import { combineReducers } from 'redux';

import { focusTerminalReducer, openTerminalReducer } from './terminal';
import { mqttDataReducer, mqttStatusReducer, mqttPublishReducer }from './mqtt';

const allReducers = combineReducers({
	focusTerminalReducer,
	openTerminalReducer,
	mqttDataReducer,
	mqttStatusReducer,
	mqttPublishReducer
});

export default allReducers;