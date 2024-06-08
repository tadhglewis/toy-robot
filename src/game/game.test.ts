import { Game } from './game';
import { Robot } from './robot';
import { Tabletop } from './tabletop';

let game: Game;
const tabletop = new Tabletop({ x: 5, y: 5 });

beforeEach(() => {
  game = new Game(tabletop);
});

describe('Game', () => {
  it('should throw an error when player has not been placed', () =>
    expect(() => game.report()).toThrowErrorMatchingInlineSnapshot(
      `"The player has not been placed"`,
    ));

  it('should ignore player placement if out of bounds', () => {
    game.place(new Robot({ x: -1, y: 0 }, 'NORTH', tabletop));

    expect(() => game.report()).toThrowErrorMatchingInlineSnapshot(
      `"The player has not been placed"`,
    );
  });

  it('should place player in a specified position', () => {
    game.place(new Robot({ x: 4, y: 4 }, 'SOUTH', tabletop));

    expect(game.report().player).toStrictEqual({
      cords: { x: 4, y: 4 },
      direction: 'SOUTH',
    });
  });

  it('should be re-placed if the player has already been placed', () => {
    game.place(new Robot({ x: 0, y: 0 }, 'NORTH', tabletop));
    expect(game.report().player).toStrictEqual({
      cords: { x: 0, y: 0 },
      direction: 'NORTH',
    });

    game.place(new Robot({ x: 4, y: 4 }, 'SOUTH', tabletop));
    expect(game.report().player).toStrictEqual({
      cords: { x: 4, y: 4 },
      direction: 'SOUTH',
    });
  });

  it('should not fall off the map', () => {
    game.place(new Robot({ x: 0, y: 0 }, 'SOUTH', tabletop));

    game.move();

    expect(game.report().player).toStrictEqual({
      cords: { x: 0, y: 0 },
      direction: 'SOUTH',
    });
  });

  it('should move forward', () => {
    game.place(new Robot({ x: 0, y: 0 }, 'NORTH', tabletop));
    game.move();

    expect(game.report().player).toStrictEqual({
      cords: { x: 0, y: 1 },
      direction: 'NORTH',
    });
  });

  it('should be facing EAST when turning left from NORTH', () => {
    game.place(new Robot({ x: 0, y: 0 }, 'NORTH', tabletop));
    game.turnRight();

    expect(game.report().player.direction).toBe('EAST');
  });

  it('should move around', () => {
    game.place(new Robot({ x: 1, y: 2 }, 'EAST', tabletop));
    game.move();
    game.move();
    game.turnLeft();
    game.move();

    expect(game.report().player).toStrictEqual({
      cords: { x: 3, y: 3 },
      direction: 'NORTH',
    });
  });
});
