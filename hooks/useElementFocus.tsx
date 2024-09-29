import { useState, useEffect } from 'react';

const useElementFocus = (selector: string, activeClassName: string, isVisible: boolean): boolean => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
        const element = document.querySelector(selector);
        console.log("ELEMENT", element);

        if (!element) {
            console.warn(`Element with selector "${selector}" not found`);
            return;
        }

        const checkFocus = () => {
            setIsFocused(element.classList.contains(activeClassName));
        };

        // Initial check
        checkFocus();

        // Create a MutationObserver to watch for class changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                checkFocus();
            });
        });

        // Start observing the element for attribute changes
        observer.observe(element, { attributes: true });

        // Clean up the observer when the component unmounts
        return () => {
            observer.disconnect();
        };
    }, [selector, activeClassName, isVisible]);

    return isFocused;
};

export default useElementFocus;