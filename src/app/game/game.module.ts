import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './containers/game/game.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { RouterModule, Route } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { ShopComponent } from './containers/shop/shop.component';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: GameComponent
  }
];

@NgModule({
  declarations: [
    GameComponent,
    ActionBarComponent,
    GameScreenComponent,
    ShopComponent,
    ShopItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('game', reducers),
    EffectsModule.forFeature(effects),
    FlexLayoutModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule
  ]
})
export class GameModule {}
