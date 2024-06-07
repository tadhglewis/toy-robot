import {
  type Cords,
  type Direction,
  type Environment,
  type Player,
  directions,
} from './game';

export class Robot implements Player {
  private cords: Cords;
  private direction: Direction;
  private environment: Environment;

  constructor(cords: Cords, direction: Direction, environment: Environment) {
    this.cords = cords;
    this.direction = direction;
    this.environment = environment;
  }

  move() {
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
      x: this.cords.x + compassCordsMap[this.direction].x,
      y: this.cords.y + compassCordsMap[this.direction].y,
    };

    if (this.environment.isObstructed(newPosition)) {
      return;
    }

    this.cords = newPosition;
  }

  private turn(turn: number) {
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
