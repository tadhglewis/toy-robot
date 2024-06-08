export const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'] as const;
export type Direction = (typeof directions)[number];

export type Cords = { x: number; y: number };

export interface Environment {
  isObstructed: (cords: Cords) => boolean;
  mapSize: Cords;
}

export interface Player {
  move: () => void;
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
    this.getPlayer().move();
  }
}
