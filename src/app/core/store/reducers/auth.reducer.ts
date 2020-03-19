import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  username: string;
  logged: boolean;
}

export const initialState: AuthState = {
  username: undefined,
  logged: false
};

const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => ({
    ...state,
    username: action.payload,
    logged: true
  })),
  on(AuthActions.logout, state => ({
    ...state,
    username: undefined,
    logged: false
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
