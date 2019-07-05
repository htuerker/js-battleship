export default class Ship {
  constructor(length, head, horizontal) {
    if (typeof length === 'undefined') {
      throw new Error('length must be specified');
    }
    if (typeof horizontal === 'undefined') {
      throw new Error('direction must be specified');
    }

    this.length = length;
    this.head = head;
    this.horizontal = horizontal;
    this.hp = length;
  }

  getPositions() {
    const positions = [];
    for (let i = 0; i < this.length; i++) {
      if (this.horizontal) {
        positions.push({ x: this.head.x + i, y: this.head.y });
      } else {
        positions.push({ x: this.head.x, y: this.head.y + i });
      }
    }
    return positions;
  }

  hit() {
    this.hp -= 1;
  }

  isSunk() {
    return this.hp <= 0;
  }
}
