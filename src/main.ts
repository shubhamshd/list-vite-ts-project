import './css/style.css'
import ListItem from './model/ListItem'
import FullList from './model/FullList'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  const itemEntryform = document.getElementById('itemEntryForm') as HTMLFormElement
  itemEntryform.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault()

    const input = document.getElementById('newItem') as HTMLInputElement
    const newEntryText = input.value.trim()
    console.log(`newEntry Text is ${newEntryText}`)
    if(!newEntryText) return

    console.log('its not empty')
    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1

    const newItem = new ListItem(itemId.toString(), newEntryText)
    fullList.addItem(newItem)
    template.render(fullList)
    console.log('template rendered')
  })

  const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement
  clearItems.addEventListener('click', () => {
    fullList.clearList()
    template.clear()
  })

  fullList.load()
  template.render(fullList)
}

// following thing could be done in the html file also by using defer keyword inside script tag
document.addEventListener('DOMContentLoaded', initApp)