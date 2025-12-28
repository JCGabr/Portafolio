import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import '../components_styles/ParticleBackground.css'

const PARTICLE_COUNT = 100; // Cantidad de particulas
const CONNECTION_DISTANCE = 150; // Distancia de conexion

interface MousePosition {
  x: number | null;
  y: number | null;
  radius: number;
}

class Particle {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  targetOpacity: number;
  delay: number;

  constructor(
    canvas: HTMLCanvasElement,ctx: CanvasRenderingContext2D,index: number) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5; // velocidad de los puntos
    this.vy = (Math.random() - 0.5) * 0.5; // velocidad de los puntos
    this.radius = Math.random() * 2 + 1; // radio de puntos
    this.opacity = 0;
    this.targetOpacity = 0.8;
    this.delay = index * 25;
  }

  update() {
    if (this.delay > 0) {
      this.delay -= 16;
    } else {
      this.opacity = Math.min(this.opacity + 0.05, this.targetOpacity);
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x >= this.canvas.width) this.vx *= -1;
    if (this.y <= 0 || this.y >= this.canvas.height) this.vy *= -1;
  }

  draw() {
    if (this.opacity <= 0) return;

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    this.ctx.fill();
  }
}


export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: null, y: null, radius: 150 }); // rango de interaccion
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const initParticles = () => {
      particlesRef.current = Array.from(
        { length: PARTICLE_COUNT },
        (_, i) => new Particle(canvas, ctx, i)
      );
    };

    const connectParticles = () => {
      const { x: mx, y: my, radius } = mouseRef.current;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i];
        if (p1.opacity <= 0) continue;

        if (mx !== null && my !== null) {
          const dx = p1.x - mx;
          const dy = p1.y - my;
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147,200,255,${(1 - dist / radius) * 0.6})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147,112,219,${(1 - dist / CONNECTION_DISTANCE) * 0.3})`;
            ctx.lineWidth = 0.5; // Lineas al mouse y particulas
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      connectParticles();
      particlesRef.current.forEach(p => {
        p.update();
        p.draw();
      });
      animationRef.current = requestAnimationFrame(animate);
    };

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

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className='animated-canvas'
      initial= {{ opacity: 0 }}
      animate= {{ opacity: 1 }}
      exit= {{ opacity: 0 }}
    />
  );
}
