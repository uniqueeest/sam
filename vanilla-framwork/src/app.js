import Items from './components/Items.js';
import Counter from './components/Counter.js';

class App {
  constructor() {
    const $itemContainer = document.createElement('div');
    const $counterContainer = document.createElement('div');

    document.querySelector('#app').appendChild($itemContainer);
    document.querySelector('#app').appendChild($counterContainer);

    new Items($itemContainer);
    new Counter($counterContainer);
  }
}

new App();
