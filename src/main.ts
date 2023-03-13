import './css/style.css';
import FullList from './css/model/FullList';
import ListItem from './css/model/ListItem';
import ListTemplate from './css/model/ListTemplate';

document.querySelector<HTMLDivElement>('#app');

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const itemEntryForm = document.getElementById(
    'itemEnntryFor',
  ) as HTMLFormElement;
  itemEntryForm.addEventListener('submit', (e: SubmitEvent): void => {
    e.preventDefault();
    const input = document.getElementById('newItemInput') as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    if (!newEntryText.length) return;

    const itemID: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemID.toString(), newEntryText);

    fullList.addItem(newItem);

    template.render(fullList);
  });

  const clearItem = document.getElementById(
    'clearItemsButton',
  ) as HTMLButtonElement;

  clearItem.addEventListener('click', (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener('DOMContentLoaded', initApp);
