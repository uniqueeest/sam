import { useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { setToastFunction } from '../../apis/toastApi';

export const ToastInitializer = () => {
  const { showToast } = useToast();

  useEffect(() => {
    setToastFunction(showToast);
  }, [showToast]);

  return null;
};
