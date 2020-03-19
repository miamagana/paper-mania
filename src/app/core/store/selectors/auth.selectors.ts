import { createSelector } from '@ngrx/store';
import { getCoreState } from '../reducers';

export const getAuthState = createSelector(getCoreState, state => state.auth);

export const getCurrentUser = createSelector(
  getAuthState,
  state => state.username
);
export const getLoggedIn = createSelector(getAuthState, state => state.logged);
