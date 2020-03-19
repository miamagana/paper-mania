import { createSelector } from '@ngrx/store';
import { getGameState } from '../reducers';

export const getConfigState = createSelector(
  getGameState,
  state => state.config
);

export const getMusicState = createSelector(
  getConfigState,
  state => state.music
);

export const getSoundState = createSelector(
  getConfigState,
  state => state.sound
);
