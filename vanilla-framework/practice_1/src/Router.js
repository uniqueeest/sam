export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }

  init() {
    window.addEventListener('popstate', this.render.bind(this));
    window.addEventListener('DOMContentLoaded', this.render.bind(this));
    this.renderInitialPage();
    this.registerNavLinks();
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.render();
  }

  render() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['404'];
    if (route) {
      const app = document.querySelector('#app');
      app.innerHTML = '';
      new route.content(app);
    }
  }

  registerNavLinks() {
    const nav = document.querySelector('#nav');
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        this.navigate(path);
      }
    });
  }

  renderInitialPage() {
    const path = window.location.pathname;
    this.render(path);
  }
}
