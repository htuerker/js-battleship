export default class Ship {
  constructor(length, direction) {
    if (typeof length === 'undefined') {
      throw new Error('length must be specified');
    }
    if (typeof direction === 'undefined') {
      throw new Error('direction must be specified');
    }

    this.length = length;
    this.direction = direction;
    this.hp = length;
  }

  hit() {
    this.hp -= 1;
  }

  isSunk() {
    return this.hp <= 0;
  }
}
