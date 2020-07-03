import { combineReducers } from 'redux';

import { focusTerminalReducer, openTerminalReducer } from './terminal';

const allReducers = combineReducers({
	focusTerminalReducer,
	openTerminalReducer
});

export default allReducers;