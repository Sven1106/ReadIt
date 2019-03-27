// Modules
const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')

// Enable logging
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

// Disable auto downloading
autoUpdater.autoDownload = false

// Check for updates
exports.check = () => {
    // Start update check
    autoUpdater.checkForUpdates()

    // Listen for download update found
    autoUpdater.on('update-available', () => {
        // Track progress percent
        let downloadProgress = 0

        // Prompt user to update
        dialog.showMessageBox({
            type: 'info',
            title: 'Update Available',
            message: 'A new version of Readit is available. Do you want to update now?',
            buttons: ['Update', 'No']
        }, (buttonIndex) => {
            // If not 'Update' button, return
            if (buttonIndex !== 0) {
                return
            }
            // else start download and show download progress in new window
            autoUpdater.downloadUpdate()
            // Track download progress on autoUpdater
            autoUpdater.on('download-progress', (d) => {
                downloadProgress = d.percent
                autoUpdater.logger.info(downloadProgress)
            })

        })
    })
}