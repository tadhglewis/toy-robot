/* eslint-disable no-console */

import { input, select } from '@inquirer/prompts';

import { type Direction, Game } from './game';
import { Robot } from './robot';
import { Tabletop } from './tabletop';

type Action = 'TURN_LEFT' | 'TURN_RIGHT' | 'MOVE';

const game = new Game(new Tabletop({ x: 5, y: 5 }));

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
  const x = await input({
    message: 'X position',
    validate: (value) => typeof Number(value) === 'number',
  });

  const y = await input({
    message: 'Y position',
    validate: (value) => typeof Number(value) === 'number',
  });

  const direction = await select<Direction>({
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
  });

  game.place(new Robot(Number(x), Number(y), direction));
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
