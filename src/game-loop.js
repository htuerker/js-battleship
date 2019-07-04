export default class GameLoop {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.currentPlayer = p1;
    this.started = false;
    this.over = false;
  }

  start() {
    this.randomizeComputerBoard(this.p2.board);
    if (this.p1.board.ships === 7 && this.p2.board.ships === 7) {
      this.started = true;
    }
  }

  hasWinner() {
    let winner;
    if (this.p1.board.ships <= 0) {
      this.over = true;
      winner = this.p1;
    }
    if (this.p2.board.ships <= 0) {
      this.over = true;
      winner = this.p2;
    }
    console.log(winner);
    return winner;
  }

  makeMove(x, y) {
    const opponent = (
      (this.currentPlayer === this.p1) ? this.p2 : this.p1);

    if (this.started && !this.over) {
      if (!opponent.board.isHit(x, y)) {
        console.log(`you're attacking to x:${x} y:${y}`);
        console.log(opponent.board.grid);
        opponent.board.receiveAttack(x, y);
        if (!opponent.board.isShip(x, y)) {
          console.log('You missed!');
          this.currentPlayer = opponent;
        } else {
          console.log('You hit the ship!');
        }
      }
    }
  }

  randomMove() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    const opponent = (
      (this.currentPlayer === this.p1) ? this.p2 : this.p1);

    if (this.started && !this.over) {
      if (!opponent.board.isHit(x, y)) {
        console.log(`computer's attacking to x:${x} y:${y}`);
        console.log(opponent.board.grid);
        opponent.board.receiveAttack(x, y);
        if (!opponent.board.isShip(x, y)) {
          console.log('Computer missed!');
          this.currentPlayer = opponent;
        } else {
          console.log('Computer hit the ship!');
        }
      }
    }
  }

  randomizeComputerBoard(board) {
    board.placeShip(0, 0, 1, true);
    board.placeShip(2, 0, 1, true);
    board.placeShip(4, 0, 2, true);
    board.placeShip(7, 0, 2, true);
    board.placeShip(0, 2, 3, true);
    board.placeShip(4, 2, 3, true);
    board.placeShip(0, 4, 4, true);
  }
}
