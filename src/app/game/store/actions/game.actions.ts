import { createAction, props } from '@ngrx/store';

export const userClick = createAction('[Game] User click');
export const incrementPerSecond = createAction('[Game] Increment per second');
export const incrementBought = createAction(
  '[Game] Increment bought',
  props<{ payload: { cost: number; gainsPerSecond: number } }>()
);
