import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromGame from '../../store/reducers';
import * as GameActions from '../../store/actions';
import * as GameSelectors from '../../store/selectors';
import { ShopItem } from '../../models/shop-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent {
  items$: Observable<ShopItem[]> = this.store.pipe(
    select(GameSelectors.selectShopItems)
  );
  current$: Observable<number> = this.store.pipe(
    select(GameSelectors.getCurrent)
  );

  constructor(private readonly store: Store<fromGame.State>) {}

  buy(payload: ShopItem): void {
    this.store.dispatch(GameActions.buyItem({ payload }));
  }
}
