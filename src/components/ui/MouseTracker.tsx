import { useEffect, useRef, useState } from 'react';

interface MouseTrackerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  style?: React.CSSProperties;
}

export function MouseTracker({ children, className = '', intensity = 'medium', style }: MouseTrackerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const intensityConfig = {
    low: { size: 300, opacity: 0.2 },
    medium: { size: 450, opacity: 0.3 },
    high: { size: 600, opacity: 0.4 },
  };

  const config = intensityConfig[intensity];

  return (
    <div ref={containerRef} className={`relative ${className}`} style={style}>
      <div
        className="pointer-events-none absolute -inset-[1px] z-10 transition-opacity duration-200 rounded-xl"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(${config.size}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(96, 165, 250, ${config.opacity}), rgba(59, 130, 246, ${config.opacity * 0.5}) 40%, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
