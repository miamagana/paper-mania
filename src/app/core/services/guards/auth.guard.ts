import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromCore from '../../store/reducers';
import * as AuthSelectors from '../../store/selectors';
import * as CoreActions from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedIn$: Observable<boolean> = this.store.pipe(
    select(AuthSelectors.getLoggedIn)
  );
  constructor(private readonly store: Store<fromCore.State>) {}
  canActivate(): Observable<boolean> {
    const user: string = sessionStorage.getItem('username');
    if (user) {
      this.store.dispatch(CoreActions.login({ payload: user }));
    } else {
      this.store.dispatch(CoreActions.logout());
    }
    return this.loggedIn$;
  }
}
