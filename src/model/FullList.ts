import ListItem from "./ListItem";

interface List {
  list: ListItem[],
  load(): void,
  save(): void,
  clearList(): void,
  addItem(itemObj: ListItem): void,
  removeItem(id: string): void
}

export default class FullList implements List {

  static instance: FullList = new FullList()

  // A private constructor can only be called from within the class itself and cannot be directly instantiated from outside the class Benefits and Use Cases: Singleton Pattern, Factory Methods, Encapsulation, Inheritance Control
  private constructor(private _list: ListItem[] = []){}

  get list(): ListItem[]{
    return this._list
  }

  set list(list: ListItem[]){
    this._list = list
  }

  load(): void {
    const storedList = localStorage.getItem("myList")

    if(typeof storedList !== 'string') return
    console.log('local storage does contain a itemlist')
    const parsedList: {_id: string, _item: string, _checked: boolean} [] = JSON.parse(storedList)

    parsedList.forEach(itemObj => {
      const newListItem: ListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
      FullList.instance.addItem(newListItem)
    })
    console.log(FullList.instance.list)
  }

  save(): void {
    localStorage.setItem('myList', JSON.stringify(this._list))
    console.log('item saved to local storage')
  }

  clearList(): void {
    this._list = []
    this.save()
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj)
    this.save()
  }

  removeItem(id: string): void {
    this._list = this._list.filter(item => item.id !== id)
    this.save()
  }

}