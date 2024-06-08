import type { Cords, Direction, Environment, Player } from './game';
import { Movement } from './movement';

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
    const newPosition = Movement.move(this.cords, this.direction);

    if (this.environment.isObstructed(newPosition)) {
      return;
    }

    this.cords = newPosition;
  }

  back() {
    const newPosition = Movement.move(this.cords, this.direction, -1);

    if (this.environment.isObstructed(newPosition)) {
      return;
    }

    this.cords = newPosition;
  }

  jump() {
    const newPosition = Movement.move(this.cords, this.direction, 2);

    if (this.environment.isObstructed(newPosition)) {
      return;
    }

    this.cords = newPosition;
  }

  turnLeft() {
    this.direction = Movement.turnLeft(this.direction);
  }

  turnRight() {
    this.direction = Movement.turnRight(this.direction);
  }

  report() {
    return { cords: this.cords, direction: this.direction };
  }
}
