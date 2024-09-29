import { useState, useEffect } from 'react';

const useElementVisibilityTracker = (selector: string): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observerCallback: MutationCallback = (mutations: MutationRecord[]) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);

          const addedTarget = addedNodes.find(node =>
            node instanceof Element && node.matches(selector)
          );

          const removedTarget = removedNodes.find(node =>
            node instanceof Element && node.matches(selector)
          );

          const ele = document.querySelector(selector);

          if (addedTarget) {
            setIsVisible(true);
          } else if (removedTarget) {
            setIsVisible(false);
          }

          if (!ele) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
      }
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, { childList: true, subtree: true, attributes :true });

    // Check if the element already exists in the DOM
    const existingElement = document.querySelector(selector);
    if (existingElement) {
      setIsVisible(true);
    }

    return () => {
      observer.disconnect();
    };
  }, [selector]);

  return isVisible;
};

export default useElementVisibilityTracker;