import { BrowserWindow } from 'electron'

import * as path from 'path'
import * as url from 'url'

require('dotenv').config()

import { CLIENT } from '../constants'

export class Main {
  static mainWindow: Electron.BrowserWindow
  static application: Electron.App
  static screen: Electron.Screen

  static browserWindow

  static serve: boolean

  private static createWindow() {
    const screenSize = Main.screen.getPrimaryDisplay().workAreaSize

    Main.mainWindow = new Main.browserWindow({
      x: 0,
      y: 0,
      width: screenSize.width,
      height: screenSize.height,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: Main.serve
      }
    })

    if (Main.serve) {
      Main.mainWindow.loadURL(process.env.ELECTRON_START_URL)
      Main.mainWindow.webContents.openDevTools()
    } else {
      Main.mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, CLIENT.PATH_TO_BUILD_CLIENT),
          protocol: 'file:',
          slashes: true
        })
      )
    }

    Main.mainWindow.on('closed', Main.onClose)
  }

  private static onClose() {
    Main.mainWindow = null
  }

  private static onReady() {
    Main.createWindow()
  }

  private static onActivate() {
    if (Main.mainWindow === null) {
      Main.createWindow()
    }
  }

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.application.quit()
    }
  }

  static main(app: Electron.App, screen: Electron.Screen, browserWindow: typeof BrowserWindow) {
    const args = process.argv.slice(1)

    Main.serve = args.some((value: string) => value === '--serve')

    Main.browserWindow = browserWindow
    Main.screen = screen

    Main.application = app
    Main.application.on('ready', Main.onReady)
    Main.application.on('activate', Main.onActivate)
    Main.application.on('window-all-closed', Main.onWindowAllClosed)
  }
}
