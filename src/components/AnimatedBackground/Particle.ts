import type { IParticle } from './types';

export class Particle implements IParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  
  private targetOpacity: number;
  private delay: number;
  private _hasStarted: boolean;
  private width: number;
  private height: number;

  constructor(
    width: number,
    height: number,
    index: number,
    speed: number = 0.5
  ) {
    this.width = width;
    this.height = height;

    this.x = Math.random() * width;
    this.y = Math.random() * height;
    
    this.vx = (Math.random() - 0.5) * speed;
    this.vy = (Math.random() - 0.5) * speed;
    
    this.radius = Math.random() * 2 + 1;
    this.opacity = 0;
    this.targetOpacity = 0.8;
    
    this.delay = index * 500;
    this._hasStarted = false;
  }

  get hasStarted(): boolean {
    return this._hasStarted;
  }

  startAnimation(): void {
    this._hasStarted = true;
  }

  updateBounds(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  update(): void {
    if (!this._hasStarted) return;

    if (this.delay > 0) {
      this.delay -= 16;
    } else if (this.opacity < this.targetOpacity) {
      this.opacity = Math.min(this.opacity + 0.05, this.targetOpacity);
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x >= this.width) {
      this.vx *= -1;
      this.x = Math.max(0, Math.min(this.width, this.x));
    }
    
    if (this.y <= 0 || this.y >= this.height) {
      this.vy *= -1;
      this.y = Math.max(0, Math.min(this.height, this.y));
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.opacity <= 0) return;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.fill();
  }
}