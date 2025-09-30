'use client';
import React, {useEffect, useRef, useState} from 'react';

type IntersectorObserverProps<T extends HTMLElement> = {
  threshold?: number;
  children: (
    ref: React.RefObject<T | null>,
    inView?: boolean,
  ) => React.ReactNode;
};

function IntersectorObserverWrapper<T extends HTMLElement>({
  threshold,
  children,
}: IntersectorObserverProps<T>) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // unobserve once visible
          }
        });
      },
      {
        threshold: threshold || 0.2, // Trigger when 20% is visible
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return children(ref, isVisible);
}

export default IntersectorObserverWrapper;
