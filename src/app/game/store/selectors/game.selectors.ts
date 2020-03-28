import { createSelector } from '@ngrx/store';
import * as fromGame from '../reducers';

export const getGameState = createSelector(
  fromGame.getGameState,
  state => state.game
);

export const getTotal = createSelector(getGameState, state => state.total);
export const getCurrent = createSelector(getGameState, state => state.current);
export const getGainsPerSecond = createSelector(
  getGameState,
  state => state.gainsPerSecond
);
export const getGainsPerClick = createSelector(
  getGameState,
  state => state.gainsPerClick
);

export const getLevel = createSelector(getGameState, state => state.level);

export const getCurrenItemsState = createSelector(
  getGameState,
  state => state.currentItems
);

export const {
  selectAll: selectCurrentItems
} = fromGame.itemAdapter.getSelectors(getCurrenItemsState);

export const getShopItemsState = createSelector(
  getGameState,
  state => state.shopItems
);

export const { selectAll: selectShopItems } = fromGame.itemAdapter.getSelectors(
  getShopItemsState
);
