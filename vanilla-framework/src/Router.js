export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.render.bind(this));
    window.addEventListener('DOMContentLoaded', this.render.bind(this));
  }

  render() {
    const hash = window.location.hash.replace('#', '');
    const route = this.routes[hash] || this.routes['404'];
    if (route) {
      new route.view(document.querySelector('#app'));
    }
  }
}
