import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observe = (element: Element) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        callback(entry);
      } else {
        setIsIntersecting(false);
      }
    });

    if (element) {
      observerRef.current.observe(element);
    }
  };

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { observe, isIntersecting };
};

export default useIntersectionObserver;
