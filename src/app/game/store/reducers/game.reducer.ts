import { Action, createReducer, on } from '@ngrx/store';
import { ShopItem } from '../../models/shop-item';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as GameActions from '../actions/game.actions';

export interface ShopItemState extends EntityState<ShopItem> {}
export const levelIncrement = 2500;
export interface GameState {
  total: number;
  current: number;
  level: number;
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
  current: 0,
  gainsPerClick: 1,
  gainsPerSecond: 0,
  level: 1,
  currentItems: itemAdapter.getInitialState(),
  shopItems: itemAdapter.getInitialState()
};

const reducer = createReducer(
  initialGameState,
  on(GameActions.userClick, state => ({
    ...state,
    total: state.total + state.gainsPerClick,
    current: state.current + state.gainsPerClick
  })),
  on(GameActions.incrementPerSecond, state => {
    const required = levelIncrement * Math.pow(state.level, state.level - 1);
    return {
      ...state,
      level: state.total >= required ? state.level + 1 : state.level,
      total: state.total + state.gainsPerSecond,
      current: state.current + state.gainsPerSecond
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
    return {
      ...state,
      current: state.current - action.payload.cost,
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
