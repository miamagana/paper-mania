import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { ShopItem } from '../../models/shop-item';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopItemComponent implements OnInit {
  @Input() item: ShopItem;
  @Input() current: number;
  @Output() buy = new EventEmitter<ShopItem>();
  image: SafeUrl;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.image = `url(${this.item.icon})`;
  }

  buyItem(): void {
    this.buy.emit(this.item);
  }
}
