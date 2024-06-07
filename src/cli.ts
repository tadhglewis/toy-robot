/* eslint-disable no-console */

import { input, select } from '@inquirer/prompts';

import { type Direction, Game } from './game';
import { Robot } from './robot';
import { Tabletop } from './tabletop';

type Action = 'TURN_LEFT' | 'TURN_RIGHT' | 'MOVE';

const tableSize = { x: 5, y: 5 };

const game = new Game(new Tabletop(tableSize));

// Inquirer removed number inputs during their migration to reduce package size.
// https://github.com/SBoudrias/Inquirer.js/issues/1383#issuecomment-2041575124
const inputNumber = async (...args: Parameters<typeof input>) =>
  parseInt(
    await input({
      ...args[0],
      validate: (value) => {
        if (Number.isNaN(value)) {
          return 'You must provide a valid number';
        }

        if (args[0].validate) {
          return args[0].validate(value);
        }

        return true;
      },
    }),
    10,
  );

const print = () => {
  const { player, environment } = game.report();

  const result = [];

  for (let y = 0; y < environment.mapSize.y; y++) {
    let row = '';

    for (let x = 0; x < environment.mapSize.x; x++) {
      if (player.cords.x === x && player.cords.y === y) {
        row += '[🤖]';
        continue;
      }

      if (environment.objects.has(`${x}:${y}`)) {
        row += '[🗿]';
        continue;
      }

      row += '[󠀠⋄⋄]';
    }

    result.push(row);
  }

  const visualDirectionMap: Record<Direction, string> = {
    NORTH: '⬆️',
    EAST: '➡️',
    SOUTH: '⬇️',
    WEST: '⬅️',
  };

  console.log(
    result.reverse().join('\n'),
    '\n\n',
    `Direction: ${visualDirectionMap[player.direction]}`,
  );
};

const startGameMenu = async () => {
  const { cords, direction } = {
    cords: {
      x: await inputNumber({
        message: 'X position',
        validate: (string) =>
          (Number(string) >= 0 && Number(string) < tableSize.x) ||
          `X position must be between 0 and ${tableSize.x - 1}`,
      }),

      y: await inputNumber({
        message: 'Y position',
        validate: (string) =>
          (Number(string) >= 0 && Number(string) < tableSize.y) ||
          `Y position must be between 0 and ${tableSize.y - 1}`,
      }),
    },
    direction: await select<Direction>({
      message: 'Direction',
      choices: [
        {
          name: 'North',
          value: 'NORTH',
        },
        {
          name: 'East',
          value: 'EAST',
        },
        {
          name: 'South',
          value: 'SOUTH',
        },
        {
          name: 'West',
          value: 'WEST',
        },
      ],
    }),
  };

  game.place(new Robot(cords, direction));
};

const actionResolver: Record<Action, () => void | Promise<void>> = {
  TURN_LEFT: () => game.turnLeft(),
  TURN_RIGHT: () => game.turnRight(),
  MOVE: () => game.move(),
};

const main = async () => {
  await startGameMenu();

  while (true) {
    console.clear();
    print();

    const action = await select<Action>({
      message: 'Robot commands',
      choices: [
        {
          name: 'Move',
          value: 'MOVE',
          description: 'Move the robot forward',
        },
        {
          name: 'Turn left',
          value: 'TURN_LEFT',
          description: 'Turn the robot left',
        },
        {
          name: 'Turn right',
          value: 'TURN_RIGHT',
          description: 'Turn the robot right',
        },
      ],
    });

    await actionResolver[action]();
  }
};

main().catch((e) => console.log(e));
