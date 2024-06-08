import { times } from 'lodash';

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
      ['WEST', 1],
      ['SOUTH', 2],
      ['EAST', 3],
      ['NORTH', 4],
    ])('should be facing %s when turning %i time(s)', (result, turns) => {
      times(turns, () => robot.turnLeft());

      expect(robot.report().direction).toBe(result);
    });
  });

  describe('turnRight', () => {
    it.each<[Direction, number]>([
      ['EAST', 1],
      ['SOUTH', 2],
      ['WEST', 3],
      ['NORTH', 4],
    ])('should be facing %s when turning %i time(s)', (result, turns) => {
      times(turns, () => robot.turnRight());

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
