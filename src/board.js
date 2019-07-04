import Ship from './ship';

export default class Board {
  constructor() {
    this.grid = Array.from(Array(10), () => (
      Array.from(Array(10), () => ({ hit: false, ship: null }))));
    this.ships = 0;
  }

  placeShip(x, y, length, horizontal) {
    const positions = [];
    for (let i = 0; i < length; i++) {
      if (horizontal) {
        positions.push([x + i, y]);
      } else {
        positions.push([x, y + i]);
      }
    }
    let ship;
    if (positions.every(pos => this.isAvailable(pos))) {
      ship = new Ship(length, { x, y }, horizontal);
      positions.forEach((pos) => { this.grid[pos[1]][pos[0]].ship = ship; });
      this.ships += 1;
    }
    return ship;
  }

  removeShip(x, y) {
    const ship = this.grid[y][x].ship;
    for (let i = 0; i < ship.length; i++) {
      if (ship.horizontal) {
        this.grid[y][x + i].ship = null;
      } else {
        this.grid[y + i][x].ship = null;
      }
    }
    this.ships -= 1;
  }

  receiveAttack(x, y) {
    const target = this.grid[y][x];
    target.hit = true;
    if (target.ship) {
      target.ship.hit();
      if (target.ship.isSunk()) {
        this.ships -= 1;
      }
    }
  }

  isAvailable(pos) {
    if (pos[0] >= 0 && pos[0] <= 9 && pos[1] >= 0 && pos[1] <= 9) {
      if (pos[0] < 9 && this.grid[pos[1]][pos[0] + 1].ship) {
        return false;
      }
      if (pos[0] > 0 && this.grid[pos[1]][pos[0] - 1].ship) {
        return false;
      }
      if (pos[1] < 9 && this.grid[pos[1] + 1][pos[0]].ship) {
        return false;
      }
      if (pos[1] > 0 && this.grid[pos[1] - 1][pos[0]].ship) {
        return false;
      }
      if (this.grid[pos[1]][pos[0]].ship) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }

  isValid(x, y, length, horizontal) {
    const positions = [];
    for (let i = 0; i < length; i++) {
      if (horizontal) {
        positions.push([x + i, y]);
      } else {
        positions.push([x, y + i]);
      }
    }
    return positions.every(pos => this.isAvailable(pos))
  }

  isHit(x, y) {
    return this.grid[y][x].hit;
  }

  isShip(x, y) {
    return this.grid[y][x].ship;
  }
}
