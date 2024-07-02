import { useEffect } from 'react';

import { useToast } from '../../contexts/ToastContext';

export const Toast = () => {
  const { isVisible, title, description, hideToast } = useToast();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  if (!isVisible) return null;

  return (
    <div>
      <h3>{title}</h3>
      <span>{description}</span>
    </div>
  );
};
