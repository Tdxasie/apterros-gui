import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import allReducers from './reducers';
import { Provider } from 'react-redux';
import MQTTReceiver from './scripts/MQTTReceiver';
import SettingsHandlerClient from './scripts/SettingsHandlerClient';
const customTitlebar = require('custom-electron-titlebar');

new customTitlebar.Titlebar({
	backgroundColor: customTitlebar.Color.fromHex('#141414')
});

const store = createStore(allReducers);

const SettingsHandler = new SettingsHandlerClient(store);
SettingsHandler.init();

const mqtt = new MQTTReceiver(store);

mqtt.init();
mqtt.connect();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
