import { useReducer, useMemo } from 'react';

type CheckBoxItem = {
  id: string | number;
  label: string;
  group: 'required' | 'optional';
  checked: boolean;
};

type Action =
  | { type: 'TOGGLE'; id: string | number }
  | { type: 'TOGGLE_ALL' }
  | {
      type: 'CHECK_BY';
      checked: boolean;
      predicate: (item: CheckBoxItem) => boolean;
    };

const checkBoxReducer = (
  state: CheckBoxItem[],
  action: Action
): CheckBoxItem[] => {
  switch (action.type) {
    case 'TOGGLE':
      return state.map((item) =>
        item.id === action.id ? { ...item, checked: !item.checked } : item
      );
    case 'TOGGLE_ALL':
      const allChecked = state.every((item) => item.checked);
      return state.map((item) => ({ ...item, checked: !allChecked }));
    case 'CHECK_BY':
      return state.map((item) =>
        action.predicate(item) ? { ...item, checked: action.checked } : item
      );
    default:
      return state;
  }
};

export const useCheckList = (initialList: Omit<CheckBoxItem, 'checked'>[]) => {
  const [list, dispatch] = useReducer(
    checkBoxReducer,
    initialList.map((item) => ({ ...item, checked: false }))
  );

  const toggle = (id: string | number) => dispatch({ type: 'TOGGLE', id });
  const toggleAll = () => dispatch({ type: 'TOGGLE_ALL' });
  const checkBy = (
    checked: boolean,
    predicate: (item: CheckBoxItem) => boolean
  ) => {
    dispatch({ type: 'CHECK_BY', checked, predicate });
  };

  const isAllChecked = useMemo(
    () => list.every((item) => item.checked),
    [list]
  );
  const isCheckedBy = (predicted: (item: CheckBoxItem) => boolean) =>
    list.filter(predicted).every((item) => item.checked);

  return {
    list,
    toggle,
    toggleAll,
    checkBy,
    isAllChecked,
    isCheckedBy,
  } as const;
};
