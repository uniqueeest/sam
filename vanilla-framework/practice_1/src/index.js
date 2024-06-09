import Router from './Router.js';

import Home from './pages/Home.js';
import About from './pages/About.js';

const routes = {
  '/': {
    linkLabel: 'Home',
    content: Home,
  },
  '/about': {
    linkLabel: 'About',
    content: About,
  },
};

// 라우터 초기화
new Router(routes);

// 네비게이션 링크 렌더링
const nav = document.querySelector('#nav');

const renderNavLinks = () => {
  const navFragment = document.createDocumentFragment();
  Object.keys(routes).forEach((route) => {
    const { linkLabel } = routes[route];
    if (linkLabel) {
      const linkElement = document.createElement('a');
      linkElement.href = route;
      linkElement.textContent = linkLabel;
      linkElement.className = 'nav-link';
      navFragment.appendChild(linkElement);
    }
  });
  nav.append(navFragment);
};

renderNavLinks();
