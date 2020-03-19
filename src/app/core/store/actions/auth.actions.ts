import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ payload: string }>());
export const logout = createAction('[Auth] Logout');
