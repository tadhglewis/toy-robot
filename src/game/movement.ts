import { type Cords, type Direction, directions } from './game';

class MovementSingleton {
  move(cords: Cords, direction: Direction, distance = 1) {
    const directionAxisMap: Record<Direction, { x: number; y: number }> = {
      NORTH: {
        x: 0,
        y: distance,
      },
      NORTH_EAST: {
        x: distance,
        y: distance,
      },
      EAST: {
        x: distance,
        y: 0,
      },
      SOUTH_EAST: {
        x: distance,
        y: -distance,
      },
      SOUTH: {
        x: 0,
        y: -distance,
      },
      SOUTH_WEST: {
        x: -distance,
        y: -distance,
      },
      WEST: {
        x: -distance,
        y: 0,
      },
      NORTH_WEST: {
        x: -distance,
        y: distance,
      },
    };

    const newPosition = {
      x: cords.x + directionAxisMap[direction].x,
      y: cords.y + directionAxisMap[direction].y,
    };

    return newPosition;
  }

  private turn(direction: Direction, times: number) {
    const currentDirection = directions.indexOf(direction);
    // Get left direction of current direction
    // or far right if left is out of bounds
    const newDirection =
      directions[currentDirection + times] ??
      directions.at((currentDirection + times) % directions.length);

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

export const Movement = new MovementSingleton();
