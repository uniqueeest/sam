const propsToEffects = {};
const dirtyEffects = [];
let queued = false;
let currentEffect = null;

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

console.log({ ...state });

console.log('Setting a to', 5);
state.a = 5;

Promise.resolve().then(() => {
  console.log({ ...state });
});

Promise.resolve()
  .then(() => {
    createEffect(() => {
      state.multiple = state.a * state.b;
    });

    console.log({ ...state });
    state.a = 7;
  })
  .then(() => {
    console.log({ ...state });
  });
