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
      for (let i = 0; i < turns; i++) {
        robot.turnLeft();
      }

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
      for (let i = 0; i < turns; i++) {
        robot.turnRight();
      }

      expect(robot.report().direction).toBe(result);
    });
  });
});
