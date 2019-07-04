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

function initMainPage(game) {
  const body = document.querySelector('body');
  const content = document.createElement('div');
  content.className = 'content';
  body.appendChild(content);

  const ourBoard = document.createElement('div');
  ourBoard.className = 'board';
  ourBoard.setAttribute('id', 'our-board');
  const board2 = document.createElement('div');
  board2.className = 'board';
  const dock = document.createElement('div');
  dock.className = 'dock';

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell dropzone';
      cell.setAttribute('data-x', j);
      cell.setAttribute('data-y', i);
      ourBoard.appendChild(cell);
    }
  }

  dock.appendChild(createShip(1));
  dock.appendChild(createShip(2));
  dock.appendChild(createShip(3));

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

  content.appendChild(dock);
  content.appendChild(ourBoard);
  content.appendChild(board2);
}

export {
  initMainPage
};
