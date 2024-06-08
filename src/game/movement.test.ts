import _ from 'lodash';

import type { Direction } from './game';
import { Movement } from './movement';

describe('Movement', () => {
  describe('turnLeft', () => {
    it.each<[Direction, number]>([
      ['NORTH_WEST', 1],
      ['WEST', 2],
      ['SOUTH_WEST', 3],
      ['SOUTH', 4],
      ['SOUTH_EAST', 5],
      ['EAST', 6],
      ['NORTH_EAST', 7],
      ['NORTH', 8],
    ])('should be facing %s when turning %i time(s)', (result, turns) => {
      let direction: Direction = 'NORTH';

      _.times(turns, () => (direction = Movement.turnLeft(direction)));

      expect(direction).toBe(result);
    });
  });

  describe('turnRight', () => {
    it.each<[Direction, number]>([
      ['NORTH_EAST', 1],
      ['EAST', 2],
      ['SOUTH_EAST', 3],
      ['SOUTH', 4],
      ['SOUTH_WEST', 5],
      ['WEST', 6],
      ['NORTH_WEST', 7],
      ['NORTH', 8],
    ])('should be facing %s when turning %i time(s)', (result, turns) => {
      let direction: Direction = 'NORTH';

      _.times(turns, () => (direction = Movement.turnRight(direction)));

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
