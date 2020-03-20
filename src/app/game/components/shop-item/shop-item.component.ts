import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ShopItem } from '../../models/shop-item';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopItemComponent {
  @Input() item: ShopItem;
  @Input() total: number;
  @Output() buy = new EventEmitter<ShopItem>();
  constructor() {}

  buyItem(): void {
    this.buy.emit(this.item);
  }
}
