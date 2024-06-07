export const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'] as const;
export type Direction = (typeof directions)[number];

export type Cords = { x: number; y: number };

// 1. Move into movements class

export interface Environment {
  isObstructed: (cords: Cords) => boolean;
  mapSize: Cords;
  objects: Set<string>;
}

export interface Player {
  move: (cords: Cords) => void;
  turnLeft: () => void;
  turnRight: () => void;
  report: () => { cords: Cords; direction: Direction };
}

export class Game {
  private environment: Environment;
  private player: Player | null;

  constructor(environment: Environment) {
    this.environment = environment;
    this.player = null;
  }

  place(player: Player) {
    if (this.environment.isObstructed(player.report().cords)) {
      return;
    }

    this.player = player;
  }

  report() {
    return {
      player: this.getPlayer().report(),
      environment: {
        objects: this.environment.objects,
        mapSize: this.environment.mapSize,
      },
    };
  }

  private getPlayer() {
    if (!this.player) {
      throw new Error('The robot has not been placed');
    }

    return this.player;
  }

  turnLeft() {
    this.getPlayer().turnLeft();
  }

  turnRight() {
    this.getPlayer().turnRight();
  }

  move() {
    const { cords, direction } = this.getPlayer().report();

    const compassCordsMap: Record<Direction, { x: number; y: number }> = {
      NORTH: {
        x: 0,
        y: 1,
      },
      EAST: {
        x: 1,
        y: 0,
      },
      SOUTH: {
        x: 0,
        y: -1,
      },
      WEST: {
        x: -1,
        y: 0,
      },
    };

    const newPosition = {
      x: cords.x + compassCordsMap[direction].x,
      y: cords.y + compassCordsMap[direction].y,
    };

    if (this.environment.isObstructed(newPosition)) {
      return;
    }

    this.getPlayer().move(newPosition);
  }
}
