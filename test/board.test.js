import Board from '../src/board';

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

  it('should place given ship on the board', () => {
    expect(board.grid[0][0].ship).toBeNull();
    board.placeShip(0, 0, 1, true);
    expect(board.grid[0][0].ship).not.toBeNull();
    expect(board.grid[6][6].ship).toBeNull();
  });

  it('should place a horizontal ship', () => {
    expect(board.grid[0][0].ship).toBeNull();
    board.placeShip(0, 0, 2, true);
    expect(board.grid[0][0].ship).not.toBeNull();
    expect(board.grid[0][1].ship).not.toBeNull();
  });

  it('should place a vertical ship', () => {
    expect(board.grid[0][0].ship).toBeNull();
    board.placeShip(0, 0, 2, false);
    expect(board.grid[0][0].ship).not.toBeNull();
    expect(board.grid[0][1].ship).toBeNull();
    expect(board.grid[1][0].ship).not.toBeNull();
  });

  it('should not place invalid ships', () => {
    board.placeShip(9, 5, 2, true);
    expect(board.grid[5][9].ship).toBeNull();
    board.placeShip(5, 9, 2, false);
    expect(board.grid[9][5].ship).toBeNull();
  });

  it('should increment ships counter after placing a ship', () => {
    expect(board.ships).toBe(0);
    board.placeShip(0, 0, 2, true);
    expect(board.ships).toBe(1);
  });
});

describe('#receiveAttack', () => {
  let board;
  beforeEach(() => {
    board = new Board();
  });

  it('should damage a ship', () => {
    board.placeShip(0, 0, 4, true);
    expect(board.grid[0][0].hit).toBeFalsy();
    expect(board.grid[0][0].ship.hp).toBe(4);
    board.receiveAttack(0, 0);
    expect(board.grid[0][0].hit).toBeTruthy();
    expect(board.grid[0][0].ship.hp).toBe(3);
  });

  it('should register a missed shot', () => {
    expect(board.grid[0][0].ship).toBeNull();
    expect(board.grid[0][0].hit).toBeFalsy();
    board.receiveAttack(0, 0);
    expect(board.grid[0][0].hit).toBeTruthy();
  });

  it('should register a sunken ship', () => {
    board.placeShip(0, 0, 2, true);
    expect(board.ships).toBe(1);
    board.receiveAttack(0, 0);
    expect(board.ships).toBe(1);
    board.receiveAttack(1, 0);
    expect(board.ships).toBe(0);
  });
});
