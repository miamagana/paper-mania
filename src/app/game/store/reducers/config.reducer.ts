import { Action, createReducer, on } from '@ngrx/store';
import * as ConfigActions from '../actions/config.actions';
import { getMusicState } from '../selectors';

export interface ConfigState {
  music: boolean;
  audio: HTMLAudioElement;
}

const initialConfigState: ConfigState = {
  music: false,
  audio: new Audio('../../../../assets/audio/music.mp3')
};

const reducer = createReducer(
  initialConfigState,
  on(ConfigActions.switchMusic, state => ({
    ...state,
    music: !state.music
  }))
);

export function configReducer(state: ConfigState | undefined, action: Action) {
  return reducer(state, action);
}
