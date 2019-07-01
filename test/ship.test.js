import Ship from '../src/ship';

describe('#constructor', () => {
  it("shouldn't create ship object without length", () => {
    expect(() => new Ship()).toThrow(Error);
  });

  it("shouldn't create ship object without direction", () => {
    expect(() => new Ship(4)).toThrow(Error);
  });

  it('should assign hp', () => {
    const ship = new Ship(4, 0);
    expect(ship.hp).toBe(ship.length);
  });
});

// hit method
describe('#hit', () => {
  it('should decrease hp', () => {
    const ship = new Ship(4, 0);
    expect(ship.hp).toBe(4);
    ship.hit();
    expect(ship.hp).toBe(3);
  });
});


describe('#isSunk', () => {
  it('should return true if hp = 0', () => {
    const ship = new Ship(1, 0);
    expect(ship.isSunk()).toBeFalsy();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});
