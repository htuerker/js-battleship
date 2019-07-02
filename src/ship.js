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

  hit() {
    this.hp -= 1;
  }

  isSunk() {
    return this.hp <= 0;
  }
}
