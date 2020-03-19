import { Action, createReducer, on } from '@ngrx/store';
import * as ConfigActions from '../actions/config.actions';

export interface ConfigState {
  music: boolean;
  sound: boolean;
}

const initialConfigState: ConfigState = {
  music: true,
  sound: true
};

const reducer = createReducer(
  initialConfigState,
  on(ConfigActions.switchSound, state => ({
    ...state,
    sound: !state.sound
  })),
  on(ConfigActions.switchMusic, state => ({
    ...state,
    music: !state.music
  }))
);

export function configReducer(state: ConfigState | undefined, action: Action) {
  return reducer(state, action);
}
