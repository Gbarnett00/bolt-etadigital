import { ReactNode, useRef, useState } from 'react';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: React.CSSProperties;
}

export function InteractiveCard({ children, className = '', intensity = 10, style }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * intensity;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * intensity;

    setRotate({ x: -rotateX, y: rotateY });

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-200 ease-out ${className}`}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovering ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'}`,
      }}
    >
      <div className="relative rounded-xl">
        <div
          className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-200 z-10 overflow-hidden"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(96, 165, 250, 0.25), rgba(59, 130, 246, 0.15) 40%, transparent 65%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
