class Environment {
  mapUnitSize: number;

  constructor() {
    this.mapUnitSize = 5;
  }

  private isWithinMap(x: number, y: number) {
    return (
      x <= this.mapUnitSize &&
      x >= -this.mapUnitSize &&
      y <= this.mapUnitSize &&
      y >= -this.mapUnitSize
    );
  }

  isObstructed(x: number, y: number) {
    return !this.isWithinMap(x, y);
  }
}

const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'] as const;
export type Direction = (typeof directions)[number];

export class Robot {
  private x: number;
  private y: number;
  private direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  move() {
    return undefined;
  }

  turnLeft() {
    const currentDirection = directions.indexOf(this.direction);
    // Get left direction of current direction
    // or far right if left is out of bounds
    const nextDirection = directions[currentDirection - 1] ?? directions.at(-1);

    // There is always a direction available using last item in array
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.direction = nextDirection!;
  }

  turnRight() {
    const currentDirection = directions.indexOf(this.direction);
    // Get left direction of current direction
    // or far right if left is out of bounds
    const nextDirection = directions[currentDirection + 1] ?? directions.at(0);

    // There is always a direction available using last item in array
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.direction = nextDirection!;
  }

  report() {
    return { x: this.x, y: this.y, direction: this.direction };
  }
}

export class Game {
  private environment: Environment;
  private robot: Robot | null;

  constructor() {
    this.environment = new Environment();
    this.robot = null;
  }

  place(x: number, y: number, direction: Direction) {
    if (this.environment.isObstructed(x, y)) {
      throw new Error('Robot cannot be placed here');
    }

    this.robot = new Robot(x, y, direction);
  }

  report() {
    if (!this.robot) throw new Error('Robot has not been placed');

    return this.robot.report();
  }

  turnLeft() {
    if (!this.robot) throw new Error('Robot has not been placed');

    this.robot.turnLeft();
  }

  turnRight() {
    if (!this.robot) throw new Error('Robot has not been placed');

    this.robot.turnRight();
  }

  getMapSize() {
    return this.environment.mapUnitSize;
  }
}
