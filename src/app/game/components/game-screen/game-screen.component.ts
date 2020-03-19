import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameScreenComponent {
  @Input() total: number;
  @Input() gainsPerSecond: number;
  @Input() gainsPerClick: number;
  @Output() userClick = new EventEmitter<void>();

  constructor() {}

  clicked(): void {
    this.userClick.emit();
  }
}
