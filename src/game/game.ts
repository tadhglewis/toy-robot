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
  turnLeft: () => void;
  turnRight: () => void;
  jump: () => void;
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

  addObstacle(cords: Cords) {
    const playerCords = this.getPlayer().report().cords;
    const isObstructed = this.environment.isObstructed(cords);

    if (
      isObstructed &&
      cords.x !== playerCords.x &&
      cords.y !== playerCords.y
    ) {
      this.environment.addObstacle(cords);
    }
  }
}
