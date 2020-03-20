import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent {
  @Input() sound: boolean;
  @Input() music: boolean;
  @Output() toggleSound = new EventEmitter<void>();
  @Output() toggleMusic = new EventEmitter<void>();
  @Output() openShop = new EventEmitter<void>();
  constructor() {}

  switchSound(): void {
    this.toggleSound.emit();
  }

  switchMusic(): void {
    this.toggleMusic.emit();
  }

  shop(): void {
    this.openShop.emit();
  }
}
