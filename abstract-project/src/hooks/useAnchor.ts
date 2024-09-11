import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnchors = (
  timeout: number = 750,
  mainSelector: string = 'main-section'
) => {
  const location = useLocation();
  const observerRef = useRef<MutationObserver | null>(null);
  const timeoutIdRef = useRef<any>(null);

  const reset = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  };

  const createScrollToElement = (id: string) => {
    return () => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView();
        reset();
        return true;
      }

      return false;
    };
  };

  const scroll = (hash: string) => {
    const elementId = hash.slice(1);

    if (!elementId) {
      const contentArea = document.getElementById(mainSelector);
      if (contentArea) {
        contentArea.scrollTop = 0;
      }
      return;
    }

    const scrollToElement = createScrollToElement(elementId);

    setTimeout(() => {
      if (scrollToElement()) {
        return;
      }

      observerRef.current = new MutationObserver(scrollToElement);

      observerRef.current.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      timeoutIdRef.current = setTimeout(reset, timeout);
    });
  };

  useEffect(() => {
    if (timeoutIdRef.current) {
      reset();
    }

    scroll(location.hash);

    return reset;
  }, [location, timeout, mainSelector]);
};
