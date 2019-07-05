import './styles.scss';
import GameLoop from './game-loop';
import Player from './player';
import Board from './board';
import {initMainPage} from './dom-util';

((function init() {
  const p1Board = new Board();
  const p2Board = new Board();
  const p1 = new Player(true, p1Board);
  const p2 = new Player(false, p2Board);
  const game = new GameLoop(p1, p2);
  initMainPage(game);
})());
