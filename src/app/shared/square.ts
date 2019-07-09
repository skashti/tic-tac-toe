import { PlayerSymbole } from './player-symbole.enum';

export interface Square {
  value: PlayerSymbole | '';
  winner?: boolean;
}
