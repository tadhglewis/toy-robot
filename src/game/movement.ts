import { type Cords, type Direction, directions } from './game';

class MovementHandler {
  move(cords: Cords, direction: Direction) {
    const directionAxisMap: Record<Direction, { x: number; y: number }> = {
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
      x: cords.x + directionAxisMap[direction].x,
      y: cords.y + directionAxisMap[direction].y,
    };

    return newPosition;
  }

  private turn(direction: Direction, turn: number) {
    const currentDirection = directions.indexOf(direction);
    // Get left direction of current direction
    // or far right if left is out of bounds
    const newDirection =
      directions[currentDirection + turn] ??
      directions.at((currentDirection + turn) % directions.length);

    // There is always a direction available using last item in array
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return newDirection!;
  }

  turnLeft(direction: Direction) {
    return this.turn(direction, -1);
  }

  turnRight(direction: Direction) {
    return this.turn(direction, +1);
  }
}

export const Movement = new MovementHandler();
