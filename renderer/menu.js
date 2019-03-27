//Modules
const { remote, shell } = require('electron')

// Menu template object
const template = [
    {
        label: 'Items',
        submenu: [
            {
                label: 'Add New',
                accelerator: 'Ctrl+O',
                click() {
                    $('.open-add-modal').click()
                }
            },
            {
                label: 'Read Item',
                accelerator: 'Ctrl+Enter',
                click() {
                    window.openItem()
                }
            },
            {
                label: 'Delete Item',
                accelerator: 'Ctrl+Backspace',
                click() {
                    window.deleteItem()
                }
            },
            {
                label: 'Open in Browser',
                accelerator: 'Ctrl+Shift+Enter',
                click() {
                    window.openInBrowser()
                }
            }, {
                type: 'separator'
            },
            {
                label: 'Search Items',
                accelerator: 'Ctrl+F',
                click() {
                    $('#search').focus()
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }

        ]
    },
    {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { shell.openExternal('https://electronjs.org/') }
            }
        ]
    }
]

// Add menu to app
const menu = remote.Menu.buildFromTemplate(template)
remote.Menu.setApplicationMenu(menu)