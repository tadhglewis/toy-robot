import { type Direction, Robot } from './game';

let robot: Robot;

beforeEach(() => {
  robot = new Robot(0, 0, 'NORTH');
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
