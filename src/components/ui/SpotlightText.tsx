import { useRef, useState, useEffect } from 'react';

interface SpotlightTextProps {
  text: string;
  className?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
}

export function SpotlightText({
  text,
  className = '',
  spotlightColor: _spotlightColor = '#6ee7b7',
  spotlightRadius = 15
}: SpotlightTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [charPositions, setCharPositions] = useState<{ x: number; y: number; width: number; height: number }[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (containerRef.current) {
      const spans = containerRef.current.querySelectorAll('.char-span');
      const positions = Array.from(spans).map((span) => {
        const rect = span.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        };
      });
      setCharPositions(positions);
    }
  }, [text]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 });
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const getCharStyle = (index: number) => {
    if (charPositions.length === 0) return { color: 'currentColor' };

    const isHovering = mousePosition.x > -500;
    if (!isHovering) return { color: 'currentColor' };

    const pos = charPositions[index];
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - pos.x, 2) + Math.pow(mousePosition.y - pos.y, 2)
    );

    const maxDistance = 150;
    const normalizedDistance = Math.min(distance / maxDistance, 1);

    const minBrightness = 70;
    const maxBrightness = 255;
    const brightness = Math.floor(minBrightness + (maxBrightness - minBrightness) * (1 - normalizedDistance));
    const color = `rgb(${Math.floor(brightness * 0.43)}, ${brightness}, ${Math.floor(brightness * 0.72)})`;

    const hasShimmer = distance < spotlightRadius;
    if (hasShimmer) {
      const shimmerIntensity = 1 - (distance / spotlightRadius);
      return {
        color,
        textShadow: shimmerIntensity > 0.7
          ? `0 0 ${8 * shimmerIntensity}px rgba(110, 231, 183, ${0.8 * shimmerIntensity}), 0 0 ${4 * shimmerIntensity}px rgba(16, 185, 129, ${0.6 * shimmerIntensity})`
          : 'none',
        filter: shimmerIntensity > 0.8 ? `brightness(${1 + (0.3 * shimmerIntensity)})` : 'none'
      };
    }

    return { color };
  };

  return (
    <span ref={containerRef} className={`relative inline-block cursor-default ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char-span"
          style={getCharStyle(index)}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
