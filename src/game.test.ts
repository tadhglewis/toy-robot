import { type Direction, Environment, Game, Robot } from './game';

let game: Game;
let environment: Environment;
let robot: Robot;

beforeEach(() => {
  game = new Game();
  environment = new Environment({ x: 0, y: 0 });
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

describe('Environment', () => {
  describe('isObstructed', () => {
    it('should not allow negative positions', () => {
      expect(environment.isObstructed({ x: -1, y: 0 })).toBe(true);
      expect(environment.isObstructed({ x: 0, y: -1 })).toBe(true);
      expect(environment.isObstructed({ x: -1, y: -1 })).toBe(true);
    });

    it('should not allow out of bounds positions', () => {
      expect(
        environment.isObstructed({ x: environment.mapSize.x + 1, y: 0 }),
      ).toBe(true);
    });

    it('should be obstructed if there is an object', () => {
      expect(environment.isObstructed({ x: 1, y: 0 })).toBe(true);
    });

    it('should allow in bound positions', () => {
      expect(environment.isObstructed({ x: 0, y: 0 })).toBe(false);
    });
  });
});

describe('Game', () => {
  it('should throw an error when robot has not been placed', () =>
    expect(() => game.report()).toThrowErrorMatchingInlineSnapshot(
      `"The robot has not been placed"`,
    ));

  it('should ignore robot placement if out of bounds', () => {
    game.place(-1, 0, 'NORTH');

    expect(() => game.report()).toThrowErrorMatchingInlineSnapshot(
      `"The robot has not been placed"`,
    );
  });

  it('should place robot in a specified position', () => {
    game.place(4, 4, 'SOUTH');

    expect(game.report().robot).toStrictEqual({
      cords: { x: 4, y: 4 },
      direction: 'SOUTH',
    });
  });

  it('should be re-placed if the robot has already been placed', () => {
    game.place(0, 0, 'NORTH');
    expect(game.report().robot).toStrictEqual({
      cords: { x: 0, y: 0 },
      direction: 'NORTH',
    });

    game.place(4, 4, 'SOUTH');
    expect(game.report().robot).toStrictEqual({
      cords: { x: 4, y: 4 },
      direction: 'SOUTH',
    });
  });

  it('should not fall off the map', () => {
    game.place(0, 0, 'SOUTH');

    game.move();

    expect(game.report().robot).toStrictEqual({
      cords: { x: 0, y: 0 },
      direction: 'SOUTH',
    });
  });

  it('should move forward', () => {
    game.place(0, 0, 'NORTH');
    game.move();

    expect(game.report().robot).toStrictEqual({
      cords: { x: 0, y: 1 },
      direction: 'NORTH',
    });
  });

  it('should be facing EAST when turning left from NORTH', () => {
    game.place(0, 0, 'NORTH');
    game.turnRight();

    expect(game.report().robot.direction).toBe('EAST');
  });

  it('should move around', () => {
    game.place(1, 2, 'EAST');
    game.move();
    game.move();
    game.turnLeft();
    game.move();

    expect(game.report().robot).toStrictEqual({
      cords: { x: 3, y: 3 },
      direction: 'NORTH',
    });
  });
});
