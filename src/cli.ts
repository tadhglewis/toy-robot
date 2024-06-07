/* eslint-disable no-console */

import { select } from '@inquirer/prompts';
import { times } from 'lodash';

import { Player, config, game } from './game';
import type { Direction } from './game/game';
import { inputNumber } from './inquirer';
type Action = 'TURN_LEFT' | 'TURN_RIGHT' | 'MOVE';

const print = () => {
  const { player, environment } = game.report();

  const emptyRow = '[󠀠⋄⋄]'.repeat(environment.mapSize.x);

  const result: string[] = [];

  times(environment.mapSize.y, (y) => {
    // If the layer is on this row(y), fill each space manually
    if (player.cords.y === y) {
      const row = new Array(environment.mapSize.x).fill('[󠀠⋄⋄]');
      row[player.cords.x] = '[🤖]';

      result.push(row.join(''));
      return;
    }

    result.push(emptyRow);
  });

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
          (Number(string) >= 0 && Number(string) < config.tableSize.x) ||
          `X position must be between 0 and ${config.tableSize.x - 1}`,
      }),

      y: await inputNumber({
        message: 'Y position',
        validate: (string) =>
          (Number(string) >= 0 && Number(string) < config.tableSize.y) ||
          `Y position must be between 0 and ${config.tableSize.y - 1}`,
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

  game.place(new Player(cords, direction));
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
