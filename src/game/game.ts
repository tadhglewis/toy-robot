export const directions = [
  'NORTH',
  'NORTH_EAST',
  'EAST',
  'SOUTH_EAST',
  'SOUTH',
  'SOUTH_WEST',
  'WEST',
  'NORTH_WEST',
] as const;
export type Direction = (typeof directions)[number];

export type Cords = { x: number; y: number };

export interface Environment {
  isObstructed: (cords: Cords) => boolean;
  addObstacle: (cords: Cords) => void;
  mapSize: Cords;
  obstacles: Map<number, Set<number>>;
}

export interface Player {
  move: () => void;
  back: () => void;
  jump: () => void;
  teleport: (cords: Cords) => void;
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
        obstacles: this.environment.obstacles,
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

  back() {
    this.getPlayer().back();
  }

  jump() {
    this.getPlayer().jump();
  }

  teleport(cords: Cords) {
    this.getPlayer().teleport(cords);
  }

  addObstacle(cords: Cords) {
    const playerCords = this.getPlayer().report().cords;

    if (cords.x === playerCords.x && cords.y === playerCords.y) {
      return;
    }

    this.environment.addObstacle(cords);
  }
}
