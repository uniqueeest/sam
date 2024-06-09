const propsToEffects = {};
const dirtyEffects = [];
let queued = false;
let currentEffect;

const state = new Proxy(
  {},
  {
    get(obj, prop) {
      onGet(prop);
      return obj[prop];
    },
    set(obj, prop, value) {
      obj[prop] = value;
      onSet(prop, value);
      return true;
    },
  }
);

function onGet(prop) {
  if (currentEffect) {
    const effects = propsToEffects[prop] ?? (propsToEffects[prop] = []);
    effects.push(currentEffect);
  }
}

function flush() {
  while (dirtyEffects.length) {
    dirtyEffects.shift()();
  }
}

function onSet(prop, value) {
  if (propsToEffects[prop]) {
    dirtyEffects.push(...propsToEffects[prop]);
    if (!queued) {
      queued = true;
      queueMicrotask(() => {
        queued = false;
        flush();
      });
    }
  }
}

function createEffect(effect) {
  currentEffect = effect;
  effect();
  currentEffect = undefined;
}

// Initial state
state.a = 1;
state.b = 2;

createEffect(() => {
  state.sum = state.a + state.b;
});

// HTML rendering
const tokensToTemplate = new WeakMap();

function parseTemplate(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template;
}

function html(tokens, ...expressions) {
  const replaceStubs = (string) =>
    string.replace(/__stub-(\d+)__/g, (_, i) => expressions[i]);
  // get or create the template
  let template = tokensToTemplate.get(tokens);
  if (!template) {
    const stubs = expressions.map((_, i) => `__stub-${i}__`);
    const allTokens = tokens.map((token, i) => (stubs[i - 1] ?? '') + token);
    const htmlString = allTokens.join('');
    template = parseTemplate(htmlString);
    tokensToTemplate.set(tokens, template);
  }
  // clone and update bindings
  const cloned = template.content.cloneNode(true);
  const element = cloned.firstElementChild;
  for (const { name, value } of element.attributes) {
    element.setAttribute(name, replaceStubs(value));
  }
  element.textContent = replaceStubs(element.textContent);
  return element;
}

function render(state) {
  return html`<div class="${state.color}">${state.text}</div>`;
}

function addButton(buttonName, buttonId) {
  const button = document.createElement('button');
  button.innerText = buttonName;
  button.id = buttonId;
  document.body.appendChild(button);
}

addButton('A증가', 'button_a');
addButton('B증가', 'button_b');

document.querySelector('#button_a').addEventListener('click', () => {
  state.a += 1;
});

document.querySelector('#button_b').addEventListener('click', () => {
  state.b += 1;
});

// Tying it all together
state.color = 'blue';

const container = document.getElementById('container');

createEffect(() => {
  console.log('rendering', state);
  const dom = render(state);
  if (container.firstElementChild) {
    container.firstElementChild.replaceWith(dom);
  } else {
    container.appendChild(dom);
  }
});

createEffect(() => {
  state.text = `A: ${state.a}, B: ${state.b}, Sum is: ${state.sum}`;
});
