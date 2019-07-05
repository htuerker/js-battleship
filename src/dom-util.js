import { Droppable } from '@shopify/draggable';

function createShip(length) {
  const shipSpot = document.createElement('div');
  shipSpot.className = 'dropzone draggable-dropzone--occupied';
  const ship = document.createElement('img');
  ship.className = 'ship draggable ship-' + length;
  ship.src = '../src/images/ship' + length + '.png';
  ship.setAttribute('data-length', length);
  shipSpot.appendChild(ship);

  return shipSpot;
}

function markShot(shot) {
    let type = 'miss2';
    if (shot.ship) {
        type = 'boom';
        if (shot.ship.hp == 0) {
            const ship = document.createElement('img');
            ship.className = 'ship ship-' + shot.ship.length;
            ship.src = '../src/images/ship' + shot.ship.length + '.png';
            document.querySelector('.other[data-x="' + shot.ship.head.x + '"][data-y="' + shot.ship.head.y + '"]').appendChild(ship);
        }
    }
    const effect = document.createElement('img');
    effect.className = 'effect';
    effect.src = '../src/images/' + type + '.png';
    document.querySelector('.' + shot.board + '[data-x="' + shot.x + '"][data-y="' + shot.y + '"]').appendChild(effect);
}

function disableBoard(board) {
  board.childNodes.forEach((e) => e.style.pointerEvents = 'none');
}

function enableBoard(board) {
  board.childNodes.forEach((e) => e.style.pointerEvents = 'auto');
}

function createBoard(game) {
  const board = document.createElement('div');
  board.className = 'board';
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      if (game) {
        cell.className = 'other cell';
        cell.addEventListener('click', () => {
          markShot(game.makeMove(j, i));
          if(game.hasWinner()) {
            alert('Game is over!');
            disableBoard(board);
          } else {
            if (!game.currentPlayer.human) {
              disableBoard(board);
            }
          }
          if (!game.currentPlayer.human) {
            while (!game.currentPlayer.human) {
              markShot(game.randomMove());
            }
            if(game.hasWinner()) {
              alert('Game is over!');
            } else {
              enableBoard(board);
            }
          }
        });
      } else {
        cell.className = 'our cell dropzone';
      }
      cell.setAttribute('data-x', j);
      cell.setAttribute('data-y', i);
      board.appendChild(cell);
    }
  }
  return board;
}

function initMainPage(game) {
  const body = document.querySelector('body');
  const content = document.createElement('div');
  content.className = 'content';

  const logo = document.createElement('img');
  logo.className = 'logo';
  logo.src = '../src/images/ship1.png';

  const startButton = document.createElement('button');
  startButton.innerHTML = 'Start';
  startButton.className = 'btn';
  startButton.addEventListener('click', () => {
    game.start();
    if (game.started) {
      startButton.style.pointerEvents = 'none';
      enableBoard(opponentBoard);
      disableBoard(ourBoard);
    }
  });

  const randomButton = document.createElement('button');
  randomButton.innerHTML = 'Random';
  randomButton.className = 'btn';
  randomButton.addEventListener('click', () => {
    game.randomizeComputerBoard(game.p1.board);
  });

  const dock = document.createElement('div');
  dock.className = 'dock';
  dock.appendChild(createShip(1));
  dock.appendChild(createShip(1));
  dock.appendChild(createShip(2));
  dock.appendChild(createShip(2));
  dock.appendChild(createShip(3));
  dock.appendChild(createShip(3));
  dock.appendChild(createShip(4));

  const ourBoard = createBoard();
  const opponentBoard = createBoard(game);
  disableBoard(opponentBoard);

  content.appendChild(dock);
  content.appendChild(ourBoard);
  content.appendChild(opponentBoard);

  body.appendChild(logo);
  body.appendChild(startButton);
  body.appendChild(randomButton);
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
