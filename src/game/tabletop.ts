import type { Cords, Environment } from './game';

export class Tabletop implements Environment {
  mapSize: Cords;
  obstacles: Map<number, Set<number>>;

  constructor(cords: Cords) {
    this.mapSize = cords;
    this.obstacles = new Map();
  }

  private isWithinMap(x: number, y: number) {
    return x < this.mapSize.x && x >= 0 && y < this.mapSize.y && y >= 0;
  }

  isObstructed({ x, y }: Cords) {
    return Boolean(!this.isWithinMap(x, y) || this.obstacles.get(y)?.has(x));
  }

  addObstacle({ x, y }: Cords) {
    const rowObstacles = this.obstacles.get(y);

    if (rowObstacles) {
      rowObstacles.add(x);
    } else {
      this.obstacles.set(y, new Set([x]));
    }
  }
}
