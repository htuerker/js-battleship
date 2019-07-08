import GameLoop from '../src/game';
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

describe('#start', () => {
  it('should set the game started', () => {
    expect(game.started).toBeFalsy();
    randomizeBoard(game.p1.board);
    randomizeBoard(game.p2.board);
    game.start();
    expect(game.started).toBeTruthy();
  });
});

describe('#hasWinner', () => {
  it('should return winner if there is', () => {
    game.p1.board.ships = 1;
    game.p2.board.ships = 1;
    expect(game.hasWinner()).toBeNull();
    game.p2.board.ships = 0;
    expect(game.hasWinner()).toBe(p1);
  });
});

describe('#makeMove', () => {
  beforeEach(() => {
    game.started = true;
    game.over = false;
  });

  it('should take move, and send and attack', () => {
    expect(game.currentPlayer).toBe(p1);
    expect(game.p2.board.grid[0][0].hit).toBeFalsy();
    game.makeMove(0, 0);
    expect(game.p2.board.grid[0][0].hit).toBeTruthy();
  });

  it('should change player if move is valid and missed shot', () => {
    expect(game.currentPlayer).toBe(game.p1);
    expect(game.p2.board.getShip(0, 0)).toBeNull();
    game.makeMove(0, 0);
    expect(game.currentPlayer).toBe(game.p2);
  });
});
