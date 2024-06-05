export class Environment {
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

const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'] as const;
export type Direction = (typeof directions)[number];

type Cords = { x: number; y: number };

// 1. Move into movements class
// 2. Add a robot implentation and implement it

export class Robot {
  private cords: Cords;
  private direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this.cords = { x, y };
    this.direction = direction;
  }

  move(cords: Cords) {
    this.cords = cords;
  }

  turn(turn: number) {
    const currentDirection = directions.indexOf(this.direction);
    // Get left direction of current direction
    // or far right if left is out of bounds
    const nextDirection =
      directions[currentDirection + turn] ??
      directions.at((currentDirection + turn) % directions.length);

    // There is always a direction available using last item in array
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.direction = nextDirection!;
  }

  turnLeft() {
    this.turn(-1);
  }

  turnRight() {
    this.turn(+1);
  }

  report() {
    return { cords: this.cords, direction: this.direction };
  }
}

export class Game {
  private environment: Environment;
  private robot: Robot | null;

  constructor() {
    this.environment = new Environment({ x: 5, y: 5 });
    this.robot = null;
  }

  place(x: number, y: number, direction: Direction) {
    if (this.environment.isObstructed({ x, y })) {
      return;
    }

    this.robot = new Robot(x, y, direction);
  }

  report() {
    return {
      robot: this.getRobot().report(),
      environment: {
        objects: this.environment.objects,
        mapSize: this.environment.mapSize,
      },
    };
  }

  private getRobot() {
    if (!this.robot) {
      throw new Error('The robot has not been placed');
    }

    return this.robot;
  }

  turnLeft() {
    this.getRobot().turnLeft();
  }

  turnRight() {
    this.getRobot().turnRight();
  }

  move() {
    const { cords, direction } = this.getRobot().report();

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

    this.getRobot().move(newPosition);
  }
}
