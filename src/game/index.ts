import { Game } from './game';
export { Robot as Player } from './robot';
import { Tabletop as Environment } from './tabletop';

export const config = {
  tableSize: { x: 5, y: 5 },
};

export const game = new Game(new Environment(config.tableSize));
