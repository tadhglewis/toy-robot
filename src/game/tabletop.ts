import type { Cords, Environment } from './game';

export class Tabletop implements Environment {
  mapSize: Cords;

  constructor(cords: Cords) {
    this.mapSize = cords;
  }

  private isWithinMap(x: number, y: number) {
    return x < this.mapSize.x && x >= 0 && y < this.mapSize.y && y >= 0;
  }

  isObstructed({ x, y }: Cords) {
    return !this.isWithinMap(x, y);
  }
}
