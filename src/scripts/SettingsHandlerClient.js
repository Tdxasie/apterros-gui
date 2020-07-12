import { ipcRenderer } from 'electron';
import { SETTINGS } from '../constants/action_types';

const SETTINGS_ANSWER = 'SETTINGS_ANSWER';
const SETTINGS_REQUEST = 'SETTINGS_REQUEST';
const SETTINGS_REQUEST_SYNC = 'SETTINGS_REQUEST_SYNC';

export default class SettingsHandlerClient {
	constructor(_store){
		this.store = _store;
		this.prevState = undefined;
	}

	init() {
		// make a sync call first then handle the other requests asynchronously
		this.store.dispatch({
			type: SETTINGS,
			payload: ipcRenderer.sendSync(SETTINGS_REQUEST_SYNC, undefined)
		});
        
		ipcRenderer.on(SETTINGS_ANSWER, (event, arg) => {
			this.prevState = arg;
			this.store.dispatch({
				type: SETTINGS,
				payload: arg
			});
		});
        
		this.store.subscribe(() => {
			const state = this.store.getState().settingsReducer;
			if (state !== this.prevState){
				ipcRenderer.send(SETTINGS_REQUEST, state);
			}
		});
	}
}