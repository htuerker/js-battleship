import GameLoop from '../src/game-loop';
import Player from '../src/player';
import Board from '../src/board';

let p1;
let p2;
let p1Board;
let p2Board;
let game;

beforeEach(() => {
  p1Board = new Board();
  p2Board = new Board();
  p1 = new Player(true, p1Board);
  p2 = new Player(false, p2Board);
  game = new GameLoop(p1, p2);
});


it('should have contructor', () => {
  expect(game.p1).toEqual(p1);
  expect(game.p2).toEqual(p2);
  expect(game.p1.board).toEqual(p1Board);
  expect(game.p2.board).toEqual(p2Board);
  expect(game.currentPlayer).toEqual(p1);
  expect(game.isStarted).toBeFalsy();
  expect(game.isOver).toBeFalsy();
});


describe('#start', () => {
  it('should set the game started', () => {
    expect(game.isStarted).toBeFalsy();
    game.start();
    expect(game.isStarted).toBeTruthy();
  });
});

describe('#makeMove', () => {
  beforeEach(() => {
    game.start();
    game.p2.board.placeShip(0, 0, 2, true);
  });

  it('should take move, and send and attack', () => {
    expect(game.currentPlayer).toBe(p1);
    expect(game.p2.board.grid[0][0].ship).not.toBeNull();
    expect(game.p2.board.grid[0][0].hit).toBeFalsy();
    game.makeMove(0, 0);
    expect(game.p2.board.grid[0][0].hit).toBeTruthy();
    game.makeMove(1, 0);
    expect(game.p2.board.grid[0][1].hit).toBeTruthy();
    expect(game.p2.board.grid[0][1].ship.isSunk()).toBeTruthy();
  });

  it('should change player if move is valid and missed shot', () => {
    expect(game.currentPlayer).toBe(game.p1);
    game.makeMove(5, 5);
    expect(game.currentPlayer).toBe(game.p2);
  });
});
