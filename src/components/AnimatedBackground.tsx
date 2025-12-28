import { useEffect, useRef, useCallback } from 'react';
import { Particle } from './AnimatedBackground/Particle';
import { SpatialGrid } from './AnimatedBackground/SpatialGrid';
import type { AnimatedBackgroundProps, MousePosition, ParticleConfig } from './AnimatedBackground/types';
import '../components_styles/AnimatedBackground.css';

const DEFAULT_CONFIG: ParticleConfig = {
  count: 100,
  connectionDistance: 150,
  speed: 0.3,
  fadeSpeed: 0.05,
};

export default function AnimatedBackground({ 
  level = 1, 
  config: userConfig 
}: AnimatedBackgroundProps) {
  const config = { ...DEFAULT_CONFIG, ...userConfig };
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const spatialGridRef = useRef<SpatialGrid | null>(null);
  const mouseRef = useRef<MousePosition>({ x: null, y: null, radius: 150 });
  const animationRef = useRef<number | null>(null);
  
  const levelRef = useRef(level);
  const connectionOpacityRef = useRef(0);
  const mouseOpacityRef = useRef(0);
  const initializedRef = useRef(false);

  const connectionDistSqRef = useRef(config.connectionDistance ** 2);

  useEffect(() => {
    levelRef.current = level;
    if (!initializedRef.current) {
      initializedRef.current = true;
    }
  }, [level]);

  const drawConnections = useCallback((
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    grid: SpatialGrid
  ) => {
    if (connectionOpacityRef.current <= 0.01) return;

    const distSq = connectionDistSqRef.current;
    const baseOpacity = 0.3 * connectionOpacityRef.current;

    ctx.lineWidth = 0.5;

    for (const p1 of particles) {
      if (p1.opacity <= 0.01) continue;

      const nearby = grid.getNearby(p1);

      for (const p2 of nearby) {
        if (p1 === p2 || p2.opacity <= 0.01) continue;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < distSq) {
          const distance = Math.sqrt(distanceSq);
          const lineOpacity = Math.min(p1.opacity, p2.opacity);
          const finalOpacity = (1 - distance / config.connectionDistance) * baseOpacity * lineOpacity;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(147,112,219,${finalOpacity})`;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }, [config.connectionDistance]);

  const drawMouseConnections = useCallback((
    ctx: CanvasRenderingContext2D,
    particles: Particle[]
  ) => {
    if (mouseOpacityRef.current <= 0.01) return;

    const { x: mx, y: my, radius } = mouseRef.current;
    if (mx === null || my === null) return;

    const radiusSq = radius * radius;
    const baseOpacity = 0.6 * mouseOpacityRef.current;

    for (const p of particles) {
      if (p.opacity <= 0.01) continue;

      const dx = p.x - mx;
      const dy = p.y - my;
      const distSq = dx * dx + dy * dy;

      if (distSq < radiusSq) {
        const dist = Math.sqrt(distSq);
        const opacity = (1 - dist / radius) * baseOpacity * p.opacity;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(147,200,255,${opacity})`;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mx, my);
        ctx.stroke();
      }
    }
  }, []);

  const animate = useCallback((
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    particles: Particle[],
    grid: SpatialGrid
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const connectionTarget = levelRef.current >= 2 ? 1 : 0;
    const mouseTarget = levelRef.current >= 3 ? 1 : 0;
    
    connectionOpacityRef.current += 
      (connectionTarget - connectionOpacityRef.current) * config.fadeSpeed;
    mouseOpacityRef.current += 
      (mouseTarget - mouseOpacityRef.current) * config.fadeSpeed;

    grid.clear();
    
    for (const particle of particles) {
      particle.update();
      if (particle.opacity > 0.01) {
        grid.insert(particle);
      }
    }

    drawConnections(ctx, particles, grid);
    drawMouseConnections(ctx, particles);

    for (const particle of particles) {
      particle.draw(ctx);
    }

    animationRef.current = requestAnimationFrame(() => 
      animate(ctx, canvas, particles, grid)
    );
  }, [config.fadeSpeed, drawConnections, drawMouseConnections]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      particlesRef.current.forEach(p => 
        p.updateBounds(rect.width, rect.height)
      );

      if (spatialGridRef.current) {
        spatialGridRef.current.resize(rect.width, rect.height);
      }
    };

    resizeCanvas();

    spatialGridRef.current = new SpatialGrid(
      canvas.width,
      canvas.height,
      config.connectionDistance
    );

    const rect = canvas.getBoundingClientRect();
    particlesRef.current = Array.from(
      { length: config.count },
      (_, i) => new Particle(rect.width, rect.height, i, config.speed)
    );

    if (levelRef.current >= 1) {
      particlesRef.current.forEach(p => p.startAnimation());
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    animate(ctx, canvas, particlesRef.current, spatialGridRef.current);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="animated-canvas"
      aria-hidden="true"
    />
  );
}