import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromGame from '../../store/reducers';
import * as GameSelectors from '../../store/selectors';
import * as AuthSelectors from '../../../core/store/selectors';
import * as GameActions from '../../store/actions';
import { Observable, interval } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  sound$: Observable<boolean> = this.store.pipe(
    select(GameSelectors.getSoundState)
  );
  user$: Observable<string> = this.store.pipe(
    select(AuthSelectors.getCurrentUser)
  );
  music$: Observable<boolean> = this.store.pipe(
    select(GameSelectors.getMusicState)
  );
  total$: Observable<number> = this.store.pipe(select(GameSelectors.getTotal));
  gainsPerSecond$: Observable<number> = this.store.pipe(
    select(GameSelectors.getGainsPerSecond)
  );
  gainsPerClick$: Observable<number> = this.store.pipe(
    select(GameSelectors.getGainsPerClick)
  );

  constructor(private readonly store: Store<fromGame.State>) {}

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.incrementPerSecond();
    });
    this.store.dispatch(GameActions.getShopItems());
  }

  toggleSound(): void {
    this.store.dispatch(GameActions.switchSound());
  }

  toggleMusic(): void {
    this.store.dispatch(GameActions.switchMusic());
  }

  userClick(): void {
    this.store.dispatch(GameActions.userClick());
  }

  incrementPerSecond(): void {
    this.store.dispatch(GameActions.incrementPerSecond());
  }

  openShop(): void {
    this.store.dispatch(GameActions.openShop());
  }
}
