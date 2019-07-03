export default class GameLoop {
  constructor(p1, p2, board) {
    this.p1 = p1;
    this.p2 = p2;
    this.board = board;
    this.currentPlayer = p1;
    this.isStarted = false;
    this.isOver = false;
  }

  start() {
    this.isStarted = !this.isStarted;
  }

  makeMove(x, y) {
    if (this.isStarted && !this.isOver) {
      if (!this.board.isHit(x, y)) {
        this.board.receiveAttack(x, y);
        if (!this.board.isShip(x, y)) {
          this.currentPlayer = (
            this.currentPlayer === this.p1 ? this.p2 : this.p1);
          // dom.hitShip(x, y);
        } else {
          // dom.hitWater(x, y);
        }
      }
    }
  }
}
