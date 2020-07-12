const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const SETTINGS_ANSWER = 'SETTINGS_ANSWER';
const SETTINGS_REQUEST = 'SETTINGS_REQUEST';
const SETTINGS_REQUEST_SYNC = 'SETTINGS_REQUEST_SYNC';


module.exports =  class SettinsHandlerServer {
	constructor(_path) {
		this.path = path.join(__dirname, _path);
		this.settings = JSON.parse(fs.readFileSync(this.path, {encoding: 'utf-8'}));
	}

	init() {
		ipcMain.on(SETTINGS_REQUEST_SYNC, (event, arg) => {
			event.returnValue = this.settings;
		});

		ipcMain.on(SETTINGS_REQUEST, (event, arg) => {
			console.log(arg);
			if(arg !== undefined){
				this.settings = arg;
				fs.writeFile(this.path, JSON.stringify(arg, null, 4), (err) => {
					if (err) throw err;
					console.log('Settings updated');
				});
			}
			event.reply(SETTINGS_ANSWER, this.settings);
		});       
	}
};