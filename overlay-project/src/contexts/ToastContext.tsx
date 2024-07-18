import { createContext, useState, useContext, useCallback } from 'react';
import { randomId } from '../utils/randomId';

type OverlayListType = {
  id: string;
  title: string;
  description: string;
};

type ToastContextType = {
  // TODO: visible 대신 duration으로 네이밍 수정하기
  showToast: ({
    title,
    description,
    visibleTime,
  }: {
    title: string;
    description: string;
    visibleTime?: number;
  }) => void;
  hideToast: (id: string) => void;
  overlayList: OverlayListType[];
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [overlayList, setOverlayList] = useState<OverlayListType[]>([]);

  const showToast = useCallback(
    ({
      title,
      description,
      visibleTime = 3000,
    }: {
      title: string;
      description: string;
      visibleTime?: number;
    }) => {
      const id = randomId();
      setOverlayList((prev) => [
        ...prev,
        {
          id,
          title,
          description,
        },
      ]);

      // 제거 로직
      setTimeout(() => hideToast(id), visibleTime);
    },
    []
  );

  const hideToast = useCallback((id: string) => {
    setOverlayList((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, overlayList }}>
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
