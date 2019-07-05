import Ship from './ship';

export default class Board {
  constructor() {
    this.grid = Array.from(Array(10), () =>
      Array.from(Array(10), () => ({hit: false, ship: null})),
    );
    this.ships = 0;
  }

  placeShip(ship) {
    if (this.isValid(ship)) {
      ship.getPositions().forEach((pos) => {
        this.grid[pos.y][pos.x].ship = ship;
      });
      this.ships += 1;
    }
    return ship;
  }

  removeShip(ship) {
    if (ship) {
      ship.getPositions().forEach(pos => this.grid[pos.y][pos.x].ship = null);
      this.ships -= 1;
    }
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

  isValid(ship) {
    return ship.getPositions().every(pos => this.isAvailable(pos));
  }

  isHit(x, y) {
    return this.grid[y][x].hit;
  }

  getShip(x, y) {
    return this.grid[y][x].ship;
  }

  isAvailable(pos) {
    if (pos.x >= 0 && pos.x <= 9 && pos.y >= 0 && pos.y <= 9) {
      if (pos.x < 9 && this.grid[pos.y][pos.x + 1].ship) {
        return false;
      }
      if (pos.x > 0 && this.grid[pos.y][pos.x - 1].ship) {
        return false;
      }
      if (pos.y < 9 && this.grid[pos.y + 1][pos.x].ship) {
        return false;
      }
      if (pos.y > 0 && this.grid[pos.y - 1][pos.x].ship) {
        return false;
      }
      if (this.grid[pos.y][pos.x].ship) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }
}
