import { Action, createReducer, on } from '@ngrx/store';
import * as GameActions from '../actions/game.actions';
import { ShopItem } from '../../models/shop-item';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { getTexture } from '../../utils/utils';

export interface ShopItemState extends EntityState<ShopItem> {}
export interface GameState {
  total: number;
  texture: string;
  gainsPerClick: number;
  gainsPerSecond: number;
  currentItems: ShopItemState;
  shopItems: ShopItemState;
}

export const itemAdapter: EntityAdapter<ShopItem> = createEntityAdapter<
  ShopItem
>();

export const initialGameState: GameState = {
  total: 0,
  gainsPerClick: 500,
  gainsPerSecond: 0,
  texture: '1',
  currentItems: itemAdapter.getInitialState(),
  shopItems: itemAdapter.getInitialState()
};

const reducer = createReducer(
  initialGameState,
  on(GameActions.userClick, state => ({
    ...state,
    total: state.total + state.gainsPerClick
  })),
  on(GameActions.incrementPerSecond, state => {
    return {
      ...state,
      total: state.total + state.gainsPerSecond
    };
  }),
  on(GameActions.getShopItemsSuccess, (state, action) => ({
    ...state,
    shopItems: itemAdapter.setAll(action.payload, state.shopItems)
  })),
  on(GameActions.getShopItemsFailure, state => ({
    ...state,
    shopItems: itemAdapter.removeAll(state.shopItems)
  })),
  on(GameActions.buyItem, (state, action) => {
    const newItem: Partial<ShopItem> = {
      level: action.payload.level + 1,
      cost: action.payload.cost * 2,
      gainsPerClick: action.payload.gainsPerClick * 2,
      gainsPerSec: action.payload.gainsPerSec * 2
    };
    const gains: number =
      state.gainsPerSecond +
      action.payload.gainsPerSec +
      (state.gainsPerClick + action.payload.gainsPerClick);
    const texture: string = getTexture(gains, +state.texture);
    return {
      ...state,
      texture,
      total: state.total - action.payload.cost,
      gainsPerSecond: state.gainsPerSecond + action.payload.gainsPerSec,
      gainsPerClick: state.gainsPerClick + action.payload.gainsPerClick,
      currentItems: itemAdapter.upsertOne(action.payload, state.currentItems),
      shopItems: itemAdapter.updateOne(
        { id: action.payload.id, changes: { ...newItem } },
        state.shopItems
      )
    };
  })
);

export function gameReducer(state: GameState | undefined, action: Action) {
  return reducer(state, action);
}
