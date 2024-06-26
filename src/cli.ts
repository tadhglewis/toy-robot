/* eslint-disable no-console */

import { select } from '@inquirer/prompts';
import _ from 'lodash';

import { Player, config, environment, game } from './game';
import type { Direction } from './game/game';
import { inputNumber } from './inquirer';

const actions = {
  MOVE: {
    name: 'Move',
    value: 'MOVE',
    description: 'Move the robot forward',
    action: () => game.move(),
  },
  BACK: {
    name: 'Back',
    value: 'BACK',
    description: 'Move the robot backwards',
    action: () => game.back(),
  },
  JUMP: {
    name: 'Jump',
    value: 'JUMP',
    description: 'Jump forward two spaces',
    action: () => game.jump(),
  },
  TELEPORT: {
    name: 'Teleport',
    value: 'TELEPORT',
    description: 'Teleport to a specified position',
    action: async () => {
      const cords = await askForCords();

      game.teleport(cords);
    },
  },
  TURN_LEFT: {
    name: 'Turn left',
    value: 'TURN_LEFT',
    description: 'Turn the robot left',
    action: () => game.turnLeft(),
  },
  TURN_RIGHT: {
    name: 'Turn right',
    value: 'TURN_RIGHT',
    description: 'Turn the robot right',
    action: () => game.turnRight(),
  },
  ADD_OBSTACLE: {
    name: 'Add obstacle',
    value: 'ADD_OBSTACLE',
    description: 'Add an obstacle to the environment',
    action: async () => {
      const cords = await askForCords();

      game.addObstacle(cords);
    },
  },
} as const;

type Action = keyof typeof actions;

const print = () => {
  const { player, environment: gameEnvironment } = game.report();

  const emptyRow = '[󠀠⋄⋄]'.repeat(gameEnvironment.mapSize.x);

  const rows = _.range(0, gameEnvironment.mapSize.y).map((y) => {
    const isPlayerRow = player.cords.y === y;
    const rowObstacles = gameEnvironment.obstacles.get(y);

    // Return an empty row if nothing is on the y(row)
    if (!isPlayerRow && !rowObstacles) {
      return emptyRow;
    }

    const row = new Array(gameEnvironment.mapSize.x).fill('[󠀠⋄⋄]');

    if (isPlayerRow) {
      row[player.cords.x] = '[🤖]';
    }

    if (rowObstacles) {
      for (const rowObstacle of rowObstacles) {
        row[rowObstacle] = '[🚧]';
      }
    }

    return row.join('');
  });

  const result = rows.reverse().join('\n');

  const visualDirectionMap: Record<Direction, string> = {
    NORTH: '⬆️',
    NORTH_EAST: '↗️',
    EAST: '➡️',
    SOUTH_EAST: '↘️',
    SOUTH: '⬇️',
    SOUTH_WEST: '↙️',
    WEST: '⬅️',
    NORTH_WEST: '↖️',
  };

  console.log(
    result,
    '\n\n',
    `Direction: ${visualDirectionMap[player.direction]}`,
  );
};

const askForCords = async () => ({
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
});

const startGameMenu = async () => {
  const { cords, direction } = {
    cords: await askForCords(),
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

  game.place(new Player(cords, direction, environment));
};

const main = async () => {
  await startGameMenu();

  while (true) {
    console.clear();
    print();

    const command = await select<Action>({
      message: 'Robot commands',
      choices: Object.entries(actions).map(
        ([__, { name, description, value }]) => ({
          name,
          description,
          value,
        }),
      ),
    });

    await actions[command].action();
  }
};

main().catch((e) => console.log(e));
