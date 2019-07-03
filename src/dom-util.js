function initMainPage() {
  const body = document.querySelector('body');
  const content = document.createElement('div');
  content.className = 'content';
  body.appendChild(content);

  const board1 = document.createElement('div');
  board1.className = 'board';
  const board2 = document.createElement('div');
  board2.className = 'board';
  const dock = document.createElement('div');
  dock.className = 'dock';
  dock.addEventListener('drop', () => drop(event));
  dock.addEventListener('dragover', () => allowDrop(event));

  for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
          let board1Cell = document.createElement('div');
          let board2Cell = document.createElement('div');
          board1Cell.setAttribute('x', j);
          board1Cell.setAttribute('y', i);
          board1Cell.addEventListener('drop', () => drop(event));
          board1Cell.addEventListener('dragover', () => allowDrop(event));
          board2Cell.setAttribute('x', j);
          board2Cell.setAttribute('y', i);
          board1.appendChild(board1Cell);
          board2.appendChild(board2Cell);
      }
  }

  const ship1 = document.createElement('div');
  ship1.id = 'ship1';
  ship1.className = 'ship1';
  ship1.setAttribute('length', '3');
  ship1.setAttribute('draggable', 'true');
  ship1.addEventListener('dragstart', () => drag(event));
  dock.appendChild(ship1);

  const ship2 = document.createElement('div');
  ship2.id = 'ship2';
  ship2.className = 'ship2';
  ship2.setAttribute('length', '2');
  ship2.setAttribute('draggable', 'true');
  ship2.addEventListener('dragstart', () => drag(event));
  dock.appendChild(ship2);

  content.appendChild(dock);
  content.appendChild(board1);
  content.appendChild(board2);
}

function drag(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("id");
  ev.target.appendChild(document.getElementById(data));
}

export { initMainPage };
