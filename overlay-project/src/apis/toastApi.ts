let toastFunction: (title: string, description: string) => void;

export const setToastFunction = (
  fn: (title: string, description: string) => void
) => {
  toastFunction = fn;
};

export const toastApi = {
  create: (params: { title: string; description: string }) => {
    if (toastFunction) {
      toastFunction(params.title, params.description);
    }
  },
};
