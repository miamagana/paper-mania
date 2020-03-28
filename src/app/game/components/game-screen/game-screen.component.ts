import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameScreenComponent {
  @Input() total: number;
  @Input() current: number;
  @Input() gainsPerSecond: number;
  @Input() gainsPerClick: number;
  @Input() level: number;
  @Output() userClick = new EventEmitter<void>();

  constructor() {}

  clicked(): void {
    this.userClick.emit();
  }
}
