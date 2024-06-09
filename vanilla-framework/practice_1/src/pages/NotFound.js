import Component from '../components/Component.js';

export default class NotFound extends Component {
  setup() {
    this.$state = { message: 'Not Found Page' };
  }

  template() {
    return `<h1>${this.$state.message}</h1>`;
  }
}
