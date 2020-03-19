import { createSelector } from '@ngrx/store';
import { getGameState as getGameRootState } from '../reducers';

export const getGameState = createSelector(
  getGameRootState,
  state => state.game
);

export const getTotal = createSelector(getGameState, state => state.total);
export const getGainsPerSecond = createSelector(
  getGameState,
  state => state.gainsPerSecond
);
export const getGainsPerClick = createSelector(
  getGameState,
  state => state.gainsPerClick
);
