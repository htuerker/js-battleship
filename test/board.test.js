import Board from '../src/board';
import Ship from '../src/ship';

it('should have constructor', () => {
  const board = new Board();
  expect(board.grid.length).toBe(10);
  expect(board.grid[0].length).toBe(10);
  expect(board.ships).toBe(0);
});

describe('#placeShip', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  it('should place a horizontal ship', () => {
    const horizontalShip = new Ship(2, { x: 0, y: 0 }, true);
    board.placeShip(horizontalShip);
    expect(board.grid[0][0].ship).not.toBeNull();
    expect(board.grid[0][1].ship).not.toBeNull();
  });

  it('should place a vertical ship', () => {
    const verticalShip = new Ship(2, { x: 0, y: 0 }, false);
    board.placeShip(verticalShip);
    expect(board.grid[0][0].ship).not.toBeNull();
    expect(board.grid[1][0].ship).not.toBeNull();
  });

  it('should not place invalid ships', () => {
    const invalidShip = new Ship(5, { x: 9, y: 9 }, false);
    board.placeShip(invalidShip);
    expect(board.grid[5][9].ship).toBeNull();
  });

  it('should increment ships counter after placing a ship', () => {
    expect(board.ships).toBe(0);
    board.placeShip(new Ship(2, { x: 0, y: 0 }, true));
    expect(board.ships).toBe(1);
  });
});

describe('#receiveAttack', () => {
  let board;
  let ship;
  beforeEach(() => {
    board = new Board();
    ship = new Ship(2, { x: 0, y: 0 }, true);
    board.placeShip(ship);
  });

  it('should damage a ship', () => {
    expect(board.grid[0][0].hit).toBeFalsy();
    expect(board.grid[0][0].ship.hp).toBe(2);
    board.receiveAttack(0, 0);
    expect(board.grid[0][0].hit).toBeTruthy();
    expect(board.grid[0][0].ship.hp).toBe(1);
  });

  it('should register a missed shot', () => {
    expect(board.grid[9][9].ship).toBeNull();
    expect(board.grid[9][9].hit).toBeFalsy();
    board.receiveAttack(9, 9);
    expect(board.grid[9][9].hit).toBeTruthy();
  });

  it('should register a sunken ship', () => {
    expect(board.grid[0][0].ship).not.toBeNull();
    expect(board.ships).toBe(1);
    board.receiveAttack(0, 0);
    expect(board.ships).toBe(1);
    board.receiveAttack(1, 0);
    expect(board.ships).toBe(0);
  });
});

describe('#removeShip', () => {
  let board;
  let ship;

  beforeEach(() => {
    board = new Board();
    ship = new Ship(2, { x: 0, y: 0 }, true);
    board.placeShip(ship);
  });

  it('should remove ship located at the given coordinate with all ship parts', () => {
    board.removeShip(0, 0);
    expect(board.grid[0][0].ship).toBeNull();
    expect(board.grid[0][1].ship).toBeNull();
  });

  it('should only decrease ships count if there\'s a removed ship', () => {
    expect(board.grid[9][9].ship).toBeNull();
    expect(board.ships).toBe(1);
    board.removeShip(9, 9);
    expect(board.ships).toBe(1);
  });
});


describe('#isAvailable', () => {
  it('should return true if there\'s no ship placed ', () => {
  });
});
