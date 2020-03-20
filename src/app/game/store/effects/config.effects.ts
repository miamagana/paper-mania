import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import {
  switchMap,
  map,
  catchError,
  tap,
  concatMap,
  withLatestFrom,
  exhaustMap
} from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import * as GameActions from '../actions';
import * as ConfigSelectors from '../selectors';
import * as fromGame from '../reducers';
import { Store, select, Action } from '@ngrx/store';

@Injectable()
export class ConfigEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private readonly store: Store<fromGame.State>
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[ConfigEffects] Init'),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(ConfigSelectors.getConfigState))
          )
        )
      ),
      switchMap(([action, config]) => {
        if (config.music) {
          config.audio.play();
        } else {
          config.audio.pause();
        }
        return EMPTY;
      })
    )
  );

  switchMusic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.switchMusic),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(ConfigSelectors.getConfigState))
          )
        )
      ),
      switchMap(([action, config]) => {
        if (config.music) {
          config.audio.loop = true;
          config.audio.play();
        } else {
          config.audio.pause();
        }
        return EMPTY;
      })
    )
  );

  ngrxOnInitEffects(): Action {
    return { type: '[ConfigEffects] Init' };
  }
}
