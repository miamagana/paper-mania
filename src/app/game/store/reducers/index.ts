import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromConfig from './config.reducer';
import * as fromGame from './game.reducer';

export interface State {
  config: fromConfig.ConfigState;
  game: fromGame.GameState;
}

export const reducers: ActionReducerMap<State> = {
  config: fromConfig.configReducer,
  game: fromGame.gameReducer
};

export const getGameState = createFeatureSelector<State>('game');

export * from './config.reducer';
export * from './game.reducer';
