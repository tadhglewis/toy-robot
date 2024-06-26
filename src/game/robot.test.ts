import _ from 'lodash';

import type { Direction } from './game';
import { Robot } from './robot';
import { Tabletop } from './tabletop';

let robot: Robot;
const tabletop = new Tabletop({ x: 5, y: 5 });

beforeEach(() => {
  robot = new Robot({ x: 0, y: 0 }, 'NORTH', tabletop);
});

describe('Robot', () => {
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
      _.times(turns, () => robot.turnLeft());

      expect(robot.report().direction).toBe(result);
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
      _.times(turns, () => robot.turnRight());

      expect(robot.report().direction).toBe(result);
    });
  });

  describe('move', () => {
    it('should move by one space in the current direction', () => {
      robot.move();
      expect(robot.report()).toStrictEqual({
        cords: {
          x: 0,
          y: 1,
        },
        direction: 'NORTH',
      });

      robot.move();
      robot.move();
      expect(robot.report()).toStrictEqual({
        cords: {
          x: 0,
          y: 3,
        },
        direction: 'NORTH',
      });
    });
  });
});
