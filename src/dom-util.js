import { Droppable } from '@shopify/draggable';

function createShip(length) {
  const shipSpot = document.createElement('div');
  shipSpot.className = 'dropzone draggable-dropzone--occupied';
  const ship = document.createElement('div');
  ship.className = 'ship draggable';
  ship.setAttribute('data-length', length);
  shipSpot.appendChild(ship);

  return shipSpot;
}

function createBoard(game) {
    const board = document.createElement('div');
    board.className = 'board';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        if (game) {
            cell.className = 'cell';
            cell.addEventListener('click', () => {
                game.makeMove(j, i);
                console.log(game.p2.board.grid)
                toggleBoard(game, board);
                if (!game.currentPlayer.human) {
                    while (!game.currentPlayer.human) {
                        game.randomMove();
                        console.log(game.p1.board.grid)
                    }
                    toggleBoard(game, board);
                }
            });
        } else {
            cell.className = 'cell dropzone';
        }
        cell.setAttribute('data-x', j);
        cell.setAttribute('data-y', i);
        board.appendChild(cell);
      }
    }

    return board;
}

function toggleBoard(game, board) {
    if (game.currentPlayer == game.p2) {
        board.childNodes.forEach((e) => e.style.pointerEvents = 'none');
    } else {
        board.childNodes.forEach((e) => e.style.pointerEvents = 'auto');
    }
}

function initMainPage(game) {
  game.start();
  const body = document.querySelector('body');
  const content = document.createElement('div');
  content.className = 'content';

  const ourBoard = createBoard();
  const opponentBoard = createBoard(game);

  const dock = document.createElement('div');
  dock.className = 'dock';
  dock.appendChild(createShip(1));
  dock.appendChild(createShip(1));
  dock.appendChild(createShip(2));
  dock.appendChild(createShip(2));
  dock.appendChild(createShip(3));
  dock.appendChild(createShip(3));
  dock.appendChild(createShip(4));

  content.appendChild(dock);
  content.appendChild(ourBoard);
  content.appendChild(opponentBoard);

  body.appendChild(content);

  const droppable = new Droppable(content, {
      draggable: '.ship',
      dropzone: '.dropzone',
  });

  droppable.on('droppable:start', (evt) => {
    if (evt.dropzone.parentElement.classList.contains('board')) {
      const x = parseInt(evt.data.dropzone.attributes['data-x'].value, 10);
      const y = parseInt(evt.data.dropzone.attributes['data-y'].value, 10);
      game.p1.board.removeShip(x, y);
      console.log(game.p1.board.grid);
    }
  });
  droppable.on('droppable:dropped', (evt) => {
    const x = parseInt(evt.data.dropzone.attributes['data-x'].value, 10);
    const y = parseInt(evt.data.dropzone.attributes['data-y'].value, 10);
    const length = parseInt(evt.data.dragEvent.data.originalSource.attributes['data-length'].value, 10);
    if (!game.p1.board.isValid(x, y, length, true)) {
      evt.cancel();
    }
  });

  droppable.off();

  droppable.on('droppable:stop', (evt) => {
    evt.cancel();
    const x = parseInt(evt.data.dropzone.attributes['data-x'].value, 10);
    const y = parseInt(evt.data.dropzone.attributes['data-y'].value, 10);
    const length = parseInt(evt.data.dragEvent.data.originalSource.attributes['data-length'].value, 10);
    if (game.p1.board.placeShip(x, y, length, true)) {
      console.log(game.p1.board.grid);
    }
  });

}

export {
  initMainPage
};
