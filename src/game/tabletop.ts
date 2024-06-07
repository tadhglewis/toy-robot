import type { Cords, Environment } from './game';

export class Tabletop implements Environment {
  mapSize: Cords;
  objects: Set<string>;

  constructor(cords: Cords) {
    this.mapSize = cords;
    this.objects = new Set(['1:0']);
  }

  private isWithinMap(x: number, y: number) {
    return x < this.mapSize.x && x >= 0 && y < this.mapSize.y && y >= 0;
  }

  isObstructed({ x, y }: Cords) {
    const hasObject = this.objects.has(`${x}:${y}`);

    return !this.isWithinMap(x, y) || hasObject;
  }
}
