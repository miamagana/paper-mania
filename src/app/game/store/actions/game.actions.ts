import { createAction, props } from '@ngrx/store';
import { ShopItem } from '../../models/shop-item';

export const userClick = createAction('[Game] User click');
export const incrementPerSecond = createAction('[Game] Increment per second');
export const buyItem = createAction(
  '[Game] Buy Item',
  props<{ payload: ShopItem }>()
);
export const getShopItems = createAction('[Game] Get Shop Items');
export const getShopItemsSuccess = createAction(
  '[Game] Get Shop Items Success',
  props<{ payload: ShopItem[] }>()
);
export const getShopItemsFailure = createAction(
  '[Game] Get Shop Items Failure'
);
export const openShop = createAction('[Game] Open Shop');

// To save the game in a backend in firebase maybe export const saveGame = createAction('[Game] Save Game');
// get the game data
