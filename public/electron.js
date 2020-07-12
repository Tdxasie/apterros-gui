const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const SettingsHandlerServer = require('../src/scripts/SettingsHandlerServer');


const settings_path = '../../settings/settings.json';

const SettingsHandler = new SettingsHandlerServer(settings_path);

SettingsHandler.init();

function createWindow () {
	// Create the browser window.
	const win = new BrowserWindow({
		frame: false,
		width: 800,
		height: 800,
		webPreferences: {
			nodeIntegration: true
		}
	});
    
	// win.setAutoHideMenuBar(true);
	// win.setMenu(null);
    
	// and load the index.html of the app.
	//   win.loadFile('index.html')
	win.loadURL(
		isDev ? 
			'http://localhost:3000' :
			`file://${path.join(__dirname, '../build/index.html')}`
	);

	// Open the DevTools.
	win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
