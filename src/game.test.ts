import { type Direction, Environment, Robot } from './game';

let robot: Robot;
let environment: Environment;

beforeEach(() => {
  robot = new Robot(0, 0, 'NORTH');
  environment = new Environment();
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

describe('Environment', () => {
  describe('isObstructed', () => {
    it('should not allow negative positions', () => {
      expect(environment.isObstructed({ x: -1, y: 0 })).toBe(true);
      expect(environment.isObstructed({ x: 0, y: -1 })).toBe(true);
      expect(environment.isObstructed({ x: -1, y: -1 })).toBe(true);
    });

    it('should not allow out of bounds positions', () => {
      expect(
        environment.isObstructed({ x: environment.mapUnitSize + 1, y: 0 }),
      ).toBe(true);
    });

    it('should allow in bound positions', () => {
      expect(environment.isObstructed({ x: 0, y: 0 })).toBe(false);
    });
  });
});
