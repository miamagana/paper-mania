import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '../../store/reducers';
import * as AuthActions from '../../store/actions';
import * as RouterActions from '../../../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private readonly store: Store<fromCore.AuthState>) {}
  login(payload: string): void {
    this.store.dispatch(AuthActions.login({ payload }));
    this.store.dispatch(RouterActions.go({ path: ['/game'] }));
  }
}
