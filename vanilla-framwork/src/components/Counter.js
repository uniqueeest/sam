import Component from '../core/Component.js';

export default class Counter extends Component {
  setup() {
    this.state = { count: 0 };
  }
  template() {
    return `
      <div>
        <span>count: ${this.state.count}</span>
        <button id="increase">증가</button>
        <button id="decrease">감소</button>
      </div>
    `;
  }
  setEvent() {
    this.$target.querySelector('#increase').addEventListener('click', () => {
      this.setState({ count: this.state.count + 1 });
    });
    this.$target.querySelector('#decrease').addEventListener('click', () => {
      this.setState({ count: this.state.count - 1 });
    });
  }
}
