export interface MousePosition {
  x: number | null;
  y: number | null;
  radius: number;
}

export interface ParticleConfig {
  count: number;
  connectionDistance: number;
  speed: number;
  fadeSpeed: number;
}

export interface AnimatedBackgroundProps {
  level?: 1 | 2 | 3; // 1: solo partículas, 2: + conexiones, 3: + mouse
  config?: Partial<ParticleConfig>;
}

export interface IParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
  startAnimation(): void;
  readonly hasStarted: boolean;
}