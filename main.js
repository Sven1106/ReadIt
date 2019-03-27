// Modules to control application life and create native browser window
const { app, ipcMain } = require('electron')
const mainWindow = require('./mainWindow')
const readItem = require('./readItem')

//Listen for new read item
ipcMain.on('new-item', (e, itemUrl) => {


  // Get read item width readItem Module
  readItem(itemUrl, (item) => {
    // Send to renderer
      e.sender.send('new-item-success', item)
  });
})

// HardwareAcceleration causes ERROR :GL_INVALID_OPERATION : glCreateAndConsumeTextureCHROMIUM: invalid mailbox name
app.disableHardwareAcceleration()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', mainWindow.createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    mainWindow.createWindow()
  }
})
