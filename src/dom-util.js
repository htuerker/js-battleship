function dragShip(ev, board) {
  const ourBoard = document.getElementById('our-board');
  if (ev.target.parentElement.parentElement === ourBoard) {
    const x = parseInt(ev.srcElement.parentElement.attributes.x.value, 10);
    const y = parseInt(ev.srcElement.parentElement.attributes.y.value, 10);
    board.removeShip(x, y);
  }
  ev.dataTransfer.setData('id', ev.target.id);
}

function allowDropShip(ev) {
  ev.preventDefault();
}

function dropShip(ev, board) {
  const data = ev.dataTransfer.getData('id');
  console.log(data)
  const shipDiv = document.getElementById(data);
  if (board) {
      console.log(ev.srcElement)
      let x;
      let y;
    if (ev.srcElement.classList.contains('cell')) {
        x = parseInt(ev.srcElement.attributes.x.value, 10);
        y = parseInt(ev.srcElement.attributes.y.value, 10);
    } else {
        x = parseInt(ev.srcElement.parentElement.attributes.x.value, 10);
        y = parseInt(ev.srcElement.parentElement.attributes.y.value, 10);
    }
    const length = parseInt(shipDiv.getAttribute('length'), 10);
    if (board.grid[y][x].ship) {
        document.querySelector('.dock').appendChild(shipDiv);
    } else {
        board.placeShip(x, y, length, true);
        if (board.grid[y][x].ship) {
          ev.target.appendChild(shipDiv);
          console.log(`ship placed at x:${x} y:${y}`);
          console.log(board.grid);
        } else {
          document.querySelector('.dock').appendChild(shipDiv);
        }
    }
  } else {
    ev.target.appendChild(shipDiv);
  }
  ev.preventDefault();
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
  dock.addEventListener('drop', () => dropShip(event));
  dock.addEventListener('dragover', () => allowDropShip(event));

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.setAttribute('x', j);
      cell.setAttribute('y', i);
      cell.addEventListener('drop', () => dropShip(event, game.p1.board));
      cell.addEventListener('dragover', () => allowDropShip(event));
      ourBoard.appendChild(cell);
    }
  }

  const ship1 = document.createElement('div');
  ship1.id = 'ship1';
  ship1.className = 'ship1';
  ship1.setAttribute('length', '1');
  ship1.setAttribute('draggable', 'true');
  ship1.addEventListener('dragstart', () => dragShip(event, game.p1.board));
  dock.appendChild(ship1);

  const ship2 = document.createElement('div');
  ship2.id = 'ship2';
  ship2.className = 'ship2';
  ship2.setAttribute('length', '2');
  ship2.setAttribute('draggable', 'true');
  ship2.addEventListener('dragstart', () => dragShip(event, game.p1.board));
  dock.appendChild(ship2);

  content.appendChild(dock);
  content.appendChild(ourBoard);
  content.appendChild(board2);
}

export {initMainPage};
