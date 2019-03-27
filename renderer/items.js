// Track items with array
exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || []

// Save items to localstorage
exports.saveItems = () => {
    localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

// Toggle item as selected
exports.selectItem = (e) => {
    $('.read-item').removeClass('is-active')
    $(e.currentTarget).addClass('is-active')
}

// Select next/prev item
exports.changeItem = (direction) => {
    // Get current active item
    let activeItem = $('.read-item.is-active')

    // Check direction and get next or previous item

    let newitem = (direction === 'down') ? activeItem.next('.read-item') : activeItem.prev('.read-item')

    // Only if item exists, make selection change
    if (newitem.length) {
        activeItem.removeClass('is-active')
        newitem.addClass('is-active')
    }

}


// Window function
// Delete item by index
window.deleteItem = (i = false) => {

    // Set i to active item if not passed as argument
    if (i === false) {
        i = ($('.read-item.is-active').index() - 1)
    }

    // Remove item from DOM
    $('.read-item').eq(i).remove()

    // Remove item from localstorage
    this.toreadItems = this.toreadItems.filter((item, index) => {
        return index !== i
    })

    // Update storage
    this.saveItems()

    // Select prev items
    if (this.toreadItems.length) {
        // If first was deleted, select new first item
        let newIndex = (i === 0) ? 0 : i - 1

        // Assign active class to new index
        $('.read-item').eq(newIndex).addClass('is-active')
    }
    else { // show no item if empty
        $('#no-items').show()
    }
}


// Open item in default browser
window.openInBrowser = () => {
    // Only if items have been added
    if (!this.toreadItems.length) {
        return
    }

    // Get current active item
    let activeItem = $('.read-item.is-active')

    // Open in browser
    require('electron').shell.openExternal(activeItem.data('url'))
}


// Open item for reading
window.openItem = () => {

    // Only if items have been added
    if (!this.toreadItems.length) {
        return
    }

    // Get current active item
    let activeItem = $('.read-item.is-active')

    // Get item's content url (encoded)
    let contentURL = encodeURIComponent(activeItem.data('url'))

    // Get item index to pass to proxy window
    let itemIndex = activeItem.index() - 1

    // Reader window URL
    let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}&itemIndex=${itemIndex}`


    // Open item in new proxy BrowserWindow
    window.open(readerWinURL, activeItem.data('title'))
}

// Add new item
exports.addItem = (item) => {

    // Hide 'no items' message
    $('#no-items').hide()

    // New item html
    let itemHtml = `<a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
                        <figure class="image has-shadow is-64x64 thumb">
                            <img src="${item.screenshot}">
                        </figure>
                        <h2 class="title is-4 column">${item.title}</h2>
                        </a>`
    // Append to read-list
    $('#read-list').append(itemHtml)

    // Attach select event handler
    $('.read-item')
        .off('click, dblclick')
        .on('click', this.selectItem)
        .on('dblclick', window.openItem)
}