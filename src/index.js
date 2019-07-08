import './styles.scss';
<<<<<<< Updated upstream
import font from './fonts/metalslug.ttf';
import GameLoop from './game-loop';
=======
import Game from './game';
>>>>>>> Stashed changes
import Player from './player';
import Board from './board';
import {initMainPage} from './dom-util';

((function init() {
  const p1Board = new Board();
  const p2Board = new Board();
  const p1 = new Player(true, p1Board);
  const p2 = new Player(false, p2Board);
  const game = new Game(p1, p2);
  initMainPage(game);
})());

console.log(font)
