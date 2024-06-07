import { Tabletop } from './tabletop';

let tabletop: Tabletop;

beforeEach(() => {
  tabletop = new Tabletop({ x: 5, y: 5 });
});

describe('Tabletop', () => {
  describe('isObstructed', () => {
    it('should not allow negative positions', () => {
      expect(tabletop.isObstructed({ x: -1, y: 0 })).toBe(true);
      expect(tabletop.isObstructed({ x: 0, y: -1 })).toBe(true);
      expect(tabletop.isObstructed({ x: -1, y: -1 })).toBe(true);
    });

    it('should not allow out of bounds positions', () => {
      expect(tabletop.isObstructed({ x: tabletop.mapSize.x + 1, y: 0 })).toBe(
        true,
      );
    });

    it('should allow in bound positions', () => {
      expect(tabletop.isObstructed({ x: 0, y: 0 })).toBe(false);
    });
  });
});
