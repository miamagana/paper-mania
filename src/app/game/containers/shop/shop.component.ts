import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromGame from '../../store/reducers';
import * as GameActions from '../../store/actions';
import * as GameSelectors from '../../store/selectors';
import { ShopItem } from '../../models/shop-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  items$: Observable<ShopItem[]> = this.store.pipe(
    select(GameSelectors.selectShopItems)
  );
  total$: Observable<number> = this.store.pipe(select(GameSelectors.getTotal));

  constructor(private readonly store: Store<fromGame.State>) {}

  buy(payload: ShopItem): void {
    this.store.dispatch(GameActions.buyItem({ payload }));
  }
}
