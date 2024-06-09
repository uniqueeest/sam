import Component from '../components/Component.js';

export default class Home extends Component {
  setup() {
    this.$state = { message: 'Home Component' };
  }

  template() {
    return `<h1>${this.$state.message}</h1>`;
  }
}
