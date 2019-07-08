export default class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.currentPlayer = p1;
    this.started = false;
    this.over = false;
  }

  start() {
    if (this.p1.board.ships === 7 && this.p2.board.ships === 7) {
      this.started = true;
    }
    return this.started;
  }

  hasWinner() {
    let winner = null;
    if (this.p1.board.ships <= 0) {
      this.over = true;
      winner = this.p2;
    }
    if (this.p2.board.ships <= 0) {
      this.over = true;
      winner = this.p1;
    }
    return winner;
  }

  makeMove(x, y) {
    const opponent = (
      (this.currentPlayer === this.p1) ? this.p2 : this.p1);

    if (this.started && !this.over) {
      if (!opponent.board.isHit(x, y)) {
        opponent.board.receiveAttack(x, y);
        if (!opponent.board.getShip(x, y)) {
          this.currentPlayer = opponent;
        }
        const board = (opponent === this.p1) ? 'own' : 'opp';
        return { x, y, board, ship: opponent.board.grid[y][x].ship };
      }
    }
  }

  randomMove() {
    const opponent = (
      (this.currentPlayer === this.p1) ? this.p2 : this.p1);

    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (opponent.board.isHit(x, y)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }

    return this.makeMove(x, y);
  }
}
