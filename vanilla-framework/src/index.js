import Router from './Router.js';

import Home from './pages/Home.js';
import About from './pages/About.js';

const routes = {
  '/': { view: Home },
  '/about': { view: About },
};

// 라우터 초기화
new Router(routes);
