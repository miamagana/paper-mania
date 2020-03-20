import { Injectable } from '@angular/core';
import { ShopItem } from '../models/shop-item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor() {}

  getShopItems(): Observable<ShopItem[]> {
    return of([
      {
        id: 0,
        name: 'Paper Human',
        icon: '',
        cost: 100,
        gainsPerSec: 1,
        gainsPerClick: 0,
        level: 0
      },
      {
        id: 1,
        name: 'Paper Bush',
        icon: '',
        cost: 200,
        gainsPerSec: 2,
        gainsPerClick: 0,
        level: 0
      },
      {
        id: 2,
        name: 'Paper Tree',
        icon: '',
        cost: 500,
        gainsPerSec: 4,
        gainsPerClick: 0,
        level: 0
      },
      {
        id: 3,
        name: 'Paper Farm',
        icon: '',
        cost: 1000,
        gainsPerSec: 5,
        gainsPerClick: 0,
        level: 0
      }
    ]);
  }
}
