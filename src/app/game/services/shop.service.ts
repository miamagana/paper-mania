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
        name: 'Paper Roll',
        icon: 'assets/icons/paper-roll.png',
        cost: 100,
        gainsPerSec: 0,
        gainsPerClick: 1,
        level: 0
      },
      {
        id: 1,
        name: 'Kitchen Paper',
        icon: 'assets/icons/kitchen-paper.png',
        cost: 200,
        gainsPerSec: 2,
        gainsPerClick: 2,
        level: 0
      },
      {
        id: 2,
        name: 'Paper Human',
        icon: 'assets/icons/paper-human.png',
        cost: 300,
        gainsPerSec: 3,
        gainsPerClick: 3,
        level: 0
      },
      {
        id: 3,
        name: 'Toilet',
        icon: 'assets/icons/toilet.png',
        cost: 500,
        gainsPerSec: 5,
        gainsPerClick: 4,
        level: 0
      },
      {
        id: 4,
        name: 'Paper Farm',
        icon: 'assets/icons/paper-farm.png',
        cost: 1000,
        gainsPerSec: 7,
        gainsPerClick: 5,
        level: 0
      },
      {
        id: 5,
        name: 'Paper Country',
        icon: 'assets/icons/paper-country.png',
        cost: 2000,
        gainsPerSec: 11,
        gainsPerClick: 10,
        level: 0
      },
      {
        id: 6,
        name: 'Paper World',
        icon: 'assets/icons/paper-world.png',
        cost: 5000,
        gainsPerSec: 20,
        gainsPerClick: 15,
        level: 0
      },
      {
        id: 7,
        name: 'Paper System',
        icon: 'assets/icons/paper-system.png',
        cost: 10000,
        gainsPerSec: 50,
        gainsPerClick: 35,
        level: 0
      },
      {
        id: 8,
        name: 'Paper Galaxy',
        icon: 'assets/icons/paper-galaxy.png',
        cost: 20000,
        gainsPerSec: 100,
        gainsPerClick: 70,
        level: 0
      },
      {
        id: 9,
        name: 'Paper Cumulus',
        icon: 'assets/icons/paper-cumulus.png',
        cost: 40000,
        gainsPerSec: 200,
        gainsPerClick: 140,
        level: 0
      },
      {
        id: 10,
        name: 'Paper God',
        icon: 'assets/icons/paper-god.png',
        cost: 150000,
        gainsPerSec: 500,
        gainsPerClick: 500,
        level: 0
      }
    ]);
  }
}
