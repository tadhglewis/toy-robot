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

  turnLeft() {
    const newDirection = Movement.turnLeft(this.direction);

    this.direction = newDirection;
  }

  turnRight() {
    const newDirection = Movement.turnRight(this.direction);

    this.direction = newDirection;
  }

  report() {
    return { cords: this.cords, direction: this.direction };
  }
}
