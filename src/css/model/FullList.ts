import ListItem from './ListItem';

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  constructor(list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this.list;
  }

  set list(list: ListItem[]) {
    this.list = list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem('myList');
    if (typeof storedList !== 'string') return;

    const parsedList: { id: string; item: string; checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj.id,
        itemObj.item,
        itemObj.checked,
      );
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem('myList', JSON.stringify(this.list));
  }

  clearList(): void {
    (this.list = []), this.save();
  }

  addItem(itemObj: ListItem): void {
    this.list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this.list = this.list.filter((item) => item.id !== id);
    this.save();
  }
}
