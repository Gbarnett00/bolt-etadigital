import { useEffect, useRef, useState } from 'react';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate' | 'fade';

interface AdvancedScrollAnimationOptions {
  direction?: AnimationDirection;
  distance?: number;
  threshold?: number;
  scale?: number;
  rotation?: number;
}

export function useAdvancedScrollAnimation(options: AdvancedScrollAnimationOptions = {}) {
  const {
    direction = 'up',
    distance = 50,
    threshold = 0.1,
    scale = 0.9,
    rotation = 10
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) {
      return 'translateX(0) translateY(0) scale(1) rotate(0deg)';
    }

    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      case 'scale':
        return `scale(${scale})`;
      case 'rotate':
        return `rotate(${rotation}deg)`;
      case 'fade':
      default:
        return 'translateY(0)';
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return { ref, isVisible, style };
}
