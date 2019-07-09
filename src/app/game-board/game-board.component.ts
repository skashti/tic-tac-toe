import { Component, OnInit } from '@angular/core';
import { PlayerSymbole } from '../shared/player-symbole.enum';
import { Player } from '../shared/player';
import { Square } from '../shared/square';
import { BoardService } from '../shared/board.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  PLAYER_HUMAN_A: Player = { name: 'Player A', symbol: PlayerSymbole.x };
  PLAYER_HUMAN_B: Player = { name: 'Player B', symbol: PlayerSymbole.o };
  DRAW = { name: 'Draw' };

  board: Square[];
  currentPlayer: Player = this.PLAYER_HUMAN_A;
  lastWinner: any;
  gameOver: boolean;
  boardLocked: boolean;
  scoreA = 0;
  scoreB = 0;

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.newGame();
  }
  newGame() {
    this.board = this.boardService.newGame();
    this.gameOver = false;
  }
  square_click(square: Square): void {
    if (square.value === '' && !this.gameOver) {
      square.value = this.currentPlayer.symbol;
      // Winner
      if (this.boardService.isWinner(this.currentPlayer.symbol, this.board)) {
        this.gameOver = true;
        this.lastWinner = this.currentPlayer;
        this.currentPlayer === this.PLAYER_HUMAN_A ? this.scoreA++ : this.scoreB++ ;
        return;
      }
      // no winner found board is not full => next round
      if (this.board.some(s => s.value === '')) {
        this.togglePlayer();
        return;
      }
      // board is not full => draw
      this.gameOver = true;
      this.lastWinner = this.DRAW;
    }
  }

  togglePlayer(): void {
    if (this.currentPlayer === this.PLAYER_HUMAN_A) {
      this.currentPlayer = this.PLAYER_HUMAN_B;
    } else {
      this.currentPlayer = this.PLAYER_HUMAN_A;
    }
  }

}
