import Board from '../src/board';

it('should have constructor', () => {
    let board = new Board();
    expect(board.grid.length).toBe(10);
    expect(board.grid[0].length).toBe(10);
    expect(typeof board.ships).toBeDefined();
});
