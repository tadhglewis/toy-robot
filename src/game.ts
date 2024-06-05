export class Environment {
  mapUnitSize: number;

  constructor() {
    this.mapUnitSize = 5;
  }

  private isWithinMap(x: number, y: number) {
    return x <= this.mapUnitSize && x >= 0 && y <= this.mapUnitSize && y >= 0;
  }

  isObstructed({ x, y }: Cords) {
    return !this.isWithinMap(x, y);
  }
}

const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'] as const;
export type Direction = (typeof directions)[number];

type Cords = { x: number; y: number };

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
    this.environment = new Environment();
    this.robot = null;
  }

  place(x: number, y: number, direction: Direction) {
    if (this.environment.isObstructed({ x, y })) {
      throw new Error('Robot cannot be placed here');
    }

    this.robot = new Robot(x, y, direction);
  }

  report() {
    // We should just enforce robot placement
    if (!this.robot) throw new Error('Robot has not been placed');

    return this.robot.report();
  }

  turnLeft() {
    // We should just enforce robot placement
    if (!this.robot) throw new Error('Robot has not been placed');

    this.robot.turnLeft();
  }

  turnRight() {
    // We should just enforce robot placement
    if (!this.robot) throw new Error('Robot has not been placed');

    this.robot.turnRight();
  }

  move() {
    // We should just enforce robot placement
    if (!this.robot) throw new Error('Robot has not been placed');

    const { cords, direction } = this.robot.report();

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

    this.robot.move(newPosition);
  }

  getMapSize() {
    return this.environment.mapUnitSize;
  }
}
