import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { ShopService } from '../../services/shop.service';
import { ShopItem } from '../../models/shop-item';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import * as GameActions from '../actions';
import { ShopComponent } from '../../containers/shop/shop.component';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private readonly service: ShopService,
    private readonly dialog: MatDialog
  ) {}

  getShopItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.getShopItems),
      switchMap(() => {
        return this.service.getShopItems().pipe(
          map((response: ShopItem[]) =>
            GameActions.getShopItemsSuccess({ payload: response })
          ),
          catchError(() => of(GameActions.getShopItemsFailure()))
        );
      })
    )
  );

  openShop$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.openShop),
        tap(() => {
          this.dialog.open(ShopComponent);
        })
      ),
    { dispatch: false }
  );
}
