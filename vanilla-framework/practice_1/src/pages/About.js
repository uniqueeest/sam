import Component from '../components/Component.js';

export default class About extends Component {
  setup() {
    this.$state = { message: 'About Component' };
  }

  template() {
    return `<h1>${this.$state.message}</h1>`;
  }
}
