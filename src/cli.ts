/* eslint-disable no-console */

import { input, select } from '@inquirer/prompts';

import { type Direction, Game } from './game';

type Action = 'PLACE' | 'TURN_LEFT' | 'TURN_RIGHT' | 'REPORT';

const game = new Game();

const main = async () => {
  const action = await select<Action>({
    message: 'Robot commands',
    choices: [
      {
        name: 'Place',
        value: 'PLACE',
        description: 'Place the robot in the environment',
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
      {
        name: 'Report',
        value: 'REPORT',
        description: 'Report the current state of the robot',
      },
    ],
  });

  if (action === 'PLACE') {
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

    game.place(Number(x), Number(y), direction);
  }

  if (action === 'TURN_LEFT') {
    game.turnLeft();
  }

  if (action === 'TURN_RIGHT') {
    game.turnRight();
  }

  if (action === 'REPORT') {
    const { x, y, direction } = game.report();

    const visualDirectionMap: Record<Direction, string> = {
      NORTH: '⬆️',
      EAST: '➡️',
      SOUTH: '⬇️',
      WEST: '⬅️',
    };

    console.table({
      x,
      y,
      direction: visualDirectionMap[direction],
      facing: direction,
    });
  }

  await main();
};

main().catch((e) => console.log(e));
