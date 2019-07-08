import { Droppable } from '@shopify/draggable';
import Ship from './ship';
import { randomizeBoard, getRandomData } from './util';

function markShot(shot) {
  // TO-DO invalid move returns undefined shot!
  if (!shot) return;
  let type = 'miss2';
  if (shot.ship) {
    type = 'boom';
    if (shot.ship.hp === 0) {
      const ship = document.createElement('img');
      ship.className = `sunken ship ship-${shot.ship.length}`;
      if (!shot.ship.horizontal) { ship.classList.add('v-ship'); }
      ship.src = `../src/images/ship${shot.ship.length}.png`;
      document.querySelector(`.${shot.board}[data-x="${shot.ship.head.x}"][data-y="${shot.ship.head.y}"]`).appendChild(ship);
    }
  }
  const effect = document.createElement('img');
  effect.className = 'effect';
  effect.src = `./src/images/${type}.png`;
  document.querySelector(`.${shot.board}[data-x="${shot.x}"][data-y="${shot.y}"]`).appendChild(effect);
}

function disableBoard(boardDiv) {
  boardDiv.childNodes.forEach((e) => e.style.pointerEvents = 'none');
}

function enableBoard(boardDiv) {
  boardDiv.childNodes.forEach((e) => e.style.pointerEvents = 'auto');
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
          if (game.hasWinner()) {
            alert('Game is over!');
            disableBoard(board);
          } else if (!game.currentPlayer.human) {
            disableBoard(board);
          }
          if (!game.currentPlayer.human) {
            while (!game.currentPlayer.human) {
              markShot(game.randomMove());
            }
            if (game.hasWinner()) {
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

function start(game) {
  randomizeBoard(game.p2.board);
  game.start();
  if (game.started) {
    document.querySelector('#startBtn').style.pointerEvents = 'none';
    document.querySelector('#startBtn .btn').style.backgroundImage = "url('../src/images/btn-pressed.png')";
    enableBoard(document.querySelectorAll('.board')[1]);
    disableBoard(document.querySelectorAll('.board')[0]);
    alert('Game has started!')
  }
}

function reset(game) {
  alert('Please refresh you browser, lazy boy.')
}

function createButton(title, func) {
  const button = document.createElement('div');
  button.className = 'btn';
  button.addEventListener('click', func);
  const name = document.createElement('h1');
  name.innerHTML = `${title}<span>${title}</span>`;
  const buttonDiv = document.createElement('div');
  buttonDiv.appendChild(button);
  buttonDiv.appendChild(name);

  return buttonDiv;
}

function createPanel(game) {
  const panel = document.createElement('div');
  panel.className = 'panel';
  const startButton = createButton('start', () => start(game));
  startButton.id = 'startBtn';
  panel.appendChild(startButton);
  const resetButton = createButton('reset', () => reset(game));
  resetButton.id = 'resetBtn';
  panel.appendChild(resetButton);

  return panel;
}

function rotateShip(event, game) {
  const x = parseInt(event.target.parentElement.attributes['data-x'].value, 10);
  const y = parseInt(event.target.parentElement.attributes['data-y'].value, 10);
  const length = parseInt(event.target.attributes['data-length'].value, 10);
  const horizontal = (event.target.attributes['data-horizontal'].value === 'true');

  game.p1.board.removeShip(game.p1.board.getShip(x, y));

  const ship = new Ship(length, { x, y }, !horizontal);
  if (!game.p1.board.isValid(ship)) {
    game.p1.board.placeShip(new Ship(length, { x, y }, horizontal));
    return false;
  }
  if (horizontal) {
    event.target.attributes['data-horizontal'].value = 'false';
    event.target.classList.add('v-ship');
  } else {
    event.target.attributes['data-horizontal'].value = 'true';
    event.target.classList.remove('v-ship');
  }
  game.p1.board.placeShip(ship);
}

function createShips(game) {
  getRandomData().forEach((data) => {
    const ship = document.createElement('img');
    ship.className = `ship draggable ship-${data.len}`;
    ship.src = `../src/images/ship${data.len}.png`;
    ship.setAttribute('data-length', data.len);
    ship.setAttribute('data-horizontal', data.hor);
    if (!data.hor) {
      ship.classList.add('v-ship');
    }
    ship.addEventListener('click', () => rotateShip(event, game));
    document.querySelector(`.our[data-x="${data.x}"][data-y="${data.y}"]`).appendChild(ship);
    game.p1.board.placeShip(new Ship(data.len, { x: data.x, y: data.y }, data.hor));
  });
}

function handleDroppableStart(event, game) {
  if (event.dropzone.parentElement.classList.contains('board')) {
    const x = parseInt(event.data.dropzone.attributes['data-x'].value, 10);
    const y = parseInt(event.data.dropzone.attributes['data-y'].value, 10);
    const ship = game.p1.board.getShip(x, y);
    if (ship) { game.p1.board.removeShip(ship); }
  }
}

function handleDroppableDropped(event, game) {
  if (event.dropzone.parentElement.classList.contains('board')) {
    const x = parseInt(event.data.dropzone.attributes['data-x'].value, 10);
    const y = parseInt(event.data.dropzone.attributes['data-y'].value, 10);
    const length = parseInt(event.data.dragEvent.data.originalSource.attributes['data-length'].value, 10);
    const horizontal = (event.data.dragEvent.data.originalSource.attributes['data-horizontal'].value === 'true');
    const ship = new Ship(length, { x, y }, horizontal);
    if (!game.p1.board.isValid(ship)) {
      event.cancel();
    }
  }
}

function handleDroppableStop(event, game) {
  if (event.dropzone.classList.contains('cell')) {
    const x = parseInt(event.data.dropzone.attributes['data-x'].value, 10);
    const y = parseInt(event.data.dropzone.attributes['data-y'].value, 10);
    const length = parseInt(event.data.dragEvent.data.originalSource.attributes['data-length'].value, 10);
    const horizontal = (event.data.dragEvent.data.originalSource.attributes['data-horizontal'].value === 'true');
    const ship = new Ship(length, { x, y }, horizontal);
    game.p1.board.placeShip(ship);
  }
}

function initMainPage(game) {
  const body = document.querySelector('body');
  const content = document.createElement('div');
  content.className = 'content';

  const logo = document.createElement('h1');
  logo.className = 'logo';
  logo.innerHTML = 'BattleshiP<span>BattleshiP</span>';

  const ourBoardDiv = createBoard();
  const opponentBoardDiv = createBoard(game);
  const panelDiv = createPanel(game);
  disableBoard(opponentBoardDiv);

  content.appendChild(panelDiv);
  content.appendChild(ourBoardDiv);
  content.appendChild(opponentBoardDiv);

  body.appendChild(logo);
  body.appendChild(content);

  createShips(game);

  const droppable = new Droppable(content, { draggable: '.ship', dropzone: '.dropzone' });
  droppable.on('droppable:start', (evt) => { handleDroppableStart(evt, game); });
  droppable.on('droppable:dropped', (evt) => { handleDroppableDropped(evt, game); });
  droppable.on('droppable:stop', (evt) => { handleDroppableStop(evt, game); });
}


export {
  initMainPage,
};
