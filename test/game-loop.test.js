import GameLoop from '../src/game-loop';
import Player from '../src/player';
import Board from '../src/board';

let player;
let computer;
let board;
let game;

beforeEach(() => {
  player = new Player(true);
  computer = new Player(false);
  board = new Board();
  game = new GameLoop(player, computer, board);
});


it('should have contructor', () => {
  expect(game.p1).toEqual(player);
  expect(game.p2).toEqual(computer);
  expect(game.board).toEqual(board);
  expect(game.currentPlayer).toEqual(player);
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
    game.board.placeShip(0, 0, 2, true);
  });

  it('should take move, and send and attack', () => {
    expect(game.board.grid[0][0].ship).not.toBeNull();
    expect(game.board.grid[0][0].hit).toBeFalsy();
    game.makeMove(0, 0);
    expect(game.board.grid[0][0].hit).toBeTruthy();
    game.makeMove(1, 0);
    expect(game.board.grid[0][1].hit).toBeTruthy();
    expect(game.board.grid[0][1].ship.isSunk()).toBeTruthy();
  });

  it('should change player if move is valid and missed shot', () => {
    expect(game.currentPlayer).toBe(game.p1);
    game.makeMove(5, 5);
    expect(game.currentPlayer).toBe(game.p2);
  });
});
