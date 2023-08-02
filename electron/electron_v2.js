const { app, screen, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');

require('dotenv').config();

// WARNING:
// Electron Security Warning (Node.js Integration with Remote Content):
// The core issue is that too many developers, especially newcomers to Electron, assume that
// using http:// with nodeIntegration enabled is okay. It's not - the warning is correct, that's
// a fairly severe security risk. The fact that a major boilerplate actually has that code in
// there concerns me (a newcomer could easily assume that they could just replace the whole line
// and point Electron at http://my-other-server.com).
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'; // Commit it into show warnings
// See (Do not enable Node.js Integration for Remote Content):
// https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content

const args = process.argv.slice(1);
const serve = args.some((value) => value === '--serve');

let window = null;

function createWindow() {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;

  window = new BrowserWindow({
    x: 0,
    y: 0,
    width: screenSize.width,
    height: screenSize.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
    },
  });

  if (serve) {
    window.loadURL(process.env.ELECTRON_START_URL);
    window.webContents.openDevTools();
  } else {
    window.loadURL(
      url.format({
        pathname: path.join(__dirname, `../client/build/index.html`),
        protocol: 'file:',
        slashes: true,
        icon: path.join(__dirname, '../client/build/favicon.png')
      })
    );
  }

  window.on('closed', () => {
    window = null;
  });
}

try {
  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (window === null) {
      createWindow();
    }
  });
} catch (error) {
  throw error;
}
