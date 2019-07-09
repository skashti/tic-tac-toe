import { Injectable } from '@angular/core';
import { Square } from './square';
import { PlayerSymbole } from './player-symbole.enum';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  winningIndexes: number[][] = [
    [0, 1, 2],  // top row
    [3, 4, 5],  // middle row
    [6, 7, 8],  // bottom row
    [0, 3, 6],  // first col
    [1, 4, 7],  // second col
    [2, 5, 8],  // third col
    [0, 4, 8],  // first diagonal
    [2, 4, 6]   // second diagonal
  ];

  constructor() { }
  newGame(): Square[] {
    return [
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' }
    ];
  }

  isWinner(symbol: PlayerSymbole, board: Square[]): boolean {
    for (const pattern of this.winningIndexes) {
      const foundWinner = board[pattern[0]].value === symbol
        && board[pattern[1]].value === symbol
        && board[pattern[2]].value === symbol;

      if (foundWinner) {
        for (const index of pattern) {
          board[index].winner = true;
        }
        return true;
      }
    }
    return false;
  }

}
