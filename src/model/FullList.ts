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

  }

  save(): void {
    localStorage.setItem('myList', JSON.stringify(this._list))
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
    this._list = this._list.filter(item => {
      return item.id != id
    })
    this.save()
  }

}