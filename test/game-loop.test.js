import GameLoop from '../src/game-loop';
import Player from '../src/player';
import Board from '../src/board';
import { randomizeBoard } from '../src/util';

let p1;
let p2;
let p1Board;
let p2Board;
let game;

beforeEach(() => {
  p1Board = new Board();
  p2Board = new Board();
  p1 = new Player(true, p1Board);
  p2 = new Player(true, p2Board);
  game = new GameLoop(p1, p2);
});


it('should have contructor', () => {
  expect(game.p1).toEqual(p1);
  expect(game.p2).toEqual(p2);
  expect(game.p1.board).toEqual(p1Board);
  expect(game.p2.board).toEqual(p2Board);
  expect(game.currentPlayer).toEqual(p1);
  expect(game.started).toBeFalsy();
  expect(game.over).toBeFalsy();
});


describe('#start', () => {
  it('should set the game started', () => {
    expect(game.started).toBeFalsy();
    randomizeBoard(game.p1.board);
    randomizeBoard(game.p2.board);
    game.start();
    expect(game.started).toBeTruthy();
  });
});

describe('#makeMove', () => {
  beforeEach(() => {
    randomizeBoard(game.p1.board);
    randomizeBoard(game.p2.board);
    game.start();
  });

  it('should take move, and send and attack', () => {
    expect(game.currentPlayer).toBe(p1);
    expect(game.p2.board.grid[0][0].ship).not.toBeNull();
    expect(game.p2.board.grid[0][0].hit).toBeFalsy();
    expect(game.p2.board.grid[0][0].ship.isSunk()).toBeFalsy();
    game.makeMove(0, 0);
    expect(game.p2.board.grid[0][0].hit).toBeTruthy();
    expect(game.p2.board.grid[0][0].ship.isSunk()).toBeTruthy();
  });

  it('should change player if move is valid and missed shot', () => {
    expect(game.currentPlayer).toBe(game.p1);
    game.makeMove(5, 5);
    expect(game.currentPlayer).toBe(game.p2);
  });
});
