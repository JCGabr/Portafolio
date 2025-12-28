import type { IParticle } from './types';

export class SpatialGrid {
  private cellSize: number;
  public cols: number;
  public rows: number;
  public width: number;
  public height: number;
  private grid: Map<string, IParticle[]>;

  constructor(
    width: number,
    height: number,
    cellSize: number
  ) {
    this.cellSize = cellSize;
    this.width = width;
    this.height = height;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
    this.grid = new Map();
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.cols = Math.ceil(width / this.cellSize);
    this.rows = Math.ceil(height / this.cellSize);
  }

  clear(): void {
    this.grid.clear();
  }

  insert(particle: IParticle): void {
    const cellX = Math.floor(particle.x / this.cellSize);
    const cellY = Math.floor(particle.y / this.cellSize);
    const key = `${cellX},${cellY}`;

    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key)!.push(particle);
  }

  getNearby(particle: IParticle): IParticle[] {
    const cellX = Math.floor(particle.x / this.cellSize);
    const cellY = Math.floor(particle.y / this.cellSize);
    const nearby: IParticle[] = [];

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const key = `${cellX + dx},${cellY + dy}`;
        const cell = this.grid.get(key);
        
        if (cell) {
          nearby.push(...cell.filter(p => p.opacity > 0.01));
        }
      }
    }

    return nearby;
  }
}
