import { Action, createReducer, on } from '@ngrx/store';
import * as GameActions from '../actions/game.actions';

export interface GameState {
  total: number;
  gainsPerClick: number;
  gainsPerSecond: number;
}

export const initialGameState: GameState = {
  total: 0,
  gainsPerClick: 1,
  gainsPerSecond: 1
};

const reducer = createReducer(
  initialGameState,
  on(GameActions.userClick, state => ({
    ...state,
    total: state.total + state.gainsPerClick
  })),
  on(GameActions.incrementPerSecond, state => ({
    ...state,
    total: state.total + state.gainsPerSecond
  })),
  on(GameActions.incrementBought, (state, action) => ({
    ...state,
    total: state.total - action.payload.cost,
    gainsPerSecond: state.gainsPerSecond + action.payload.gainsPerSecond
  }))
);

export function gameReducer(state: GameState | undefined, action: Action) {
  return reducer(state, action);
}
