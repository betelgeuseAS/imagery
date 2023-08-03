import { app, screen, BrowserWindow } from 'electron'

import { Main } from './scripts'

Main.main(app, screen, BrowserWindow)
