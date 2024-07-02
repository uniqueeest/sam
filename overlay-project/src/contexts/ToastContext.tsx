import { createContext, useState, useContext } from 'react';

type ToastContextType = {
  showToast: (title: string, description: string) => void;
  hideToast: () => void;
  isVisible: boolean;
  title: string;
  description: string;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const showToast = (title: string, description: string) => {
    setIsVisible(true);
    setTitle(title);
    setDescription(description);
  };

  const hideToast = () => setIsVisible(false);

  return (
    <ToastContext.Provider
      value={{ showToast, hideToast, isVisible, title, description }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
