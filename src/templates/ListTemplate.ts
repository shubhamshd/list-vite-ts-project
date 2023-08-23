import FullList from "../model/FullList";

interface DomList {
  ul: HTMLUListElement,
  clear(): void,
  render(fullList: FullList): void
}

export default class ListTemplate implements DomList {
  
  static instance: ListTemplate = new ListTemplate()

  ul: HTMLUListElement

  private constructor (){
    this.ul = document.getElementById('listItems') as HTMLUListElement
  }

  clear(): void {
    // const listItemElement = document.getElementById('listItems') as HTMLUListElement
    this.ul.innerHTML = ''
  }

  render(fullList: FullList): void {
    this.clear()

    let ulInnerHtml = ''
    fullList.list.forEach(listItem => {
      ulInnerHtml += `<li class="item">
        <input type="checkbox" id=${listItem.id} tabIndex = 0 checked=${listItem.checked}>
        <label for=${listItem.id}>${listItem.item}</label>
        <button id="button-${listItem.id}" class="button">X</button>
      </li>`

      this.ul.innerHTML = ulInnerHtml

      const inputElement = document.getElementById(listItem.id) as HTMLInputElement
      inputElement.addEventListener('change', () => {
        listItem.checked = !listItem.checked      
        fullList.save()
      })

      const buttonElement = document.getElementById(`button-${listItem.id}`) as HTMLButtonElement

      buttonElement.addEventListener('click', () => {
        fullList.removeItem(listItem.id)
        this.render(fullList)
      })

    })
    // const listItemElement = document.getElementById('listItems') as HTMLUListElement
    this.ul.innerHTML = ulInnerHtml
  }
}