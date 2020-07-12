import { combineReducers } from 'redux';

import { focusTerminalReducer, openTerminalReducer } from './terminal';
import { mqttDataReducer, mqttStatusReducer, mqttPublishReducer }from './mqtt';
import { settingsReducer } from './settings';

const allReducers = combineReducers({
	focusTerminalReducer,
	openTerminalReducer,
	mqttDataReducer,
	mqttStatusReducer,
	mqttPublishReducer,
	settingsReducer
});

export default allReducers;