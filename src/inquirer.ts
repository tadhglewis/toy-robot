import { input } from '@inquirer/prompts';

// Inquirer removed number inputs during their migration to reduce package size.
// https://github.com/SBoudrias/Inquirer.js/issues/1383#issuecomment-2041575124
export const inputNumber = async (...args: Parameters<typeof input>) =>
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
