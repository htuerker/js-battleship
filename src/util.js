import Ship from './ship';

function randomizeBoard(board) {
  board.placeShip(new Ship(1, { x: 0, y: 0 }, true));
  board.placeShip(new Ship(1, { x: 2, y: 0 }, true));
  board.placeShip(new Ship(2, { x: 4, y: 0 }, true));
  board.placeShip(new Ship(2, { x: 7, y: 0 }, true));
  board.placeShip(new Ship(3, { x: 0, y: 2 }, true));
  board.placeShip(new Ship(3, { x: 4, y: 2 }, true));
  board.placeShip(new Ship(4, { x: 0, y: 4 }, true));
}


export {
  randomizeBoard,
}
