import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface ParticleEffectProps {
  className?: string;
}

export function ParticleEffect({ className = '' }: ParticleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const particleAccumulatorRef = useRef(0);
  const isTouchDeviceRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Detect if this is a touch device
    isTouchDeviceRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const colors = ['#10b981', '#34d399', '#6ee7b7', '#059669', '#047857'];

    const createParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const maxLife = Math.random() * 100 + 40;
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const speed = Math.random() * 3 + 2;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife: maxLife,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only create particles if mouse is within the container bounds
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      // Check if hovering over interactive elements (buttons, cards, forms, inputs)
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, input, textarea, select, form, [role="button"], .card, a[href]');

      // Don't generate particles when hovering over interactive elements
      if (isInteractive) return;

      mousePositionRef.current = { x, y };

      particleAccumulatorRef.current += 1.5;
      const particlesToCreate = Math.floor(particleAccumulatorRef.current);
      particleAccumulatorRef.current -= particlesToCreate;

      for (let i = 0; i < particlesToCreate; i++) {
        const maxLife = Math.random() * 100 + 40;
        particlesRef.current.push({
          x: mousePositionRef.current.x,
          y: mousePositionRef.current.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: maxLife,
          maxLife: maxLife,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();

      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        // Only create particles if touch is within the container bounds
        if (x < 0 || x > rect.width || y < 0 || y > rect.height) continue;

        // Check if touching interactive elements
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('button, input, textarea, select, form, [role="button"], .card, a[href]');

        // Don't generate particles when touching interactive elements
        if (isInteractive) continue;

        // Create 5-8 particles per tap on mobile (reduced from 15-20)
        createParticles(x, y, Math.floor(Math.random() * 4) + 5);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(p => p.life > 0);

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        const alpha = particle.life / particle.maxLife;

        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = alpha;

        ctx.fillRect(
          particle.x - particle.size / 2,
          particle.y - particle.size / 2,
          particle.size,
          particle.size
        );

        if (Math.random() > 0.7) {
          ctx.beginPath();
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 1;
          ctx.globalAlpha = alpha * 0.5;
          const nearbyParticle = particlesRef.current.find(
            p => p !== particle &&
            Math.hypot(p.x - particle.x, p.y - particle.y) < 60
          );
          if (nearbyParticle) {
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(nearbyParticle.x, nearbyParticle.y);
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 ${className} pointer-events-none`}>
      <div className="absolute inset-0 bg-gradient-radial from-accent-500/10 via-transparent to-transparent opacity-30 blur-3xl" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
}
