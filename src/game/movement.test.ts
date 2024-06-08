import { times } from 'lodash';

import type { Direction } from './game';
import { Movement } from './movement';

describe('Movement', () => {
  describe('turnLeft', () => {
    it.each<[Direction, number]>([
      ['WEST', 1],
      ['SOUTH', 2],
      ['EAST', 3],
      ['NORTH', 4],
    ])('should be facing %s when turning %i time(s)', (result, turns) => {
      let direction: Direction = 'NORTH';

      times(turns, () => (direction = Movement.turnLeft(direction)));

      expect(direction).toBe(result);
    });
  });

  describe('turnRight', () => {
    it.each<[Direction, number]>([
      ['EAST', 1],
      ['SOUTH', 2],
      ['WEST', 3],
      ['NORTH', 4],
    ])('should be facing %s when turning %i time(s)', (result, turns) => {
      let direction: Direction = 'NORTH';

      times(turns, () => (direction = Movement.turnRight(direction)));

      expect(direction).toBe(result);
    });
  });

  describe('move', () => {
    it('should move by one space in the current direction', () => {
      expect(Movement.move({ x: 0, y: 0 }, 'NORTH')).toStrictEqual({
        x: 0,
        y: 1,
      });

      expect(Movement.move({ x: 0, y: 10 }, 'NORTH')).toStrictEqual({
        x: 0,
        y: 11,
      });

      expect(Movement.move({ x: 0, y: 0 }, 'EAST')).toStrictEqual({
        x: 1,
        y: 0,
      });
    });
  });
});
