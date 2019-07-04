export default class GameLoop {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.currentPlayer = p1;
    this.isStarted = false;
    this.isOver = false;
  }

  start() {
    this.isStarted = true;
  }

  makeMove(x, y) {
    const opponent = (
      (this.currentPlayer === this.p1) ? this.p2 : this.p1);

    if (this.isStarted && !this.isOver) {
      if (!opponent.board.isHit(x, y)) {
        opponent.board.receiveAttack(x, y);
        if (!opponent.board.isShip(x, y)) {
          this.currentPlayer = opponent;
        } else {
          // dom.hitWater(x, y);
        }
      }
    }
  }

  randomMove() {
      const x = Math.floor(Math.random()*10);
      const y = Math.floor(Math.random()*10);
      console.log(`x:${x} y:${y}`)
      const opponent = (
        (this.currentPlayer === this.p1) ? this.p2 : this.p1);

      if (this.isStarted && !this.isOver) {
        if (!opponent.board.isHit(x, y)) {
          opponent.board.receiveAttack(x, y);
          if (!opponent.board.isShip(x, y)) {
            this.currentPlayer = opponent;
          } else {
            // dom.hitWater(x, y);
          }
        }
      }
  }
}
