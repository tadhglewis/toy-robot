import { type Cords, type Direction, type Player, directions } from './game';

export class Robot implements Player {
  private cords: Cords;
  private direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this.cords = { x, y };
    this.direction = direction;
  }

  move(cords: Cords) {
    this.cords = cords;
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
